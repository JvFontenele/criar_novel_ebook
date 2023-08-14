import { Router } from "express";
import NovelService from './service.js'

const router = Router();

router.get("/novelcool", NovelService.test);
router.get("/novelcool/buscar-novel", NovelService.buscarNovel);


export default router;
