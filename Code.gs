function doGet(e) {
  const sn = (e.parameter.serial || "").toUpperCase().trim();
  if (!sn) {
    return ContentService.createTextOutput(JSON.stringify({ error: "Missing serial" }))
                         .setMimeType(ContentService.MimeType.JSON);
  }

  const sheetId = "  The ID Sheet code contains product Serial data sheet information  "; 
  const sheet = SpreadsheetApp.openById(sheetId).getSheets()[0]; 

  const data = sheet.getRange("A2:A" + sheet.getLastRow()).getValues(); 

  let found = false;
  for (let i = 0; i < data.length; i++) {
    if ((data[i][0] || "").toUpperCase().trim() === sn) {
      found = true;
      break;
    }
  }

  return ContentService.createTextOutput(JSON.stringify({ found }))
                       .setMimeType(ContentService.MimeType.JSON);
}
