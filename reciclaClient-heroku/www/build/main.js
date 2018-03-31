webpackJsonp([1],{

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_session__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_notifications__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_app_app__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_app_config__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};











var LoginPage = (function () {
    function LoginPage(config, sessionProvider, app, http, fb, loadingCtrl, notificationProvider) {
        this.config = config;
        this.sessionProvider = sessionProvider;
        this.app = app;
        this.http = http;
        this.fb = fb;
        this.loadingCtrl = loadingCtrl;
        this.notificationProvider = notificationProvider;
    }
    LoginPage.prototype.doFbLogin = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Iniciando sesión...'
        });
        this.loading.present();
        this.login().then(function (res) {
            res.subscribe(function (user) {
                _this.loading.dismissAll();
                if (user != null) {
                    _this.sessionProvider.updateSession(user);
                    _this.app.getRootNavs()[0].setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
                }
            }, function (error) {
                _this.loading.dismissAll();
                _this.notificationProvider.presentTopToast(_this.config.defaultTimeoutMsg);
            });
        }).catch(function (error) {
            _this.loading.dismissAll();
            _this.notificationProvider.presentTopToast(_this.config.defaultTimeoutMsg);
        });
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        var user;
        return this.fb.login(['public_profile', 'email'])
            .then(function (fbUser) {
            return _this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(function (profile) {
                user = {
                    id: -1,
                    email: profile['email'],
                    name: profile['first_name'],
                    fullName: profile['name'],
                    profilePicture: profile['picture_large']['data']['url'],
                    accessToken: fbUser.authResponse.accessToken,
                    recycleItems: [],
                    createdDate: null,
                    lastPosition: null
                };
                return _this.findOrCreateUser(user).timeout(_this.config.defaultTimeoutTime).map(function (res) {
                    if (res.value != null) {
                        user = res.value;
                    }
                    else {
                        user = res;
                    }
                    return user;
                }).catch(function (error) {
                    return __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].throw("[login()] ->" + error);
                });
            });
        }).catch(function (e) {
            console.log('Error logging into Facebook', e);
            if (_this.config.DEBUG_MODE) {
                var user = {
                    id: -1,
                    email: 'debug@debug.com',
                    name: 'Debug',
                    fullName: 'Debug user',
                    profilePicture: 'https://keluro.com/images/Blog/Debug.jpg',
                    accessToken: 'DEBUG_MODE',
                    recycleItems: [],
                    createdDate: new Date(),
                    lastPosition: null
                };
                return _this.findOrCreateUser(user).timeout(_this.config.defaultTimeoutTime).map(function (res) {
                    if (res.value != null) {
                        user = res.value;
                    }
                    else {
                        user = res;
                    }
                    return user;
                }).catch(function (error) {
                    return __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].throw("[findOrCreateUser()] ->" + error);
                });
            }
            else {
                return null;
            }
        }).catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].throw("[login()] ->" + error);
        });
    };
    LoginPage.prototype.findOrCreateUser = function (user) {
        var _this = this;
        return this.findUserByEmail(user.email).map(function (foundUser) {
            if (foundUser.status == 200) {
                return foundUser.user;
            }
            else {
                return null;
            }
        }).catch(function (err) {
            if (err.status === 404) {
                return _this.createUserByFBUser(user).map(function (res) {
                    if (res.status == 201) {
                        return __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].of(res.user);
                    }
                    else {
                        return __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].of(null);
                    }
                }).catch(function (error) {
                    return __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].throw("[findOrCreateUser] -> " + error);
                });
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].of(null);
            }
        });
    };
    LoginPage.prototype.findUserByEmail = function (email) {
        var user;
        var status;
        return this.http.get(this.config.apiEndpoint + "/users/email/" + email).map(function (res) {
            status = res.status;
            if (status === 200) {
                user = res.json();
            }
            return { user: user, status: status };
        }).catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].throw(error);
        });
    };
    LoginPage.prototype.createUserByFBUser = function (user) {
        var user;
        var status;
        var options = new __WEBPACK_IMPORTED_MODULE_5__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json'
            })
        });
        return this.http.post(this.config.apiEndpoint + "/users", JSON.stringify(user), options).map(function (res) {
            status = res.status;
            if (status === 201) {
                user = res.json();
            }
            return { user: user, status: status };
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/login/login.html"*/'<ion-content>\n    <ion-grid style="height: 100%">\n        <ion-row align-items-center text-center style="height: 100%">\n            <ion-col>\n                <h2>{{ config.appName }}</h2>\n                <p>\n                    Proyecto reciclaje TFG en la universidad de Alicante.\n                </p>\n\n                <ion-col class="login-button">\n                    <button ion-button block (click)="doFbLogin()">Facebook Login</button>\n                </ion-col>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/login/login.html"*/,
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_9__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_app_app__["a" /* App */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_10_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_notifications__["a" /* NotificationProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 171:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 171;

/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/tabs/tabs.module": [
		702,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 216;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecyclePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_transfer__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_location_accuracy__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_config__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Rx__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_position__ = __webpack_require__(674);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__recycle_map_recycleMap__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_notifications__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_google__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_session__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__models_recycleItem__ = __webpack_require__(678);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__models_typeRecicle__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_utils__ = __webpack_require__(86);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


















var RecyclePage = (function () {
    function RecyclePage(config, navCtrl, camera, transfer, actionSheetCtrl, loadingCtrl, geolocation, locationAccuracy, http, alertCtrl, notificationProvider, googleCloudServiceProvider, utilsProvider, sessionProvider) {
        this.config = config;
        this.navCtrl = navCtrl;
        this.camera = camera;
        this.transfer = transfer;
        this.actionSheetCtrl = actionSheetCtrl;
        this.loadingCtrl = loadingCtrl;
        this.geolocation = geolocation;
        this.locationAccuracy = locationAccuracy;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.notificationProvider = notificationProvider;
        this.googleCloudServiceProvider = googleCloudServiceProvider;
        this.utilsProvider = utilsProvider;
        this.sessionProvider = sessionProvider;
        this.lastImage = null;
        this.errorMsg = "";
        this.temporalName = "";
        this.recycleItem = new __WEBPACK_IMPORTED_MODULE_15__models_recycleItem__["a" /* RecycleItem */]();
    }
    RecyclePage.prototype.ionViewDidLoad = function () {
    };
    RecyclePage.prototype.loadPositionSlide = function (recycleItemType) {
        this.sessionProvider.getSession;
        this.recycleItem.id = null;
        this.recycleItem.image = this.config.defaultImageDirectory;
        this.recycleItem.itemType = recycleItemType;
        this.recycleItem.name = __WEBPACK_IMPORTED_MODULE_16__models_typeRecicle__["a" /* TypeRecycle */][this.recycleItem.itemType];
        this.recycleItem.recycleUser = this.user.id;
        this.recycleItem.createdDate = new Date();
        this.getUserPositionButton(); //directly without new button step
    };
    RecyclePage.prototype.getUserPositionButton = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Obteniendo la ubicación del usuario...'
        });
        this.loading.present();
        this.getUserPosition();
    };
    RecyclePage.prototype.getUserPosition = function () {
        var _this = this;
        var myPosition;
        var GPSoptions = { timeout: this.config.defaultTimeoutTime, enableHighAccuracy: true, maximumAge: 100 };
        this.geolocation.getCurrentPosition(GPSoptions).then(function (position) {
            myPosition = new __WEBPACK_IMPORTED_MODULE_10__models_position__["a" /* Position */](-1, position.coords.latitude, position.coords.longitude);
            if (_this.user.lastPosition != null) {
                myPosition.id = _this.user.lastPosition.id;
            }
            _this.saveUserPosition(_this.user, myPosition).subscribe(function (res) {
                _this.goToMapPage(myPosition);
            }, function (error) {
                _this.loading.dismissAll();
                _this.notificationProvider.presentTopToast(_this.config.defaultTimeoutMsg);
            });
        }, function (error) {
            _this.loading.dismissAll();
            if (error.code == 3) {
                if (_this.user.lastPosition != null) {
                    _this.goToMapPage(_this.user.lastPosition);
                }
                else {
                    _this.notificationProvider.presentTopToast("Error: " + error.message);
                }
            }
            else {
                _this.notificationProvider.presentTopToast("Error obteniendo la ubicación");
            }
        });
    };
    RecyclePage.prototype.takePicture = function (sourceType) {
        var _this = this;
        var options = {
            quality: 20,
            targetWidth: 450,
            targetHeight: 450,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE
        };
        // Get the data of an image 
        this.camera.getPicture(options).then(function (imagePath) {
            //var image = `data:image/png;base64,${imagePath}`;
            _this.uploadImage(imagePath);
        }, function (err) {
            if (err != 'No Image Selected') {
                _this.notificationProvider.presentTopToast('Error en la selección de la imagen.');
            }
        });
    };
    RecyclePage.prototype.presentActionSheetActions = function () {
        var _this = this;
        this.sessionProvider.getSession().then(function (user) {
            _this.user = user;
            _this.locationAccuracy.request(_this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(function (resp) {
                var actionSheet = _this.actionSheetCtrl.create({
                    title: 'Sube una foto de lo que desees reciclar',
                    buttons: [
                        {
                            text: 'Cargar foto de la galería',
                            handler: function () {
                                _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                            }
                        },
                        {
                            text: 'Tomar una foto',
                            handler: function () {
                                _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                            }
                        },
                        {
                            text: 'Reciclar por tipo de objeto',
                            handler: function () {
                                _this.presentActionSheetTypeRecycle();
                            }
                        },
                        {
                            text: 'Cancelar',
                            role: 'cancel'
                        }
                    ]
                });
                actionSheet.present();
            }).catch(function (error) {
                _this.notificationProvider.presentTopToast('Error en la obtención de los permisos necesarios.');
            });
        }, function (err) {
            _this.loading.dismissAll();
            _this.notificationProvider.presentTopToast('Error obteniendo los datos necesarios.');
        });
    };
    RecyclePage.prototype.presentActionSheetTypeRecycle = function () {
        var _this = this;
        var typeRecycle;
        var actionSheet = this.actionSheetCtrl.create({
            title: '¿Qué deseas reciclar?',
            buttons: [
                {
                    text: 'Orgánico',
                    handler: function () {
                        typeRecycle = 1;
                        _this.loadPositionSlide(typeRecycle);
                    }
                },
                {
                    text: 'Plástico',
                    handler: function () {
                        typeRecycle = 2;
                        _this.loadPositionSlide(typeRecycle);
                    }
                },
                {
                    text: 'Cristal',
                    handler: function () {
                        typeRecycle = 3;
                        _this.loadPositionSlide(typeRecycle);
                    }
                },
                {
                    text: 'Papel',
                    handler: function () {
                        typeRecycle = 4;
                        _this.loadPositionSlide(typeRecycle);
                    }
                },
                {
                    text: 'Material de oficina',
                    handler: function () {
                        typeRecycle = 5;
                        _this.loadPositionSlide(typeRecycle);
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    RecyclePage.prototype.uploadImage = function (targetPath) {
        var date = new Date();
        var filename = this.user.id + "_" + date.getTime() + ".png";
        var url = this.config.uploadFilesUrl;
        var urlUpload = url + "/upload.php";
        var urlUploadedFiles = url + '/uploads/' + filename;
        this.recycleItem.id = null;
        this.recycleItem.image = urlUploadedFiles;
        this.recycleItem.name = __WEBPACK_IMPORTED_MODULE_16__models_typeRecicle__["a" /* TypeRecycle */][this.recycleItem.itemType];
        this.recycleItem.recycleUser = this.user.id;
        this.recycleItem.createdDate = new Date();
        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 'fileName': filename }
        };
        var fileTransfer = this.transfer.create();
        this.loading = this.loadingCtrl.create({
            content: 'Subiendo la imagen...'
        });
        this.loading.present();
        this.upload(targetPath, urlUpload, options, fileTransfer, urlUploadedFiles);
    };
    RecyclePage.prototype.getTypeFromDB = function (labelResponseList) {
        var _this = this;
        var options = new __WEBPACK_IMPORTED_MODULE_7__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_7__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json'
            })
        });
        return this.http.post(this.config.apiEndpoint + '/itemTypeName/labelAnnotations', JSON.stringify(labelResponseList), options).timeout(this.config.defaultTimeoutTime).map(function (res) {
            _this.temporalName = res.json().description;
            _this.recycleItem.itemType = _this.getItemType(res.json().itemType.type, 'EN');
            return true;
        }).catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_8_rxjs_Rx__["Observable"].fromPromise(_this.showRadioModifyItemType()).flatMap(function (res) {
                return __WEBPACK_IMPORTED_MODULE_8_rxjs_Rx__["Observable"].of(res);
            });
        });
    };
    RecyclePage.prototype.upload = function (targetPath, urlUpload, options, fileTransfer, urlUploadedFiles) {
        var _this = this;
        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, urlUpload, options).then(function (data) {
            _this.googleCloudServiceProvider.getLabels(urlUploadedFiles).timeout(_this.config.defaultTimeoutTime).subscribe(function (result) {
                var labelResponseList;
                labelResponseList = result.json().responses[0].labelAnnotations;
                if (labelResponseList.length > 0) {
                    _this.temporalName = labelResponseList[0].description;
                    _this.getTypeFromDB(labelResponseList).subscribe(function (res) {
                        if (res == true) {
                            _this.googleCloudServiceProvider.translateToSpanish(_this.temporalName).subscribe(function (res) {
                                _this.recycleItem.name = res.json().data.translations[0].translatedText;
                                _this.recycleItem.name = _this.recycleItem.name.charAt(0).toUpperCase() + _this.recycleItem.name.substr(1).toLowerCase();
                                _this.loading.setContent("Obteniendo la ubicación del usuario...");
                                _this.getUserPosition();
                            }, function (err) {
                                _this.loading.dismissAll();
                                _this.notificationProvider.presentTopToast("Error interno en la obtención del nombre.");
                            });
                        }
                        else {
                            _this.loading.dismissAll();
                        }
                    }, function (error) {
                        _this.loading.dismissAll();
                        _this.notificationProvider.presentTopToast("Error obteniendo el tipo de objeto");
                    });
                }
            }, function (err) {
                _this.loading.dismissAll();
                _this.notificationProvider.presentTopToast("Error a la hora de utilizar la imagen.");
            });
        }, function (err) {
            _this.loading.dismissAll();
            _this.notificationProvider.presentTopToast('Error en el procesado de la imagen.');
        });
    };
    RecyclePage.prototype.showRadioModifyItemType = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var alert = _this.alertCtrl.create({
                title: '<span style="font-size:10px">No se ha encontrado ningún tipo, por favor, selecciona uno</span>',
                buttons: [
                    {
                        text: 'Cambiar tipo',
                        handler: function (data) {
                            _this.recycleItem.itemType = _this.getItemType(data);
                            resolve(true);
                        }
                    }
                ]
            });
            for (var type in __WEBPACK_IMPORTED_MODULE_16__models_typeRecicle__["a" /* TypeRecycle */]) {
                if (isNaN(Number(type))) {
                    if (_this.getItemType(_this.recycleItem.itemType) == type) {
                        alert.addInput({
                            type: 'radio',
                            label: type,
                            value: type,
                            checked: true
                        });
                    }
                    else {
                        alert.addInput({
                            type: 'radio',
                            value: type,
                            label: type,
                        });
                    }
                }
            }
            alert.present();
        });
    };
    RecyclePage.prototype.goToMapPage = function (myPosition) {
        var _this = this;
        this.utilsProvider.getNearestStoragePointByItemType(myPosition, this.recycleItem.itemType).timeout(this.config.defaultTimeoutTime).subscribe(function (result) {
            _this.recycleItem.storage = result.storagePoint;
            if (result.status == 200) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__recycle_map_recycleMap__["a" /* MapPage */], {
                    recycleItem: _this.recycleItem,
                    myPosition: myPosition
                });
                _this.loading.dismissAll();
            }
            else {
                _this.loading.dismissAll();
                _this.notificationProvider.presentTopToast('No hay ningún punto de reciclaje cercano.');
            }
        }, function (error) {
            _this.loading.dismissAll();
            _this.notificationProvider.presentTopToast(_this.config.defaultTimeoutMsg);
        });
    };
    RecyclePage.prototype.saveUserPosition = function (user, position) {
        user.recycleItems = null;
        user.lastPosition = position;
        this.sessionProvider.updateSession(user);
        var options = new __WEBPACK_IMPORTED_MODULE_7__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_7__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json'
            })
        });
        return this.http.put(this.config.apiEndpoint + "/users/private/" + user.id + "?token=" + user.accessToken, JSON.stringify(user), options).timeout(this.config.defaultTimeoutTime);
    };
    RecyclePage.prototype.getItemType = function (itemTypeId, lang) {
        if (lang === void 0) { lang = 'ES'; }
        var out = "Desconocido";
        if (lang == 'ES') {
            if (__WEBPACK_IMPORTED_MODULE_16__models_typeRecicle__["a" /* TypeRecycle */][itemTypeId]) {
                out = __WEBPACK_IMPORTED_MODULE_16__models_typeRecicle__["a" /* TypeRecycle */][itemTypeId];
            }
        }
        else if (lang == 'EN') {
            if (__WEBPACK_IMPORTED_MODULE_16__models_typeRecicle__["b" /* TypeRecycle_EN */][itemTypeId]) {
                out = __WEBPACK_IMPORTED_MODULE_16__models_typeRecicle__["b" /* TypeRecycle_EN */][itemTypeId];
            }
        }
        return out;
    };
    RecyclePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recycle',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            Reciclar!\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-grid style="height: 100%">\n        <ion-row align-items-center text-center style="height: 100%">\n            <ion-col>\n                <img src="assets/imgs/quieroReciclar.png" />\n                <p>\n                    <button ion-button (click)="presentActionSheetActions()">\n                        Quiero reciclar\n                    </button>\n                </p>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_6__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
            __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_12__providers_notifications__["a" /* NotificationProvider */],
            __WEBPACK_IMPORTED_MODULE_13__providers_google__["a" /* GoogleCloudServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_17__providers_utils__["a" /* UtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_14__providers_session__["a" /* SessionProvider */]])
    ], RecyclePage);
    return RecyclePage;
}());

//# sourceMappingURL=recycle.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_notifications__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_config__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_session__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_typeRecicle__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__popover_map_popoverMap__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_utils__ = __webpack_require__(86);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};











var MapPage = (function () {
    function MapPage(navParams, notificationProvider, alertCtrl, http, sessionProvider, popoverCtrl, platform, utilsProvider, loadingCtrl, config) {
        this.navParams = navParams;
        this.notificationProvider = notificationProvider;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.sessionProvider = sessionProvider;
        this.popoverCtrl = popoverCtrl;
        this.platform = platform;
        this.utilsProvider = utilsProvider;
        this.loadingCtrl = loadingCtrl;
        this.config = config;
        this.recycledAlready = false;
        this.recycleItem = this.navParams.get("recycleItem");
        this.myPosition = this.navParams.get("myPosition");
    }
    MapPage.prototype.ionViewDidLoad = function () {
        this.loadMap();
    };
    MapPage.prototype.loadMap = function () {
        var _this = this;
        var mapOptions = {
            camera: {
                target: {
                    lat: this.myPosition.latitude,
                    lng: this.myPosition.longitude // default location
                },
                zoom: 8,
                tilt: 30
            }
        };
        this.map = __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["a" /* GoogleMaps */].create('map_canvas', mapOptions);
        // Wait the MAP_READY before using any methods.
        this.map.one(__WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MAP_READY)
            .then(function () {
            _this.initMarkers(_this.recycleItem.storage.position, "Punto más cercano", 'green');
        })
            .catch(function (error) {
            _this.notificationProvider.presentTopToast("Parece que ha habido algún problema");
        });
    };
    MapPage.prototype.initMarkers = function (storagePosition, title, color) {
        var _this = this;
        this.map.clear();
        this.createMarker(this.myPosition, "Yo", 'blue').then(function (marker) {
        });
        this.createMarker(storagePosition, title, color).then(function (marker) {
            marker.showInfoWindow();
        });
        this.utilsProvider.calculateZoom(this.myPosition, storagePosition).subscribe(function (zoomLevel) {
            var centerX = (storagePosition.latitude + _this.myPosition.latitude) / 2;
            var centerY = (storagePosition.longitude + _this.myPosition.longitude) / 2;
            var latLng = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](centerX, centerY);
            _this.map.setCameraZoom(zoomLevel);
            _this.map.setCameraTarget(latLng);
        }, function (error) {
            _this.notificationProvider.presentTopToast("Error obteniendo la posición más cercana");
        });
    };
    MapPage.prototype.createMarker = function (pos, title, color) {
        var location = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](pos.latitude, pos.longitude);
        var markerOptions = {
            position: location,
            title: title,
            icon: color,
            animation: 'DROP'
        };
        return this.map.addMarker(markerOptions);
    };
    MapPage.prototype.recycleFinish = function () {
        var _this = this;
        this.sessionProvider.getSession().then(function (user) {
            var options = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["d" /* RequestOptions */]({
                headers: new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]({
                    'Content-Type': 'application/json'
                })
            });
            _this.recycleItem.storage = _this.recycleItem.storage.id;
            _this.http.post(_this.config.apiEndpoint + "/recycleItems/private?token=" + user.accessToken, JSON.stringify(_this.recycleItem), options).subscribe(function (res) {
                var status = res.status;
                if (status === 201) {
                    _this.recycledAlready = true;
                    _this.notificationProvider.presentAlertOk('Se ha guardadado correctamente este reciclado!');
                }
                else {
                    _this.notificationProvider.presentTopToast("Los datos insertados son incorrectos.");
                }
            }, function (error) {
                _this.notificationProvider.presentTopToast(_this.config.defaultTimeoutMsg);
            });
        }, function (err) {
            _this.notificationProvider.presentTopToast('Error obteniendo los datos necesarios.');
        });
    };
    MapPage.prototype.modifyRecycleName = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Modificar nombre',
            message: "Puedes añadirle un nombre personalizado al reciclado.",
            inputs: [
                {
                    name: 'name',
                    placeholder: this.recycleItem.name
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: function (data) {
                        return null;
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        if (data.name.length > 0) {
                            _this.recycleItem.name = data.name;
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    MapPage.prototype.viewOnExtenalMap = function () {
        if (this.platform.is('ios')) {
            window.open('maps://?q=Yo&saddr=' + this.myPosition.latitude + ',' + this.myPosition.longitude + '&daddr=' + this.recycleItem.storage.position.latitude + ',' + this.recycleItem.storage.position.longitude, '_system');
        }
        else if (this.platform.is('android')) {
            var url = 'http://maps.google.com/?saddr=' + this.myPosition.latitude + ',' + this.myPosition.longitude + '&daddr=' + this.recycleItem.storage.position.latitude + ',' + this.recycleItem.storage.position.longitude;
            window.open(url, '_system', 'location=yes'), !1;
        }
    };
    MapPage.prototype.showRadioModifyItemType = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Selecciona un tipo');
        for (var type in __WEBPACK_IMPORTED_MODULE_7__models_typeRecicle__["a" /* TypeRecycle */]) {
            if (isNaN(Number(type))) {
                if (this.getItemType(this.recycleItem.itemType) == type) {
                    alert.addInput({
                        type: 'radio',
                        label: type,
                        value: type,
                        checked: true
                    });
                }
                else {
                    alert.addInput({
                        type: 'radio',
                        value: type,
                        label: type,
                    });
                }
            }
        }
        alert.addButton('Cancelar');
        alert.addButton({
            text: 'Cambiar tipo',
            handler: function (data) {
                _this.loading = _this.loadingCtrl.create({
                    content: 'Buscando punto más cercano...'
                });
                _this.loading.present();
                _this.recycleItem.itemType = _this.getItemType(data);
                _this.utilsProvider.getNearestStoragePointByItemType(_this.myPosition, _this.recycleItem.itemType).timeout(_this.config.defaultTimeoutTime).subscribe(function (result) {
                    if (result.status == 200) {
                        _this.loading.dismissAll();
                        _this.initMarkers(result.storagePoint.position, "Punto más cercano", 'green');
                    }
                    else {
                        _this.loading.dismissAll();
                        _this.notificationProvider.presentTopToast('No hay ningún punto de reciclaje cercano.');
                    }
                }, function (error) {
                    _this.loading.dismissAll();
                    _this.notificationProvider.presentTopToast(_this.config.defaultTimeoutMsg);
                });
            }
        });
        alert.present();
    };
    MapPage.prototype.presentPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_8__popover_map_popoverMap__["a" /* PopoverMap */], {
            mapPage: this
        });
        popover.present({
            ev: myEvent
        });
    };
    MapPage.prototype.getItemType = function (itemTypeId) {
        return this.utilsProvider.getItemType(itemTypeId);
    };
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recycleMap',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle_map/recycleMap.html"*/'<ion-header>\n    <ion-navbar>\n        <div style="display: flex;justify-content: center; align-items: center;">\n            <div class="title-navbar" align="center">\n                <div class=\'main-title\'>Reciclar: {{getItemType(recycleItem.itemType)}}</div>\n                <div class=\'sub-title\'>{{recycleItem.name}}</div>\n            </div>\n            <div class="iconsRight">\n                <div *ngIf="!recycledAlready;">\n                    <ion-buttons right>\n                        <button ion-button icon-only color="royal" (tap)="recycleFinish()">\n                            <ion-icon name="checkmark"></ion-icon>\n                        </button>\n\n                        <button ion-button icon-only color="royal" (tap)="presentPopover($event)">\n                            <ion-icon name="more"></ion-icon>\n                        </button>\n                    </ion-buttons>\n                </div>\n            </div>\n        </div>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div #map id="map_canvas">\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle_map/recycleMap.html"*/
        }),
        __param(9, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_5__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_notifications__["a" /* NotificationProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_6__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_9__providers_utils__["a" /* UtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], Object])
    ], MapPage);
    return MapPage;
}());

//# sourceMappingURL=recycleMap.js.map

/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverMap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PopoverMap = (function () {
    function PopoverMap(viewCtrl, params) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.mapPage = this.params.get('mapPage');
    }
    PopoverMap.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    PopoverMap.prototype.viewOnExtenalMap = function () {
        this.mapPage.viewOnExtenalMap();
        this.viewCtrl.dismiss();
    };
    PopoverMap.prototype.showRadioModifyItemType = function () {
        this.mapPage.showRadioModifyItemType();
        this.viewCtrl.dismiss();
    };
    PopoverMap.prototype.modifyRecycleName = function () {
        this.mapPage.modifyRecycleName();
        this.viewCtrl.dismiss();
    };
    PopoverMap = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            template: "\n      <ion-list style=\"height: 125px;\">\n        <button ion-item (click)=\"viewOnExtenalMap()\">Abrir en Mapas</button>\n        <button ion-item (click)=\"showRadioModifyItemType()\">Modificar el tipo</button>\n        <button ion-item (click)=\"modifyRecycleName()\">Modificar el nombre</button>\n      </ion-list>\n    "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], PopoverMap);
    return PopoverMap;
}());

//# sourceMappingURL=popoverMap.js.map

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleCloudServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_config__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var GoogleCloudServiceProvider = (function () {
    function GoogleCloudServiceProvider(http, config) {
        this.http = http;
        this.config = config;
    }
    GoogleCloudServiceProvider.prototype.getLabels = function (imageUrl) {
        //this.base64.encodeFile(imagePath).then((base64Image: string) => {
        var body = {
            "requests": [
                {
                    "image": {
                        "source": {
                            "imageUri": imageUrl
                        }
                    },
                    "features": [
                        {
                            "type": "LABEL_DETECTION"
                        }
                    ]
                }
            ]
        };
        return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + this.config.googleCloudVisionAPIKey, body).timeout(this.config.defaultTimeoutTime);
    };
    GoogleCloudServiceProvider.prototype.translateToSpanish = function (text) {
        return this.http.get('https://translation.googleapis.com/language/translate/v2?key=' + this.config.googleCloudVisionAPIKey + '&q=' + text + '&target=es').timeout(this.config.defaultTimeoutTime);
    };
    GoogleCloudServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], Object])
    ], GoogleCloudServiceProvider);
    return GoogleCloudServiceProvider;
}());

//# sourceMappingURL=google.js.map

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_session__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(137);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfilePage = (function () {
    function ProfilePage(sessionProvider, app) {
        var _this = this;
        this.sessionProvider = sessionProvider;
        this.app = app;
        sessionProvider.getSession().then(function (res) {
            _this.user = res;
            if (_this.user.profilePicture == null) {
                _this.user.profilePicture = "assets/imgs/quieroReciclar.png";
            }
        });
        this.profileSegment = "profile";
    }
    ProfilePage.prototype.goToLogout = function () {
        this.sessionProvider.destroySession();
        this.app.getRootNavs()[0].setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile.html"*/'<ion-header>\n    <ion-toolbar>\n        <ion-segment [(ngModel)]="profileSegment" style="margin-bottom: -15px">\n            <ion-segment-button value="profile">\n                <div class="segmentName">Perfil</div>\n            </ion-segment-button>\n            <ion-segment-button value="history">\n                <div class="segmentName">Historial</div>\n            </ion-segment-button>\n        </ion-segment>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content>\n    <div [ngSwitch]="profileSegment" style="height: 97%">\n        <ion-list *ngSwitchCase="\'profile\'" style="height: 100%;">\n            <ion-grid>\n                <ion-row>\n                    <ion-col>\n                        <ion-card *ngIf="user">\n                            <ion-card-header>{{ user.fullName }}</ion-card-header>\n                            <img [src]="user.profilePicture" onError="this.src = \'assets/imgs/quieroReciclar.png\'" />\n                            <ion-card-content>\n                                <p>Email: {{ user.email }}</p>\n                                <p>Fecha registro: {{ user.createdDate | date: \'dd/MM/yyyy H:mm\'}}</p>\n                            </ion-card-content>\n                        </ion-card>\n                        <button ion-button block (click)="goToLogout()">Cerrar sesión</button>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-list>\n        <ion-list *ngSwitchCase="\'history\'" style="height: 100%">\n            <page-myRecycledItems></page-myRecycledItems>\n        </ion-list>\n    </div>\n\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomePage = (function () {
    function HomePage() {
    }
    HomePage.prototype.ionViewDidLoad = function () {
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/home/home.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>ReciclaUA</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-grid style="height: 100%">\n        <ion-row align-items-center text-center style="height: 100%">\n            <ion-col>\n                <h5>ReciclaUA</h5>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return APP_CONFIG_TOKEN; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);

// Configuration values for our app
var APP_CONFIG = {
    appName: 'ReciclaWeb App',
    apiEndpoint: 'https://reciclaweb-server.herokuapp.com',
    uploadFilesUrl: 'https://reciclaweb.000webhostapp.com',
    DEBUG_MODE: true,
    defaultTimeoutTime: 10000,
    defaultTimeoutMsg: 'Parece que ha habido algún problema, prueba en unos minutos.',
    defaultImageDirectory: 'assets/imgs/icons/recycle.png',
    googleCloudVisionAPIKey: 'AIzaSyCVl9Ien_9KOFEN197dPqklyIJ7ad1z44k',
    itemsPerPage: 10
};
var APP_CONFIG_TOKEN = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* InjectionToken */]('config');
//# sourceMappingURL=app-config.js.map

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(316);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SessionProvider = (function () {
    function SessionProvider(storage) {
        this.storage = storage;
    }
    SessionProvider.prototype.updateSession = function (user) {
        this.user = user;
        this.storage.set('user', this.user);
    };
    SessionProvider.prototype.getSession = function () {
        return this.storage.get('user');
    };
    SessionProvider.prototype.destroySession = function () {
        this.storage.set('user', null);
    };
    SessionProvider.prototype.getUser = function () {
        return this.user;
    };
    SessionProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], SessionProvider);
    return SessionProvider;
}());

//# sourceMappingURL=session.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return recycleItemInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_notifications__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_config__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_session__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_utils__ = __webpack_require__(86);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var recycleItemInfoPage = (function () {
    function recycleItemInfoPage(navParams, http, sessionProvider, utilsProvider, config, notificationProvider) {
        this.navParams = navParams;
        this.http = http;
        this.sessionProvider = sessionProvider;
        this.utilsProvider = utilsProvider;
        this.config = config;
        this.notificationProvider = notificationProvider;
        this.recycleItemId = this.navParams.get("recycleItemId");
    }
    recycleItemInfoPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var status;
        this.sessionProvider.getSession().then(function (user) {
            _this.http.get(_this.config.apiEndpoint + "/recycleItems/private/" + _this.recycleItemId + "?token=" + user.accessToken).timeout(_this.config.defaultTimeoutTime).subscribe(function (res) {
                status = res.status;
                if (status === 200) {
                    _this.recycleItem = res.json();
                    console.log(_this.recycleItem.name);
                }
            }, function (error) {
                _this.notificationProvider.presentTopToast("Error obteniendo los detalles del objeto");
            });
        }, function (err) {
            _this.notificationProvider.presentTopToast('Error obteniendo los datos necesarios.');
        });
    };
    recycleItemInfoPage.prototype.getItemType = function (itemTypeId) {
        return this.utilsProvider.getItemType(itemTypeId);
    };
    recycleItemInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recycleItemInfo',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile_recycledItems/profile_recycledItems_info/recycleItemInfo.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Detalles del reciclaje</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-grid style="height: 97%;">\n        <ion-row style="height: 100%;">\n            <ion-col style="height: 100%;">\n                <ion-card *ngIf="recycleItem" style="height: 100%;">\n                    <ion-card-header>{{ recycleItem.name }}</ion-card-header>\n                    <img [src]="recycleItem.image" onError="this.src = \'assets/imgs/quieroReciclar.png\'" style="max-height: 75%;" />\n                    <ion-card-content>\n                        <p>Tipo: {{ getItemType(recycleItem.itemType.id) }}</p>\n                        <p>Reciclado el: {{ recycleItem.createdDate | date: \'dd/MM/yyyy H:mm\'}}</p>\n                    </ion-card-content>\n                </ion-card>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile_recycledItems/profile_recycledItems_info/recycleItemInfo.html"*/
        }),
        __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_4__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_5__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_utils__["a" /* UtilsProvider */], Object, __WEBPACK_IMPORTED_MODULE_3__providers_notifications__["a" /* NotificationProvider */]])
    ], recycleItemInfoPage);
    return recycleItemInfoPage;
}());

//# sourceMappingURL=recycleItemInfo.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(369);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_index__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_session__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_config__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_file__ = __webpack_require__(700);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_transfer__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_file_path__ = __webpack_require__(701);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_camera__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_location_accuracy__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_google_maps__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_notifications__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_google__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_utils__ = __webpack_require__(86);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_index__["a" /* APP_PAGES */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/tabs/tabs.module#TabsModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_10__angular_http__["c" /* HttpModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_index__["a" /* APP_PAGES */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__["a" /* Facebook */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_9__providers_session__["a" /* SessionProvider */],
                __WEBPACK_IMPORTED_MODULE_19__providers_notifications__["a" /* NotificationProvider */],
                __WEBPACK_IMPORTED_MODULE_20__providers_google__["a" /* GoogleCloudServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_21__providers_utils__["a" /* UtilsProvider */],
                { provide: __WEBPACK_IMPORTED_MODULE_11__app_config__["b" /* APP_CONFIG_TOKEN */], useValue: __WEBPACK_IMPORTED_MODULE_11__app_config__["a" /* APP_CONFIG */] },
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_transfer__["a" /* Transfer */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_file_path__["a" /* FilePath */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_google_maps__["a" /* GoogleMaps */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NotificationProvider = (function () {
    function NotificationProvider(toastCtrl, alertCtrl) {
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
    }
    NotificationProvider.prototype.presentTopToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 5000,
            position: 'top'
        });
        toast.present();
    };
    NotificationProvider.prototype.presentPersistentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            position: 'top',
            showCloseButton: true,
            closeButtonText: 'Cerrar'
        });
        toast.present();
    };
    NotificationProvider.prototype.presentAlertOk = function (text) {
        var alert = this.alertCtrl.create({
            title: '¡Ya está!',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    NotificationProvider.prototype.presentAlertError = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Ups, error!',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    NotificationProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], NotificationProvider);
    return NotificationProvider;
}());

//# sourceMappingURL=notifications.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TypeRecycle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TypeRecycle_EN; });
var TypeRecycle;
(function (TypeRecycle) {
    TypeRecycle[TypeRecycle["Org\u00E1nico"] = 1] = "Org\u00E1nico";
    TypeRecycle[TypeRecycle["Pl\u00E1stico"] = 2] = "Pl\u00E1stico";
    TypeRecycle[TypeRecycle["Cristal"] = 3] = "Cristal";
    TypeRecycle[TypeRecycle["Papel"] = 4] = "Papel";
    TypeRecycle[TypeRecycle["Material de Oficina"] = 5] = "Material de Oficina";
})(TypeRecycle || (TypeRecycle = {}));
var TypeRecycle_EN;
(function (TypeRecycle_EN) {
    TypeRecycle_EN[TypeRecycle_EN["Organic"] = 1] = "Organic";
    TypeRecycle_EN[TypeRecycle_EN["Plastic"] = 2] = "Plastic";
    TypeRecycle_EN[TypeRecycle_EN["Glass"] = 3] = "Glass";
    TypeRecycle_EN[TypeRecycle_EN["Paper"] = 4] = "Paper";
    TypeRecycle_EN[TypeRecycle_EN["WritingMaterial"] = 5] = "WritingMaterial";
})(TypeRecycle_EN || (TypeRecycle_EN = {}));
//# sourceMappingURL=typeRecicle.js.map

/***/ }),

/***/ 674:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Position; });
var Position = (function () {
    function Position(id, latitude, longitude) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
    }
    return Position;
}());

//# sourceMappingURL=position.js.map

/***/ }),

/***/ 678:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecycleItem; });
var RecycleItem = (function () {
    function RecycleItem() {
    }
    return RecycleItem;
}());

//# sourceMappingURL=recycleItem.js.map

/***/ }),

/***/ 696:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_status_bar__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_session__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_platform_platform__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, sessionProvider) {
        var _this = this;
        this.sessionProvider = sessionProvider;
        this.sessionProvider.getSession().then(function (res) {
            if (res == null) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__["a" /* TabsPage */];
            }
        });
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular_platform_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4__providers_session__["a" /* SessionProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 697:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_PAGES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__recycle_recycle__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__profile_profile__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__recycle_recycle_finish_recycleFinish__ = __webpack_require__(698);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__profile_profile_recycledItems_myRecycledItems__ = __webpack_require__(699);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__recycle_recycle_map_recycleMap__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__recycle_recycle_map_popover_map_popoverMap__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__profile_profile_recycledItems_profile_recycledItems_info_recycleItemInfo__ = __webpack_require__(363);










var APP_PAGES = [
    __WEBPACK_IMPORTED_MODULE_0__recycle_recycle__["a" /* RecyclePage */],
    __WEBPACK_IMPORTED_MODULE_1__profile_profile__["a" /* ProfilePage */],
    __WEBPACK_IMPORTED_MODULE_9__profile_profile_recycledItems_profile_recycledItems_info_recycleItemInfo__["a" /* recycleItemInfoPage */],
    __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */],
    __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */],
    __WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */],
    __WEBPACK_IMPORTED_MODULE_5__recycle_recycle_finish_recycleFinish__["a" /* recycleFinishPage */],
    __WEBPACK_IMPORTED_MODULE_6__profile_profile_recycledItems_myRecycledItems__["a" /* myRecycledItemsPage */],
    __WEBPACK_IMPORTED_MODULE_7__recycle_recycle_map_recycleMap__["a" /* MapPage */],
    __WEBPACK_IMPORTED_MODULE_8__recycle_recycle_map_popover_map_popoverMap__["a" /* PopoverMap */]
];
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 698:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return recycleFinishPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_typeRecicle__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_session__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_config__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var recycleFinishPage = (function () {
    function recycleFinishPage(sessionProvider, http, toastCtrl, config, navParams) {
        this.sessionProvider = sessionProvider;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.config = config;
        this.navParams = navParams;
        this.msg = "";
        this.recycleItemType = this.navParams.get("recycleItemType");
        this.storageId = this.navParams.get("storageId");
    }
    recycleFinishPage.prototype.ionViewDidLoad = function () {
    };
    recycleFinishPage.prototype.recycleFinish = function () {
        var _this = this;
        var options = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json'
            })
        });
        this.sessionProvider.getSession().then(function (user) {
            var recycleItem;
            recycleItem = {
                id: null,
                name: __WEBPACK_IMPORTED_MODULE_2__models_typeRecicle__["a" /* TypeRecycle */][_this.recycleItemType],
                image: "",
                recycleUser: user.id,
                storage: _this.storageId,
                itemType: _this.recycleItemType,
                createdDate: null
            };
            return _this.http.post(_this.config.apiEndpoint + "/recycleItems", JSON.stringify(recycleItem), options).subscribe(function (res) {
                _this.msg = "recycleItem: " + JSON.stringify(recycleItem);
                var status = res.status;
                if (status === 201) {
                    _this.msg = "Item creado correctamente.";
                }
                else {
                    _this.presentToast("Los datos insertados son incorrectos.");
                }
            });
        }).catch(function (error) {
            _this.presentToast("Error encontrado, por favor contacte con el administrador." + error);
        });
    };
    recycleFinishPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    recycleFinishPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recycleFinish',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle_finish/recycleFinish.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            Finalizar Reciclaje\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-grid style="height: 100%">\n        <ion-row align-items-center text-center style="height: 100%">\n            <ion-col>\n                <h5>{{ msg }}</h5>\n                <ion-col>\n                    <button ion-button (click)="recycleFinish()">\n                        Finalizar reciclaje\n                    </button>\n                </ion-col>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle_finish/recycleFinish.html"*/
        }),
        __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_5__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], recycleFinishPage);
    return recycleFinishPage;
}());

//# sourceMappingURL=recycleFinish.js.map

/***/ }),

/***/ 699:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return myRecycledItemsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_typeRecicle__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_config__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_session__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__profile_recycledItems_info_recycleItemInfo__ = __webpack_require__(363);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








var myRecycledItemsPage = (function () {
    function myRecycledItemsPage(http, config, navCtrl, sessionProvider) {
        var _this = this;
        this.http = http;
        this.config = config;
        this.navCtrl = navCtrl;
        this.sessionProvider = sessionProvider;
        this.recycleItems = [];
        this.showLoadingMsg = true;
        this.errorLoadingContent = false;
        this.page = 0;
        this.perPage = 10;
        this.perPage = this.config.itemsPerPage;
        this.sessionProvider.getSession().then(function (user) {
            _this.user = user;
            _this.getRecycleItems().then(function (res) {
                _this.showLoadingMsg = false;
                if (res == false) {
                    _this.errorLoadingContent = true;
                }
            });
        }, function (error) {
            _this.showLoadingMsg = false;
            _this.errorLoadingContent = true;
        });
    }
    myRecycledItemsPage.prototype.getItemType = function (itemTypeId) {
        var out = "Desconocido";
        if (__WEBPACK_IMPORTED_MODULE_1__models_typeRecicle__["a" /* TypeRecycle */][itemTypeId]) {
            out = __WEBPACK_IMPORTED_MODULE_1__models_typeRecicle__["a" /* TypeRecycle */][itemTypeId];
        }
        return out;
    };
    myRecycledItemsPage.prototype.getRecycleItems = function () {
        var _this = this;
        var status;
        return new Promise(function (resolve) {
            _this.http.get(_this.config.apiEndpoint + "/users/private/" + _this.user.id + "/recycleItems?page=" + _this.page + "&perPage=" + _this.perPage + "&token=" + _this.user.accessToken).timeout(_this.config.defaultTimeoutTime).subscribe(function (res) {
                status = res.status;
                if (status === 200) {
                    var resJson = res.json();
                    var tempRecycleList = _this.readRecycleItems(resJson.content);
                    _this.totalPages = resJson.totalPages;
                    _this.totalElements = resJson.totalElements;
                    for (var i = 0; i < tempRecycleList.length; i++) {
                        _this.recycleItems.push(tempRecycleList[i]);
                    }
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }, function (error) {
                resolve(false);
            });
        });
    };
    myRecycledItemsPage.prototype.readRecycleItems = function (recycleItemList) {
        var itemTypeItems = [];
        var _loop_1 = function (item) {
            if (!parseInt(recycleItemList[item].itemType)) {
                itemTypeItems.push(recycleItemList[item].itemType);
            }
            else {
                recycleItemList[item].itemType = itemTypeItems.filter(function (x) { return x.id == recycleItemList[item].itemType; })[0];
            }
        };
        for (var item in recycleItemList) {
            _loop_1(item);
        }
        return recycleItemList;
    };
    myRecycledItemsPage.prototype.doInfinite = function (infiniteScroll) {
        this.page += 1;
        this.getRecycleItems().then(function (res) {
            infiniteScroll.complete();
        });
    };
    myRecycledItemsPage.prototype.showRecycleItemInfo = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__profile_recycledItems_info_recycleItemInfo__["a" /* recycleItemInfoPage */], {
            recycleItemId: id
        });
    };
    myRecycledItemsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-myRecycledItems',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile_recycledItems/myRecycledItems.html"*/'<ion-grid style="height: 100%">\n\n    <div *ngIf="recycleItems?.length > 0;else recycleItemsNotFound">\n        <ion-row justify-content-center align-items-center style="height: 100%">\n            <ion-col>\n                <div *ngFor="let recycleItem of recycleItems">\n                    <ion-card (click)="showRecycleItemInfo(recycleItem.id)">\n                        <ion-item class="recycleItemIonItem">\n                            <ion-avatar item-start>\n                                <img src="{{recycleItem.image}}" onError="this.src = \'assets/imgs/quieroReciclar.png\'">\n                            </ion-avatar>\n                            {{recycleItem.name}}\n                            <p>{{ getItemType(recycleItem.itemType.id) }} - {{ recycleItem.createdDate | date: \'dd/MM/yyyy H:mm\'}}\n                            </p>\n                        </ion-item>\n                    </ion-card>\n                </div>\n                <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="page < totalPages">\n                    <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Cargando más datos..."></ion-infinite-scroll-content>\n                </ion-infinite-scroll>\n            </ion-col>\n        </ion-row>\n    </div>\n\n</ion-grid>\n\n<ng-template #recycleItemsNotFound>\n    <ion-row align-items-center text-center style="height: 100%">\n        <ion-col>\n            <div *ngIf="showLoadingMsg == true; else showLoadingResult">\n                <h5>Cargando...</h5>\n            </div>\n            <ng-template #showLoadingResult>\n                <div *ngIf="errorLoadingContent == true; else showNoRecycledItemsFound">\n                    <div>\n                        <p>Ha habido algún problema</p>\n                        <h5 style="font-weight: bold">Intentalo de nuevo en unos minutos</h5>\n                    </div>\n                </div>\n                <ng-template #showNoRecycledItemsFound>\n                    <div>\n                        <p>Todavía no has reciclado nada</p>\n                        <h5 style="font-weight: bold">¡A qué esperas!</h5>\n                    </div>\n                </ng-template>\n            </ng-template>\n        </ion-col>\n    </ion-row>\n</ng-template>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile_recycledItems/myRecycledItems.html"*/
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], Object, __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_session__["a" /* SessionProvider */]])
    ], myRecycledItemsPage);
    return myRecycledItemsPage;
}());

//# sourceMappingURL=myRecycledItems.js.map

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_config__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_typeRecicle__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var UtilsProvider = (function () {
    function UtilsProvider(http, config) {
        this.http = http;
        this.config = config;
        this.rad = function (x) {
            return x * Math.PI / 180;
        };
    }
    UtilsProvider.prototype.getNearestStoragePointByItemType = function (currentPosition, itemType) {
        var status;
        var storagePointList;
        var storagePoint;
        return this.http.get(this.config.apiEndpoint + "/storages/itemType/" + itemType + '/storagePoints').map(function (res) {
            status = res.status;
            if (status === 200) {
                storagePointList = res.json();
                storagePoint = storagePointList[0];
                for (var _i = 0, storagePointList_1 = storagePointList; _i < storagePointList_1.length; _i++) {
                    var currentSPoint = storagePointList_1[_i];
                    if ((currentPosition.latitude - currentSPoint.position.latitude) < (currentPosition.latitude - storagePoint.position.latitude)) {
                        if ((currentPosition.longitude - currentSPoint.position.longitude) < (currentPosition.longitude - storagePoint.position.longitude)) {
                            storagePoint = currentSPoint;
                        }
                    }
                }
            }
            return { storagePoint: storagePoint, status: status };
        }).catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"].throw(error);
        });
    };
    UtilsProvider.prototype.calculateDistance = function (StartP, EndP) {
        var Radius = 6371; // radius of earth in Km
        var lat1 = StartP.latitude;
        var lat2 = EndP.latitude;
        var lon1 = StartP.longitude;
        var lon2 = EndP.longitude;
        var dLat = this.rad(lat2 - lat1);
        var dLon = this.rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(this.rad(lat1))
                * Math.cos(this.rad(lat2)) * Math.sin(dLon / 2)
                * Math.sin(dLon / 2);
        var c = 2 * Math.asin(Math.sqrt(a));
        var valueResult = Radius * c;
        var meter = valueResult * 1000;
        return Math.round(meter);
    };
    UtilsProvider.prototype.getZoomLevel = function (distance) {
        var radius = distance / 2;
        var scale = radius / 500;
        var zoomLevel = Math.floor(16 - Math.log(scale) / Math.log(2));
        return zoomLevel;
    };
    UtilsProvider.prototype.calculateZoom = function (userPosition, storagePosition) {
        var distance = this.calculateDistance(userPosition, storagePosition);
        var zoomLevel = this.getZoomLevel(distance);
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"].of(zoomLevel);
    };
    UtilsProvider.prototype.getItemType = function (itemTypeId) {
        var out = "Desconocido";
        if (__WEBPACK_IMPORTED_MODULE_5__models_typeRecicle__["a" /* TypeRecycle */][itemTypeId]) {
            out = __WEBPACK_IMPORTED_MODULE_5__models_typeRecicle__["a" /* TypeRecycle */][itemTypeId];
        }
        return out;
    };
    UtilsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], Object])
    ], UtilsProvider);
    return UtilsProvider;
}());

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recycle_recycle__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_profile__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(321);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__recycle_recycle__["a" /* RecyclePage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__profile_profile__["a" /* ProfilePage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/tabs/tabs.html"*/'<ion-tabs icon-only>\n    <ion-tab [root]="tab1Root" tabTitle="Inicio" tabIcon="home"></ion-tab>\n    <ion-tab [root]="tab2Root" tabTitle="Reciclar!" tabIcon="reciclaUA-recyle"></ion-tab>\n    <ion-tab [root]="tab3Root" tabTitle="Perfil" tabIcon="contact"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ })

},[364]);
//# sourceMappingURL=main.js.map