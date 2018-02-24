webpackJsonp([1],{

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_session__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_app_app__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_app_config__ = __webpack_require__(74);
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
    function LoginPage(config, sessionProvider, app, http, fb) {
        this.config = config;
        this.sessionProvider = sessionProvider;
        this.app = app;
        this.http = http;
        this.fb = fb;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.doFbLogin = function () {
        var _this = this;
        this.login().then(function (res) {
            res.subscribe(function (user) {
                if (user != null) {
                    _this.sessionProvider.updateSession(user);
                    _this.app.getRootNavs()[0].setRoot(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
                }
            });
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
                    recycleItems: []
                };
                return _this.findOrCreateUser(user).map(function (res) {
                    if (res.value != null) {
                        user = res.value;
                    }
                    else {
                        user = res;
                    }
                    return user;
                }).catch(function (error) {
                    return __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__["Observable"].throw("[login()] ->" + error);
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
                    recycleItems: []
                };
                return _this.findOrCreateUser(user).map(function (res) {
                    if (res.value != null) {
                        user = res.value;
                    }
                    else {
                        user = res;
                    }
                    return user;
                }).catch(function (error) {
                    return __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__["Observable"].throw("[login()] ->" + error);
                });
            }
            else {
                return null;
            }
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
                        return __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__["Observable"].of(res.user);
                    }
                    else {
                        return __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__["Observable"].of(null);
                    }
                }).catch(function (error) {
                    return __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__["Observable"].throw("[findOrCreateUser] -> " + error);
                });
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__["Observable"].of(null);
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
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__["Observable"].throw(error);
        });
    };
    LoginPage.prototype.createUserByFBUser = function (user) {
        var user;
        var status;
        var options = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]({
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
            selector: 'page-login',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/login/login.html"*/'<ion-content text-center class="vertical-align-content">\n    <ion-grid>\n        <ion-row>\n            <ion-col>\n                <h2>{{ config.appName }}</h2>\n                <p>\n                    Proyecto reciclaje TFG en la universidad de Alicante.\n                </p>\n                \n                <ion-col class="login-button">\n                    <button ion-button block (click)="doFbLogin()">Facebook Login</button>\n                </ion-col>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/login/login.html"*/,
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_8__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_app_app__["a" /* App */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__["a" /* Facebook */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 167:
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
webpackEmptyAsyncContext.id = 167;

/***/ }),

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/tabs/tabs.module": [
		693,
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
webpackAsyncContext.id = 212;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecyclePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_transfer__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_path__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_location_accuracy__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_app_config__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_Rx__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__recycleFinish_recycleFinish__ = __webpack_require__(313);
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
    function RecyclePage(config, navCtrl, camera, transfer, file, filePath, actionSheetCtrl, toastCtrl, platform, loadingCtrl, geolocation, locationAccuracy, http) {
        this.config = config;
        this.navCtrl = navCtrl;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.filePath = filePath;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.geolocation = geolocation;
        this.locationAccuracy = locationAccuracy;
        this.http = http;
        this.image = null;
        this.lastImage = null;
        this.errorMsg = "";
    }
    RecyclePage.prototype.ionViewDidLoad = function () {
        if (this.platform.is('cordova') && !this.config.DEBUG_MODE) {
            this.slides.lockSwipes(true);
        }
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
                myPosition = {
                    id: null,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                _this.getNearestStoragePoint(myPosition).subscribe(function (result) {
                    var storagePoint = result.storagePoint;
                    if (result.status == 200) {
                        var mapWindow;
                        if (_this.platform.is('ios')) {
                            mapWindow = window.open('maps://?q=Yo&saddr=' + myPosition.latitude + ',' + myPosition.longitude + '&daddr=' + storagePoint.position.latitude + ',' + storagePoint.position.longitude, '_system');
                        }
                        else if (_this.platform.is('android')) {
                            mapWindow = window.open('geo://' + storagePoint.position.latitude + ',' + storagePoint.position.longitude + 'q=' + myPosition.latitude + ',' + myPosition.longitude + '(Yo)', '_system');
                        }
                        if (mapWindow) {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__recycleFinish_recycleFinish__["a" /* recycleFinishPage */], {
                                recycleItemType: _this.recycleItemType,
                                storageId: result.storagePoint.id
                            });
                        }
                    }
                });
            }).catch(function (error) {
                _this.presentToast('Error en la obtención de la ubicación.');
            });
        }).catch(function (error) {
            _this.presentToast('Error en la obtención de los permisos necesarios.');
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
            _this.presentToast('Error en la selección de la imagen.');
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
            _this.presentToast('Error en el almacenamiento de la imagen.');
        });
    };
    RecyclePage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
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
            _this.presentToast('Image succesful uploaded.');
        }, function (err) {
            _this.loading.dismissAll();
            _this.presentToast('Error while uploading file.');
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */])
    ], RecyclePage.prototype, "slides", void 0);
    RecyclePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recycle',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            Reciclar!\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-slides pager>\n        <ion-slide>\n            <button ion-button (click)="presentActionSheet()">\n                Quiero reciclar\n            </button>\n        </ion-slide>\n        <ion-slide>\n            ¿Dónde me encuentro?\n            <button ion-button (click)="getUserPosition()">\n                Seleccionar ubicación\n            </button>\n            <!--<img src="{{pathForImage(lastImage)}}" [hidden]="lastImage === null">\n            <button ion-button (click)="uploadImage()">\n                Buscar contenedor más cercano!\n            </button>-->\n        </ion-slide>\n    </ion-slides>\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_8__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
            __WEBPACK_IMPORTED_MODULE_9__angular_http__["b" /* Http */]])
    ], RecyclePage);
    return RecyclePage;
}());

//# sourceMappingURL=recycle.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return recycleFinishPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_typeRecicle__ = __webpack_require__(669);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_session__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_config__ = __webpack_require__(74);
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
        this.sessionProvider.getSession().then(function (res) {
            var recycleItem;
            recycleItem = {
                id: null,
                name: __WEBPACK_IMPORTED_MODULE_2__models_typeRecicle__["a" /* TypeRecycle */][_this.recycleItemType],
                image: "",
                recycleUser: res.id,
                storage: _this.storageId,
                itemType: _this.recycleItemType
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
            selector: 'page-recycleFinish',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycleFinish/recycleFinish.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            Finalizar Reciclaje\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <p>Msg: {{ msg }}</p>\n    <button ion-button (click)="recycleFinish()">\n        Finalizar reciclaje\n    </button>\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycleFinish/recycleFinish.html"*/
        }),
        __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_5__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], recycleFinishPage);
    return recycleFinishPage;
}());

//# sourceMappingURL=recycleFinish.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactPage = (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/contact/contact.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            Contact\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list>\n        <ion-list-header>Follow us on Twitter</ion-list-header>\n        <ion-item>\n            <ion-icon name="ionic" item-start></ion-icon>\n            @ionicframework\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/contact/contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_session__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(133);
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
    function HomePage(sessionProvider, app) {
        var _this = this;
        this.sessionProvider = sessionProvider;
        this.app = app;
        sessionProvider.getSession().then(function (res) {
            _this.user = res;
        });
    }
    HomePage.prototype.logout = function () {
        this.sessionProvider.destroySession();
        this.app.getRootNavs()[0].setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/home/home.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Home</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <br>\n    <button ion-button block (click)="logout()">Logout</button>\n\n    <ion-card *ngIf="user">\n        <ion-card-header>{{ user.fullName }}</ion-card-header>\n        <img [src]="user.profilePicture" />\n        <ion-card-content>\n            <p>Email: {{ user.email }}</p>\n            <p>First Name: {{ user.name }}</p>\n        </ion-card-content>\n    </ion-card>\n\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(364);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(690);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_index__ = __webpack_require__(691);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_session__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_config__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_file__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_transfer__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_file_path__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_camera__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_location_accuracy__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_google_maps__ = __webpack_require__(692);
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
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/tabs/tabs.module#TabsModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_10__angular_http__["c" /* HttpModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_index__["a" /* APP_PAGES */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__["a" /* Facebook */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_9__providers_session__["a" /* SessionProvider */],
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

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(314);
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

/***/ 669:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TypeRecycle; });
var TypeRecycle;
(function (TypeRecycle) {
    TypeRecycle[TypeRecycle["organic"] = 1] = "organic";
    TypeRecycle[TypeRecycle["plastic"] = 2] = "plastic";
    TypeRecycle[TypeRecycle["glass"] = 3] = "glass";
    TypeRecycle[TypeRecycle["paper"] = 4] = "paper";
})(TypeRecycle || (TypeRecycle = {}));
//# sourceMappingURL=typeRecicle.js.map

/***/ }),

/***/ 690:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_status_bar__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_session__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(133);
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

/***/ 691:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_PAGES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__recycle_recycle__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contact_contact__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__recycleFinish_recycleFinish__ = __webpack_require__(313);






var APP_PAGES = [
    __WEBPACK_IMPORTED_MODULE_0__recycle_recycle__["a" /* RecyclePage */],
    __WEBPACK_IMPORTED_MODULE_1__contact_contact__["a" /* ContactPage */],
    __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */],
    __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */],
    __WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */],
    __WEBPACK_IMPORTED_MODULE_5__recycleFinish_recycleFinish__["a" /* recycleFinishPage */]
];
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return APP_CONFIG_TOKEN; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);

// Configuration values for our app
var APP_CONFIG = {
    appName: 'ReciclaWeb App',
    apiEndpoint: 'https://reciclaweb-server.herokuapp.com',
    DEBUG_MODE: true
};
var APP_CONFIG_TOKEN = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* InjectionToken */]('config');
//# sourceMappingURL=app-config.js.map

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recycle_recycle__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact_contact__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(316);
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
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__contact_contact__["a" /* ContactPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/tabs/tabs.html"*/'<ion-tabs icon-only>\n    <ion-tab [root]="tab1Root" tabTitle="Inicio" tabIcon="home"></ion-tab>\n    <ion-tab [root]="tab2Root" tabTitle="Reciclar!" tabIcon="reciclaUA-recyle"></ion-tab>\n    <ion-tab [root]="tab3Root" tabTitle="to-do" tabIcon="contacts"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ })

},[359]);
//# sourceMappingURL=main.js.map