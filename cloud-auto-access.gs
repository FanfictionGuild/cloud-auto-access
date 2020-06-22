const TITLE = "Конфа.Облако"
const DRIVE_URL = "https://drive.google.com/drive/u/0/folders/0APrqSyqtgsNjUk9PVA"
const DRIVE_ID = "0APrqSyqtgsNjUk9PVA"

function doGet(req) {
    return HtmlService.createTemplateFromFile("index").evaluate().setTitle(TITLE)
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
    success.message = "Успешно! Зайди на свой Google Drive и проверь вкладку Общие диски (Shared drives). <a href=" + DRIVE_URL + ">Или перейди прямо отсюда.</a>"
    return success.evaluate().setTitle(TITLE)
}

function responseInvalidEmail() {
    let notValidEmail = HtmlService.createTemplateFromFile("message")
    notValidEmail.message = "Почта какая-то не такая. Это точно гуглопочта?"
    return notValidEmail.evaluate().setTitle(TITLE)
}