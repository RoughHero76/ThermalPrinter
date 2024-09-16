const { ThermalPrinter, PrinterTypes, printer } = require("node-thermal-printer");

async function printReceipt() {
    try {
        const printer = new ThermalPrinter({
            type: PrinterTypes.EPSON, // Set your printer type
            interface: 'printer:auto', // Replace with the correct USB port
            driver: require('printer'),  // Use 'printer' as the driver for system printer
            options: {
                timeout: 1000
            },
            width: 48,
            
        });

        const isConnected = await printer.isPrinterConnected();
        if (!isConnected) {
            throw new Error("Printer is not connected");
        }

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
