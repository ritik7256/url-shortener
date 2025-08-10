import express from "express";
import { shortenUrl, redirectUrl, getAllUrls } from "../controllers/urlController.js";
import Url from "../models/Url.js";
const router = express.Router();

router.post("/api/shorten", shortenUrl);
router.get("/api/urls", getAllUrls);
router.get("/:shortcode", redirectUrl);

router.delete("/api/urls/:id", async (req, res) => {
  await Url.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});


export default router;
