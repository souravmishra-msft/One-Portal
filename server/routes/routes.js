const router = require('express').Router();
const PortalsUrlModel = require('../models/PortalsData');
const FavoriteDataModel = require('../models/FavouriteData');

router.post('/add-url', async (req, res) => {
    try {
        const url = new PortalsUrlModel({
            portal_name: req.body.portal_name,
            portal_url: req.body.portal_url,
        });

        const newUrl = await url.save();
        res.status(200).json({
            status: '200',
            message: 'SUCCESS',
            message: `URL added successfully`,
        });
    } catch (error) {
        res.status(500).json({
            status: '500',
            message: 'INTERNAL SERVER ERROR',
            details: error.message
        });
    }
});

router.get('/list-urls', async (req, res) => {
    try {
        const urls = await PortalsUrlModel.find();
        if (!urls || (urls.length === 0)) {
            res.status(404).json({
                status: '404',
                message: 'NOT FOUND',
                items_found: urls.length,
                details: `list is empty`,
            });
        } else {
            res.status(200).json({
                status: '200',
                message: 'SUCCESS',
                items_found: urls.length,
                data: urls,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: '500',
            message: 'INTERNAL SERVER ERROR',
            details: error.message
        });
    }
});

router.get('/get-url/:id', async (req, res) => {
    try {
        const url = await PortalsUrlModel.findOne({ _id: req.params.id });
        if (url === null || (url.length === 0)) {
            res.status(404).json({
                status: '404',
                message: 'NOT FOUND',
                details: `list is empty`,
            });
        } else {
            res.status(200).json({
                status: '200',
                message: 'SUCCESS',
                data: url,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: '500',
            message: 'INTERNAL SERVER ERROR',
            details: error.message
        });
    }
});

router.patch('/update-url/:id', async (req, res) => {
    try {
        const url = await PortalsUrlModel.findOne({ _id: req.params.id });
        if (!url || (url.length === 0)) {
            res.status(404).json({
                status: '404',
                message: 'NOT FOUND',
                details: `entered Id not found.`,
            });
        } else {
            try {
                const updateUrl = await PortalsUrlModel.findByIdAndUpdate(req.params.id,
                    {
                        $set: {
                            portal_name: req.body.portal_name,
                            portal_url: req.body.portal_url,
                            state: req.body.state
                        }
                    });
                res.status(200).json({
                    status: "200",
                    message: "SUCCESS",
                    details: `Item updated successfully.`
                });
            } catch (error) {
                res.status(400).send({ status: "400", message: `BAD_REQUEST`, error: error.message });
            }

        }
    } catch (error) {
        res.status(500).json({
            status: '500',
            message: 'INTERNAL SERVER ERROR',
            details: error.message
        });
    }
});

router.delete('/delete-url/:id', async (req, res) => {
    try {
        const url = await PortalsUrlModel.findOne({ _id: req.params.id });
        if (!url || (url.length === 0)) {
            res.status(404).json({
                status: '404',
                message: 'NOT FOUND',
                details: `entered Id not found.`,
            });
        } else {
            try {
                const deleteUrl = await PortalsUrlModel.findByIdAndDelete(req.params.id);
                res.status(200).json({
                    status: "200",
                    message: "SUCCESS",
                    details: `Item deleted successfully.`
                });
            } catch (error) {
                res.status(400).send({ status: "400", message: `BAD_REQUEST`, error: error.message });
            }

        }
    } catch (error) {
        res.status(500).json({
            status: '500',
            message: 'INTERNAL SERVER ERROR',
            details: error.message
        });
    }
});

router.get('/search/:key', async (req, res) => {
    try {
        const searchData = await PortalsUrlModel.find(
            {
                "$or": [
                    { "portal_name": { $regex: req.params.key } },
                    { "portal_url": { $regex: req.params.key } }
                ]
            }
        );
        if (!searchData || (req.params.key == null)) {
            res.status(404).send({ status: "404", message: `NOT_FOUND`, details: `No items found for ${req.params.key}` });
        } else {
            res.status(200).send({
                status: "200",
                message: 'SUCCESS',
                items_found: searchData.length,
                searchData
            });
        }
    } catch (error) {
        res.status(500).json({
            status: '500',
            message: 'INTERNAL SERVER ERROR',
            details: error.message
        });
    }
});

router.get('/getFavList', async (req, res) => {
    try {
        const favItems = await FavoriteDataModel.find();
        if (!favItems || (favItems.length === 0)) {
            res.status(404).json({
                status: '404',
                message: 'NOT FOUND',
                items_found: favItems.length,
                details: `You have no favorites.`,
            });
        } else {
            res.status(200).json({
                status: '200',
                message: 'SUCCESS',
                items_found: favItems.length,
                data: favItems,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: '500',
            message: 'INTERNAL SERVER ERROR',
            details: error.message
        })
    }
});

router.post('/addToFavList', async (req, res) => {
    try {
        const favItemExists = await FavoriteDataModel.findOne({ portal_id: req.body.id });
        if (favItemExists === null || (favItemExists.length === 0)) {
            const favItemData = await PortalsUrlModel.findOne({ _id: req.body.id });
            const item = new FavoriteDataModel({
                portal_id: favItemData._id,
                portal_name: favItemData.portal_name,
                portal_url: favItemData.portal_url
            });

            const newFavItem = item.save();
            res.status(201).json({
                status: '201',
                message: 'SUCCESS',
                message: `Added successfully to your favorites`,
            });
        } else {
            res.status(200).json({
                status: '200',
                message: 'SUCCESS',
                message: `Item already exits in your favorites`,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: '500',
            message: 'INTERNAL SERVER ERROR',
            details: error.message
        })
    }
});

module.exports = router;