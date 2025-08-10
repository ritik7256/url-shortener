import Url from "../models/Url.js";
import { nanoid } from "nanoid";

export const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  let url = await Url.findOne({ originalUrl });
  if (url) {
    return res.json({ shortUrl: `${process.env.BASE_URL}/${url.shortCode}` });
  }

  const shortCode = nanoid(6); // shorter but unique
  url = new Url({ originalUrl, shortCode });
  await url.save();

  res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
};

export const redirectUrl = async (req, res) => {
  const { shortcode } = req.params;
  const url = await Url.findOne({ shortCode: shortcode });

  if (!url) {
    return res.status(404).json({ error: "Not found" });
  }

  url.clicks++;
  await url.save();

  res.redirect(url.originalUrl);
};

export const getAllUrls = async (req, res) => {
  const urls = await Url.find().sort({ createdAt: -1 });
  res.json(urls);
};
