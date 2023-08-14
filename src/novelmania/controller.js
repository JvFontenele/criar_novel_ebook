import { Router } from "express";
import novelManiaService from './service.js'

const router = Router();

router.get("/novelMania", novelManiaService.buscarNovel);
router.get("/novelMania/buscar-novel", novelManiaService.buscarNovel);


export default router;
