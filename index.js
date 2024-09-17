const { ThermalPrinter, PrinterTypes } = require("node-thermal-printer");

async function printReceipt() {
    try {
        const printer = new ThermalPrinter({
            type: PrinterTypes.EPSON, // Set your printer type
            interface: '\\.\COM2', // Automatically select the system printer
            options: {
                timeout: 1000
            },
            width: 48, // Set the width as per your printer's width (e.g., 48 for 48mm)
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
        await printer.printImage('./logo.png'); // Replace with the path to your logo

        printer.cut();

        await printer.execute();
        console.log("Print success");
    } catch (error) {
        console.error("Print failed:", error);
    }
}

printReceipt();
