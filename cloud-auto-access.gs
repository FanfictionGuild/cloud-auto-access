const DRIVE_ID = "0APrqSyqtgsNjUk9PVA"

function doGet(req) {
    return HtmlService.createTemplateFromFile("email-submit")
        .evaluate()
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

function doPost(req) {
    console.log(req)
    let email = req.parameter.email
    if (!email) {
        return responseInvalidEmail()
    }

    let drive = DriveApp.getFileById(DRIVE_ID)
    try {
        drive.addCommenter(email)
    } catch (e) {
        return responseInvalidEmail()
    }

    let success = HtmlService.createTemplateFromFile("message")
    success.message = "Успешно! Зайди на свой Google Drive и проверь вкладку Общие диски (Shared drives)."
    return success.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

function responseInvalidEmail() {
    let notValidEmail = HtmlService.createTemplateFromFile("message")
    notValidEmail.message = "Почта какая-то не такая. Это точно гуглопочта?"
    return notValidEmail.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}