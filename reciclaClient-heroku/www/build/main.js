webpackJsonp([1],{

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TypeRecycle; });
var TypeRecycle;
(function (TypeRecycle) {
    TypeRecycle[TypeRecycle["Org\u00E1nico"] = 1] = "Org\u00E1nico";
    TypeRecycle[TypeRecycle["Pl\u00E1stico"] = 2] = "Pl\u00E1stico";
    TypeRecycle[TypeRecycle["Cristal"] = 3] = "Cristal";
    TypeRecycle[TypeRecycle["Papel"] = 4] = "Papel";
    TypeRecycle[TypeRecycle["Material de Oficina"] = 5] = "Material de Oficina";
})(TypeRecycle || (TypeRecycle = {}));
//# sourceMappingURL=typeRecicle.js.map

/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_session__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_notifications__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_app_app__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_app_config__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_angular__ = __webpack_require__(41);
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

/***/ 170:
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
webpackEmptyAsyncContext.id = 170;

/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/tabs/tabs.module": [
		699,
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
webpackAsyncContext.id = 215;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecyclePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_transfer__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_location_accuracy__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_config__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Rx__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_position__ = __webpack_require__(672);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__recycle_map_recycleMap__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_notifications__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_google__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_session__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__models_recycleItem__ = __webpack_require__(676);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__models_typeRecicle__ = __webpack_require__(135);
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
    function RecyclePage(config, navCtrl, camera, transfer, actionSheetCtrl, platform, loadingCtrl, geolocation, locationAccuracy, http, notificationProvider, googleCloudServiceProvider, sessionProvider) {
        this.config = config;
        this.navCtrl = navCtrl;
        this.camera = camera;
        this.transfer = transfer;
        this.actionSheetCtrl = actionSheetCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.geolocation = geolocation;
        this.locationAccuracy = locationAccuracy;
        this.http = http;
        this.notificationProvider = notificationProvider;
        this.googleCloudServiceProvider = googleCloudServiceProvider;
        this.sessionProvider = sessionProvider;
        this.lastImage = null;
        this.errorMsg = "";
        this.recycleItem = new __WEBPACK_IMPORTED_MODULE_15__models_recycleItem__["a" /* RecycleItem */]();
    }
    RecyclePage.prototype.ionViewDidLoad = function () {
        if (this.platform.is('cordova') && !this.config.DEBUG_MODE) {
            this.slides.lockSwipes(true);
        }
    };
    RecyclePage.prototype.loadPositionSlide = function (recycleItemType) {
        this.sessionProvider.getSession;
        this.recycleItem.id = null;
        this.recycleItem.image = this.config.defaultImageDirectory;
        this.recycleItem.itemType = recycleItemType;
        this.recycleItem.name = __WEBPACK_IMPORTED_MODULE_16__models_typeRecicle__["a" /* TypeRecycle */][this.recycleItem.itemType];
        this.recycleItem.recycleUser = this.user.id;
        this.recycleItem.createdDate = new Date();
        this.recycleItem.itemType = recycleItemType;
        this.slideNext();
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
            myPosition = new __WEBPACK_IMPORTED_MODULE_10__models_position__["a" /* Position */](position.coords.latitude, position.coords.longitude);
            _this.saveUserPosition(_this.user, myPosition).subscribe(function (res) {
                _this.goToMapPage(_this.user.lastPosition);
            }, function (err) {
                _this.notificationProvider.presentTopToast('Error guardando el usuario.');
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
            targetWidth: 350,
            targetHeight: 350,
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
            _this.notificationProvider.presentTopToast('Error en la selección de la imagen.');
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
                            text: 'Cargar de la librería',
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
    RecyclePage.prototype.slideNext = function () {
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
    };
    RecyclePage.prototype.slidePrev = function () {
        this.slides.lockSwipes(false);
        this.slides.slidePrev();
        this.slides.lockSwipes(true);
    };
    RecyclePage.prototype.uploadImage = function (targetPath) {
        var _this = this;
        var date = new Date();
        var filename = this.user.id + "_" + date.getTime() + ".png";
        var url = this.config.uploadFilesUrl;
        var urlUpload = url + "/upload.php";
        var urlUploadedFiles = url + '/uploads/' + filename;
        this.recycleItem.id = null;
        this.recycleItem.image = urlUploadedFiles;
        this.recycleItem.name = __WEBPACK_IMPORTED_MODULE_16__models_typeRecicle__["a" /* TypeRecycle */][this.recycleItem.itemType];
        this.recycleItem.recycleUser = this.user.id;
        this.recycleItem.itemType = Math.floor(Math.random() * (5 - 1)) + 1; //TODO
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
        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, urlUpload, options).then(function (data) {
            _this.googleCloudServiceProvider.getLabels(urlUploadedFiles).timeout(_this.config.defaultTimeoutTime).subscribe(function (result) {
                var labelResponseList;
                labelResponseList = result.json().responses[0].labelAnnotations;
                if (labelResponseList.length > 0) {
                    //TODO FIND BY NAME labelResponseList[0].description
                    _this.googleCloudServiceProvider.translateToSpanish(labelResponseList[0].description).subscribe(function (res) {
                        _this.recycleItem.name = res.json().data.translations[0].translatedText;
                        _this.loading.setContent("Obteniendo la ubicación del usuario...");
                        _this.getUserPosition();
                    }, function (err) {
                        _this.loading.dismissAll();
                        _this.notificationProvider.presentTopToast("Error interno en la obtención del nombre.");
                    });
                }
            }, function (err) {
                _this.loading.dismissAll();
                _this.notificationProvider.presentTopToast("Error a la hora de utilizar la imagen.");
            });
        }, function (err) {
            _this.loading.dismissAll();
            _this.notificationProvider.presentTopToast('Error while uploading file.');
        });
    };
    RecyclePage.prototype.getNearestStoragePoint = function (currentPosition) {
        var status;
        var storagePointList;
        var storagePoint;
        return this.http.get(this.config.apiEndpoint + "/storagePoints").map(function (res) {
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
            console.log(error);
            return __WEBPACK_IMPORTED_MODULE_8_rxjs_Rx__["Observable"].throw(error);
        });
    };
    RecyclePage.prototype.goToMapPage = function (myPosition) {
        var _this = this;
        this.getNearestStoragePoint(myPosition).timeout(this.config.defaultTimeoutTime).subscribe(function (result) {
            _this.loading.dismissAll();
            _this.recycleItem.storage = result.storagePoint;
            if (result.status == 200) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__recycle_map_recycleMap__["a" /* MapPage */], {
                    recycleItem: _this.recycleItem,
                    myPosition: myPosition,
                });
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
        return this.http.put(this.config.apiEndpoint + "/users/" + user.id, JSON.stringify(user)).timeout(this.config.defaultTimeoutTime);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Slides */])
    ], RecyclePage.prototype, "slides", void 0);
    RecyclePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recycle',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            Reciclar!\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-slides pager>\n        <ion-slide>\n            <img src="assets/imgs/quieroReciclar.png" />\n            <p>\n                <button ion-button (click)="presentActionSheetActions()">\n                    Quiero reciclar\n                </button>\n            </p>\n        </ion-slide>\n        <ion-slide>\n            <p>¿Dónde me encuentro?</p>\n            <p>\n                <button ion-button icon-only (click)=\'slidePrev()\' color="dark">\n                    <ion-icon name="arrow-back"></ion-icon>\n                </button>\n                <button ion-button (click)="getUserPositionButton()">\n                    Seleccionar ubicación\n                </button>\n            </p>\n\n\n            <!--<img src="{{pathForImage(lastImage)}}" [hidden]="lastImage === null">\n            <button ion-button (click)="uploadImage()">\n                Buscar contenedor más cercano!\n            </button>-->\n        </ion-slide>\n    </ion-slides>\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_6__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
            __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_12__providers_notifications__["a" /* NotificationProvider */],
            __WEBPACK_IMPORTED_MODULE_13__providers_google__["a" /* GoogleCloudServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_14__providers_session__["a" /* SessionProvider */]])
    ], RecyclePage);
    return RecyclePage;
}());

//# sourceMappingURL=recycle.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_notifications__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_config__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_session__ = __webpack_require__(40);
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
    function MapPage(navParams, notificationProvider, alertCtrl, http, sessionProvider, config) {
        this.navParams = navParams;
        this.notificationProvider = notificationProvider;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.sessionProvider = sessionProvider;
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
                zoom: 12,
                tilt: 30
            }
        };
        this.map = __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["a" /* GoogleMaps */].create('map_canvas', mapOptions);
        // Wait the MAP_READY before using any methods.
        this.map.one(__WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MAP_READY)
            .then(function () {
            _this.createMarker(_this.myPosition, "Yo", 'blue').then(function (marker) {
                marker.showInfoWindow();
            });
            _this.createMarker(_this.recycleItem.storage.position, "Punto más cercano", 'green').then(function (marker) {
                marker.showInfoWindow();
            });
        })
            .catch(function (error) {
            _this.notificationProvider.presentTopToast("Parece que ha habido algún problema");
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
            _this.http.post(_this.config.apiEndpoint + "/recycleItems?token=" + user.accessToken, JSON.stringify(_this.recycleItem), options).subscribe(function (res) {
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
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recycleMap',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle_map/recycleMap.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>\n			Reciclar: {{recycleItem.name}}\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<div #map id="map_canvas">\n		<ion-fab left bottom>\n			<button ion-fab color="dark">\n				<ion-icon name="menu"></ion-icon>\n			</button>\n			<ion-fab-list side="top">\n				<div *ngIf="recycledAlready == false;">\n					<button ion-fab (click)="modifyRecycleName()">\n						<ion-icon name="md-create"></ion-icon>\n						<ion-label>Modificar el nombre</ion-label>\n					</button>\n					<button ion-fab (click)="recycleFinish()">\n						<ion-icon name="checkmark"></ion-icon>\n						<ion-label>Finalizar reciclaje</ion-label>\n					</button>\n				</div>\n			</ion-fab-list>\n		</ion-fab>\n	</div>\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle_map/recycleMap.html"*/
        }),
        __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_5__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_notifications__["a" /* NotificationProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_6__providers_session__["a" /* SessionProvider */], Object])
    ], MapPage);
    return MapPage;
}());

//# sourceMappingURL=recycleMap.js.map

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleCloudServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_config__ = __webpack_require__(39);
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

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_session__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profile_recycledItems_myRecycledItems__ = __webpack_require__(319);
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
    function ProfilePage(sessionProvider, navCtrl, app) {
        var _this = this;
        this.sessionProvider = sessionProvider;
        this.navCtrl = navCtrl;
        this.app = app;
        sessionProvider.getSession().then(function (res) {
            _this.user = res;
        });
    }
    ProfilePage.prototype.goToLogout = function () {
        this.sessionProvider.destroySession();
        this.app.getRootNavs()[0].setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    ProfilePage.prototype.goToMyRecycledItems = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__profile_recycledItems_myRecycledItems__["a" /* myRecycledItemsPage */]);
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            Perfil\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-grid>\n        <ion-row>\n            <ion-col>\n                <button ion-button block (click)="goToMyRecycledItems()">Historial de reciclaje</button>\n                <button ion-button block (click)="goToLogout()">Cerrar sesión</button>\n\n                <ion-card *ngIf="user">\n                    <ion-card-header>{{ user.fullName }}</ion-card-header>\n                    <img [src]="user.profilePicture" />\n                    <ion-card-content>\n                        <p>Email: {{ user.email }}</p>\n                        <p>Nombre: {{ user.name }}</p>\n                        <p>Fecha registro: {{ user.createdDate | date: \'dd/MM/yyyy H:mm\'}}</p>\n                    </ion-card-content>\n                </ion-card>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return myRecycledItemsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_typeRecicle__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_config__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_session__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
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
    function myRecycledItemsPage(http, config, sessionProvider) {
        this.http = http;
        this.config = config;
        this.sessionProvider = sessionProvider;
        this.showLoadingMsg = true;
        this.errorLoadingContent = false;
        this.recycleItems = [];
        this.getRecycleItems();
    }
    myRecycledItemsPage.prototype.ionViewDidLoad = function () {
        this.recycleItemHTML =
            "<ion-card><ion-item>" +
                "<ion-avatar item-start>" +
                "<img src='img / marty - avatar.png'>" +
                "</ion-avatar>" +
                "Item Name" +
                "<p>itemType</p>" +
                "<!--{{ user.createdDate | date: 'dd/MM/yyyy H:mm'}}-->" +
                "</ion-item></ion-card>";
    };
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
        this.sessionProvider.getSession().then(function (user) {
            for (var item in user.recycleItems) {
            }
            _this.http.get(_this.config.apiEndpoint + "/users/" + user.id + "/recycleItems?token=" + user.accessToken).timeout(_this.config.defaultTimeoutTime).subscribe(function (res) {
                status = res.status;
                if (status === 200) {
                    var recycleItemTempList = res.json();
                    _this.recycleItems = _this.readRecycleItems(recycleItemTempList);
                }
                else {
                    _this.errorLoadingContent = true;
                }
                _this.showLoadingMsg = false;
            }, function (error) {
                _this.showLoadingMsg = false;
                _this.errorLoadingContent = true;
            });
        }).catch(function (error) {
            _this.showLoadingMsg = false;
            _this.errorLoadingContent = true;
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
    myRecycledItemsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-myRecycledItems',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile_recycledItems/myRecycledItems.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Historial de reciclaje</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-grid style="height: 100%">\n\n        <div *ngIf="recycleItems?.length > 0;else recycleItemsNotFound">\n            <ion-row justify-content-center align-items-center style="height: 100%">\n                <ion-col>\n                    <div *ngFor="let recycleItem of recycleItems">\n\n                        <ion-card>\n                            <ion-item>\n                                <ion-avatar item-start>\n                                    <img src="{{recycleItem.image}}">\n                                </ion-avatar>\n                                {{recycleItem.name}}\n                                <p>{{ getItemType(recycleItem.itemType.id) }} - {{ recycleItem.createdDate | date: \'dd/MM/yyyy\n                                    H:mm\'}}\n                                </p>\n                            </ion-item>\n                        </ion-card>\n                    </div>\n                </ion-col>\n            </ion-row>\n        </div>\n\n    </ion-grid>\n</ion-content>\n\n\n\n<ng-template #recycleItemsNotFound>\n    <ion-row align-items-center text-center style="height: 100%">\n        <ion-col>\n            <div *ngIf="showLoadingMsg == true; else showLoadingResult">\n                <h5>Cargando...</h5>\n            </div>\n            <ng-template #showLoadingResult>\n                <div *ngIf="errorLoadingContent == true; else showNoRecycledItemsFound">\n                    <div>\n                        <p>Ha habido algún problema</p>\n                        <h5 style="font-weight: bold">Intentalo de nuevo en unos minutos</h5>\n                    </div>\n                </div>\n                <ng-template #showNoRecycledItemsFound>\n                    <div>\n                        <p>Todavía no has reciclado nada</p>\n                        <h5 style="font-weight: bold">¡A qué esperas!</h5>\n                    </div>\n                </ng-template>\n            </ng-template>\n        </ion-col>\n    </ion-row>\n</ng-template>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile_recycledItems/myRecycledItems.html"*/
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], Object, __WEBPACK_IMPORTED_MODULE_4__providers_session__["a" /* SessionProvider */]])
    ], myRecycledItemsPage);
    return myRecycledItemsPage;
}());

//# sourceMappingURL=myRecycledItems.js.map

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_config__ = __webpack_require__(39);
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





var HomePage = (function () {
    function HomePage(config, http) {
        this.config = config;
        this.http = http;
    }
    HomePage.prototype.ionViewDidLoad = function () {
    };
    HomePage.prototype.test = function () {
        this.test1().subscribe(function (res) {
            console.log("prueba");
        });
    };
    HomePage.prototype.test1 = function () {
        var status;
        //TEST
        return this.http.get(this.config.apiEndpoint + "/users/19/recycleItems").map(function (res) {
            status = res.status;
            var recycleItems = "";
            if (status === 200) {
                recycleItems = res.json();
            }
            return { recycleItems: recycleItems, status: status };
        }).catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error);
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/home/home.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Home</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-grid style="height: 100%">\n        <ion-row align-items-center text-center style="height: 100%">\n            <ion-col>\n                <h5>ReciclaUA</h5>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/home/home.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_4__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(367);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(694);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_index__ = __webpack_require__(695);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_session__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_config__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_file__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_transfer__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_file_path__ = __webpack_require__(698);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_camera__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_location_accuracy__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_google_maps__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_notifications__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_google__ = __webpack_require__(316);
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

/***/ 39:
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
    googleCloudVisionAPIKey: 'AIzaSyCVl9Ien_9KOFEN197dPqklyIJ7ad1z44k'
};
var APP_CONFIG_TOKEN = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* InjectionToken */]('config');
//# sourceMappingURL=app-config.js.map

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(315);
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

/***/ 672:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Position; });
var Position = (function () {
    function Position(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
    return Position;
}());

//# sourceMappingURL=position.js.map

/***/ }),

/***/ 676:
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

/***/ 694:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_status_bar__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_session__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(136);
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

/***/ 695:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_PAGES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__recycle_recycle__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__profile_profile__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__recycle_recycle_finish_recycleFinish__ = __webpack_require__(696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__profile_profile_recycledItems_myRecycledItems__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__recycle_recycle_map_recycleMap__ = __webpack_require__(313);








var APP_PAGES = [
    __WEBPACK_IMPORTED_MODULE_0__recycle_recycle__["a" /* RecyclePage */],
    __WEBPACK_IMPORTED_MODULE_1__profile_profile__["a" /* ProfilePage */],
    __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */],
    __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */],
    __WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */],
    __WEBPACK_IMPORTED_MODULE_5__recycle_recycle_finish_recycleFinish__["a" /* recycleFinishPage */],
    __WEBPACK_IMPORTED_MODULE_6__profile_profile_recycledItems_myRecycledItems__["a" /* myRecycledItemsPage */],
    __WEBPACK_IMPORTED_MODULE_7__recycle_recycle_map_recycleMap__["a" /* MapPage */]
];
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 696:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return recycleFinishPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_typeRecicle__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_session__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_config__ = __webpack_require__(39);
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

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
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

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recycle_recycle__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_profile__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(320);
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

},[362]);
//# sourceMappingURL=main.js.map