const escpos = require('escpos');
escpos.USB = require('escpos-usb');
const usb = require('usb');







////////zadig   download  win -lib32     link :      https://sourceforge.net/projects/libwdi/



// Find Epson TM-T82III printer
function findPrinter() {
  const devices = usb.getDeviceList();
  const printer = devices.find(device => {
    return device.deviceDescriptor.idVendor === 0x04B8 && // Epson vendor ID
           device.deviceDescriptor.idProduct === 0x0E28;  // TM-T82III product ID
  });
  return printer;
}

async function printReceipt() {
  try {
    const device = findPrinter();
    if (!device) {
      throw new Error("Epson TM-T82III printer not found. Make sure it's connected and powered on.");
    }

    const printer = new escpos.USB(device);
    
    const options = { encoding: "GB18030" /* or another encoding that supports your language */ }
    const document = new escpos.Printer(printer, options);

    await new Promise((resolve, reject) => {
      printer.open((error) => {
        if (error) {
          reject(new Error(`Failed to open printer: ${error.message}`));
        } else {
          resolve();
        }
      });
    });

    document
      .font('a')
      .align('ct')
      .style('bu')
      .size(1, 1)
      .text('Hello jay!')
      .text('bhavesh')
      .text('rajehs')
      .text('faizan')
      .feed(1)
      .cut()
      .close();

    console.log("Print job sent successfully");
  } catch (error) {
    console.error("Printing failed:", error);
  }
}

printReceipt();