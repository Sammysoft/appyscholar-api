import puppeteer from "puppeteer";

(async (req,res, next) => {
  // Create a browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Website URL to export as pdf
  const website_url = "http://localhost:3000/results/sdfs";

  // Open URL in current page
  await page.goto(website_url, { waitUntil: "networkidle2" });

  //To reflect CSS used for screens instead of print
  await page.emulateMediaType("screen");

  const pdf = await webPage.pdf({
    printBackground: true,
    format: "Letter",
    margin: {
      top: "20px",
      bottom: "40px",
      left: "20px",
      right: "20px",
    },
  });
  await browser.close();
  res.contentType("application/pdf");
  res.send(pdf);
})();
