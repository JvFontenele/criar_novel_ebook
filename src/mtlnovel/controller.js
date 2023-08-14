import { Router } from "express";
import novelmaniaService from "./service.js";

const router = Router();

router.get("/mtlnovel", novelmaniaService.recurararLinksCap);
router.get("/mtlnovel/buscar-capitulos", novelmaniaService.recurararLinksCap);

export default router;
