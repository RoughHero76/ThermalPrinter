const { ThermalPrinter, PrinterTypes } = require("node-thermal-printer");

async function printReceipt() {
    try {
        const printer = new ThermalPrinter({
            type: 'espon',
            interface: 'COM2', 
            options: {
                timeout: 1000
            },
            width: 48, 

            //ESPON TM-T82III-S/A
        });

        const isConnected = await printer.isPrinterConnected();
        if (!isConnected) {
            throw new Error("Printer is not connected");
        }
        console.log("Printer is connected");

        printer.alignCenter();
        printer.println("Hello World!");
        printer.drawLine();

        printer.alignLeft();
        printer.println("Left aligned text");
        printer.alignRight();
        printer.println("Right aligned text");

        printer.alignCenter();
        printer.printImage('./logo.png'); // Replace with path to your logo

        printer.cut();

        await printer.execute();
        console.log("Print success");
    } catch (error) {
        console.error("Print failed:", error);
    }
}

printReceipt();