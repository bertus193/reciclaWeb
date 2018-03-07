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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_session__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_toast__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_app_app__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_app_config__ = __webpack_require__(44);
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
    function LoginPage(config, sessionProvider, app, http, fb, toastProvider) {
        this.config = config;
        this.sessionProvider = sessionProvider;
        this.app = app;
        this.http = http;
        this.fb = fb;
        this.toastProvider = toastProvider;
    }
    LoginPage.prototype.doFbLogin = function () {
        var _this = this;
        this.login().then(function (res) {
            res.subscribe(function (user) {
                if (user != null) {
                    _this.sessionProvider.updateSession(user);
                    _this.app.getRootNavs()[0].setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
                }
            }, function (error) {
                _this.toastProvider.presentToast('Ups! Hay algún problema, prueba en unos minutos.');
            });
        }).catch(function (error) {
            _this.toastProvider.presentToast('Ups! Hay algún problema, prueba en unos minutos.');
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
                    createdDate: null
                };
                return _this.findOrCreateUser(user).timeout(5000).map(function (res) {
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
                    createdDate: new Date()
                };
                return _this.findOrCreateUser(user).timeout(5000).map(function (res) {
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
        return this.http.get(this.config.apiEndpoint + "/users?email=" + email).map(function (res) {
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
            __WEBPACK_IMPORTED_MODULE_2__providers_toast__["a" /* ToastProvider */]])
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
		697,
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_transfer__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_path__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_location_accuracy__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_app_config__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_http__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_Rx__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__models_position__ = __webpack_require__(673);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__recycle_map_recycleMap__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_toast__ = __webpack_require__(84);
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
    function RecyclePage(config, navCtrl, camera, transfer, file, filePath, actionSheetCtrl, platform, loadingCtrl, geolocation, locationAccuracy, http, toastProvider) {
        this.config = config;
        this.navCtrl = navCtrl;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.filePath = filePath;
        this.actionSheetCtrl = actionSheetCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.geolocation = geolocation;
        this.locationAccuracy = locationAccuracy;
        this.http = http;
        this.toastProvider = toastProvider;
        this.image = null;
        this.lastImage = null;
        this.errorMsg = "";
    }
    RecyclePage.prototype.ionViewDidLoad = function () {
        if (this.platform.is('cordova') && !this.config.DEBUG_MODE) {
            this.slides.lockSwipes(true);
        }
    };
    RecyclePage.prototype.test = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_13__recycle_map_recycleMap__["a" /* MapPage */], {
            recycleItemType: this.recycleItemType,
            myPosition: null,
            storagePoint: null
        });
    };
    RecyclePage.prototype.loadPositionSlide = function (recycleItemType) {
        this.recycleItemType = recycleItemType;
        this.slideNext();
    };
    RecyclePage.prototype.getUserPosition = function () {
        var _this = this;
        var myPosition;
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(function (resp) {
            _this.geolocation.getCurrentPosition().then(function (position) {
                myPosition = new __WEBPACK_IMPORTED_MODULE_12__models_position__["a" /* Position */](position.coords.latitude, position.coords.longitude);
                _this.getNearestStoragePoint(myPosition).timeout(_this.config.defaultTimeoutTime).subscribe(function (result) {
                    var storagePoint = result.storagePoint;
                    if (result.status == 200) {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_13__recycle_map_recycleMap__["a" /* MapPage */], {
                            recycleItemType: _this.recycleItemType,
                            myPosition: myPosition,
                            storagePoint: storagePoint
                        });
                    }
                    else {
                        _this.toastProvider.presentToast('No hay ningún punto de reciclaje cercano.');
                    }
                }, function (error) {
                    _this.toastProvider.presentToast('Parece que ha habido algún problema, prueba en unos minutos.');
                });
            });
        }).catch(function (error) {
            _this.toastProvider.presentToast('Error en la obtención de los permisos necesarios.');
        });
    };
    RecyclePage.prototype.takePicture = function (sourceType) {
        var _this = this;
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            //this.image = `data:image/jpeg;base64,${imagePath}`;
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
            _this.slideNext();
        }, function (err) {
            _this.toastProvider.presentToast('Error en la selección de la imagen.');
        });
    };
    RecyclePage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Elige un tipo de material',
            buttons: [
                /*
                {
                    text: 'Cargar de la librería',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Usar Cámara',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },*/
                {
                    text: 'Orgánico',
                    handler: function () {
                        _this.loadPositionSlide(1);
                    }
                },
                {
                    text: 'Plástico',
                    handler: function () {
                        _this.loadPositionSlide(2);
                    }
                },
                {
                    text: 'Cristal',
                    handler: function () {
                        _this.loadPositionSlide(3);
                    }
                },
                {
                    text: 'Papel',
                    handler: function () {
                        _this.loadPositionSlide(4);
                    }
                },
                {
                    text: 'Material de oficina',
                    handler: function () {
                        _this.loadPositionSlide(5);
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
    RecyclePage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".png";
        return newFileName;
    };
    // Copy the image to a local folder
    RecyclePage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            _this.errorMsg = error;
            _this.toastProvider.presentToast('Error en el almacenamiento de la imagen.');
        });
    };
    // Always get the accurate path to your apps folder
    RecyclePage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    RecyclePage.prototype.uploadImage = function () {
        var _this = this;
        // Destination URL
        var url = "https://reciclaweb.000webhostapp.com/upload.php";
        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);
        // File name only
        var filename = this.lastImage;
        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 'fileName': filename }
        };
        var fileTransfer = this.transfer.create();
        this.loading = this.loadingCtrl.create({
            content: 'Uploading...',
        });
        this.loading.present();
        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(function (data) {
            _this.loading.dismissAll();
            _this.toastProvider.presentToast('Image succesful uploaded.');
        }, function (err) {
            _this.loading.dismissAll();
            _this.toastProvider.presentToast('Error while uploading file.');
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
            return __WEBPACK_IMPORTED_MODULE_10_rxjs_Rx__["Observable"].throw(error);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Slides */])
    ], RecyclePage.prototype, "slides", void 0);
    RecyclePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recycle',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            Reciclar!\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-slides pager>\n        <ion-slide>\n            <img src="assets/imgs/quieroReciclar.png" />\n            <p>\n                <button ion-button (click)="presentActionSheet()">\n                    Quiero reciclar\n                </button>\n                <button ion-button (click)="test()">\n                    Quiero asdas\n                </button>\n            </p>\n        </ion-slide>\n        <ion-slide>\n            <p>¿Dónde me encuentro?</p>\n            <p>\n                <button ion-button icon-only (click)=\'slidePrev()\' color="dark">\n                    <ion-icon name="arrow-back"></ion-icon>\n                </button>\n                <button ion-button (click)="getUserPosition()">\n                    Seleccionar ubicación\n                </button>\n            </p>\n\n\n            <!--<img src="{{pathForImage(lastImage)}}" [hidden]="lastImage === null">\n            <button ion-button (click)="uploadImage()">\n                Buscar contenedor más cercano!\n            </button>-->\n        </ion-slide>\n    </ion-slides>\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_8__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
            __WEBPACK_IMPORTED_MODULE_9__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_14__providers_toast__["a" /* ToastProvider */]])
    ], RecyclePage);
    return RecyclePage;
}());

//# sourceMappingURL=recycle.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_toast__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_session__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_config__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_typeRecicle__ = __webpack_require__(135);
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
    function MapPage(navParams, navCtrl, toastProvider, sessionProvider, http, alertCtrl, config) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.toastProvider = toastProvider;
        this.sessionProvider = sessionProvider;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.config = config;
        this.recycledAlready = false;
        this.typeRecycle = this.navParams.get("recycleItemType");
        this.myPosition = this.navParams.get("myPosition");
        this.storagePoint = this.navParams.get("storagePoint");
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
            _this.createMarker(_this.storagePoint.position, "Punto más cercano", 'green').then(function (marker) {
                marker.showInfoWindow();
            });
        })
            .catch(function (error) {
            _this.toastProvider.presentToast("Parece que ha habido algún problema");
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
        var options = new __WEBPACK_IMPORTED_MODULE_5__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json'
            })
        });
        this.sessionProvider.getSession().then(function (user) {
            var recycleItem;
            recycleItem = {
                id: null,
                name: __WEBPACK_IMPORTED_MODULE_7__models_typeRecicle__["a" /* TypeRecycle */][_this.typeRecycle],
                image: "",
                recycleUser: user.id,
                storage: _this.storagePoint.id,
                itemType: _this.typeRecycle,
                createdDate: null
            };
            return _this.http.post(_this.config.apiEndpoint + "/recycleItems", JSON.stringify(recycleItem), options).subscribe(function (res) {
                var status = res.status;
                if (status === 201) {
                    _this.recycledAlready = true;
                    var alert_1 = _this.alertCtrl.create({
                        title: '¡Ya está!',
                        subTitle: 'Se ha guardadado correctamente este reciclado!',
                        buttons: ['OK']
                    });
                    alert_1.present();
                }
                else {
                    _this.toastProvider.presentToast("Los datos insertados son incorrectos.");
                }
            });
        }).catch(function (error) {
            _this.toastProvider.presentToast("Error encontrado, por favor contacte con el administrador." + error);
        });
    };
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recycleMap',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle_map/recycleMap.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            Mapa\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div #map id="map_canvas">\n        <ion-fab left bottom>\n            <button ion-fab color="dark">\n                <ion-icon name="menu"></ion-icon>\n            </button>\n            <ion-fab-list side="top">\n                <div *ngIf="recycledAlready == false;">\n                    <button ion-fab (click)="recycleFinish()">\n                        <ion-icon name="checkmark"></ion-icon>\n                        <ion-label>Finalizar reciclaje</ion-label>\n                    </button>\n                </div>\n            </ion-fab-list>\n        </ion-fab>\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle_map/recycleMap.html"*/
        }),
        __param(6, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_6__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_toast__["a" /* ToastProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], Object])
    ], MapPage);
    return MapPage;
}());

//# sourceMappingURL=recycleMap.js.map

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_session__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profile_recycledItems_myRecycledItems__ = __webpack_require__(320);
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

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return myRecycledItemsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_typeRecicle__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_config__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_session__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(63);
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
        this.sessionProvider.getSession().then(function (res) {
            for (var item in res.recycleItems) {
            }
            _this.http.get(_this.config.apiEndpoint + "/users/" + res.id + "/recycleItems").timeout(5000).subscribe(function (res) {
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
                console.log("prueba");
                recycleItemList[item].itemType = itemTypeItems.filter(function (x) { return x.id == recycleItemList[item].itemType; })[0];
            }
        };
        for (var item in recycleItemList) {
            _loop_1(item);
        }
        console.log(recycleItemList);
        return recycleItemList;
    };
    myRecycledItemsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-myRecycledItems',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile_recycledItems/myRecycledItems.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Historial de reciclaje</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-grid style="height: 100%">\n\n        <div *ngIf="recycleItems?.length > 0;else recycleItemsNotFound">\n            <ion-row justify-content-center align-items-center style="height: 100%">\n                <ion-col>\n                    <div *ngFor="let recycleItem of recycleItems">\n\n                        <ion-card>\n                            <ion-item>\n                                <ion-avatar item-start>\n                                    <img src="{{recycleItem.image}}">\n                                </ion-avatar>\n                                {{recycleItem.name}}\n                                <p>{{ getItemType(recycleItem.itemType.id) }} - {{ recycleItem.createdDate | date: \'dd/MM/yyyy\n                                    H:mm\'}}\n                                </p>\n                            </ion-item>\n                        </ion-card>\n                    </div>\n                </ion-col>\n            </ion-row>\n        </div>\n\n    </ion-grid>\n</ion-content>\n\n\n\n<ng-template #recycleItemsNotFound>\n    <ion-row align-items-center text-center style="height: 100%">\n        <ion-col>\n            <div *ngIf="showLoadingMsg == true; else showLoadingResult">\n                <h5>Cargando...</h5>\n            </div>\n            <ng-template #showLoadingResult>\n                <div *ngIf="errorLoadingContent == true; else showNoRecycledItemsFound">\n                    <div>\n                        <p>Ha habido algún problema</p>\n                        <h5 style="font-weight: bold">Intentalo de nuevo en unos minutos</h5>\n                    </div>\n                </div>\n                <ng-template #showNoRecycledItemsFound>\n                    <div>\n                        <p>Todavía no has reciclado nada</p>\n                        <h5 style="font-weight: bold">¡A qué esperas!</h5>\n                    </div>\n                </ng-template>\n            </ng-template>\n        </ion-col>\n    </ion-row>\n</ng-template>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile_recycledItems/myRecycledItems.html"*/
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__app_app_config__["ApplicationConfig"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_app_config__["ApplicationConfig"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__providers_session__["a" /* SessionProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_session__["a" /* SessionProvider */]) === "function" && _c || Object])
    ], myRecycledItemsPage);
    return myRecycledItemsPage;
    var _a, _b, _c;
}());

//# sourceMappingURL=myRecycledItems.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_config__ = __webpack_require__(44);
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

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(368);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(694);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_index__ = __webpack_require__(695);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_session__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_config__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_file__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_transfer__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_file_path__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_camera__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_location_accuracy__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_google_maps__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_toast__ = __webpack_require__(84);
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
                __WEBPACK_IMPORTED_MODULE_19__providers_toast__["a" /* ToastProvider */],
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

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return APP_CONFIG_TOKEN; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);

// Configuration values for our app
var APP_CONFIG = {
    appName: 'ReciclaWeb App',
    apiEndpoint: 'https://reciclaweb-server.herokuapp.com',
    DEBUG_MODE: true,
    defaultTimeoutTime: 5000
};
var APP_CONFIG_TOKEN = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* InjectionToken */]('config');
//# sourceMappingURL=app-config.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(317);
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

/***/ 673:
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

/***/ 694:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_status_bar__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_session__ = __webpack_require__(45);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__profile_profile__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__recycle_recycle_finish_recycleFinish__ = __webpack_require__(696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__profile_profile_recycledItems_myRecycledItems__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__recycle_recycle_map_recycleMap__ = __webpack_require__(315);








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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_typeRecicle__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_session__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_config__ = __webpack_require__(44);
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToastProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ToastProvider = (function () {
    function ToastProvider(toastCtrl) {
        this.toastCtrl = toastCtrl;
    }
    ToastProvider.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    ToastProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], ToastProvider);
    return ToastProvider;
}());

//# sourceMappingURL=toast.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recycle_recycle__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_profile__ = __webpack_require__(318);
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

},[363]);
//# sourceMappingURL=main.js.map