const router = require("express").Router();
const { NameSpaceController } = require("../../Http/Controller/Support/NameSpace.Controller")

router.post("/add", NameSpaceController.addNameSapce);
router.get("/list", NameSpaceController.listOfNamespace);

module.exports = {
    NamespaceRoutes: router
}