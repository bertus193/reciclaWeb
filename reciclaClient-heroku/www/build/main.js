webpackJsonp([1],{

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecycleItemsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(33);
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



var RecycleItemsProvider = (function () {
    function RecycleItemsProvider(http, config) {
        this.http = http;
        this.config = config;
        this.requestJsonOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json'
            })
        });
    }
    RecycleItemsProvider.prototype.saveRecycleItem = function (recycleItem, accessToken) {
        return this.http.post(this.config.apiEndpoint + "/recycleItems/private?token=" + accessToken, JSON.stringify(recycleItem), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime);
    };
    RecycleItemsProvider.prototype.getRecycleItemById = function (id, accessToken) {
        return this.http.get(this.config.apiEndpoint + "/recycleItems/private/" + id + "?token=" + accessToken).timeout(this.config.defaultTimeoutTime);
    };
    RecycleItemsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], Object])
    ], RecycleItemsProvider);
    return RecycleItemsProvider;
}());

//# sourceMappingURL=recycleItemsProvider.js.map

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_session__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_notifications__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_app_app__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_app_config__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_api_userProvider__ = __webpack_require__(87);
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
    function LoginPage(config, sessionProvider, app, fb, loadingCtrl, notificationProvider, userProvider) {
        this.config = config;
        this.sessionProvider = sessionProvider;
        this.app = app;
        this.fb = fb;
        this.loadingCtrl = loadingCtrl;
        this.notificationProvider = notificationProvider;
        this.userProvider = userProvider;
    }
    LoginPage.prototype.doFbLogin = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Iniciando sesión...'
        });
        this.loading.present();
        this.login().then(function (res) {
            res.subscribe(function (user) {
                _this.loading.dismiss();
                if (user != null) {
                    _this.sessionProvider.updateSession(user);
                    _this.app.getRootNavs()[0].setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
                }
            }, function (error) {
                _this.loading.dismiss();
                _this.notificationProvider.presentTopToast(_this.config.defaultTimeoutMsg);
            });
        }).catch(function (error) {
            _this.loading.dismiss();
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
                return _this.findAndUpdateOrCreateUser(user).map(function (res) {
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
            return null;
        }).catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].throw("[login()] ->" + error);
        });
    };
    LoginPage.prototype.loginInDebugMode = function () {
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
        return this.findAndUpdateOrCreateUser(user).map(function (res) {
            if (res.value != null) {
                user = res.value;
            }
            else {
                user = res;
            }
            return user;
        }).catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].throw("[findAndUpdateOrCreateUser()] ->" + error);
        });
    };
    LoginPage.prototype.doFbLoginInDebugMode = function () {
        var _this = this;
        if (this.config.DEBUG_MODE) {
            this.loading = this.loadingCtrl.create({
                content: 'Iniciando sesión...'
            });
            this.loading.present();
            this.loginInDebugMode().subscribe(function (user) {
                _this.loading.dismiss();
                if (user != null) {
                    _this.sessionProvider.updateSession(user);
                    _this.app.getRootNavs()[0].setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
                }
            }, function (error) {
                _this.loading.dismiss();
                _this.notificationProvider.presentTopToast(_this.config.defaultTimeoutMsg);
            });
        }
    };
    LoginPage.prototype.findAndUpdateOrCreateUser = function (fbUser) {
        var _this = this;
        return this.findUserByEmail(fbUser.email).map(function (foundUser) {
            if (foundUser.status == 200) {
                if (_this.usersAreDifferent(fbUser, foundUser.user) == true) {
                    var postToken = foundUser.user.accessToken;
                    foundUser.user.email = fbUser.email;
                    foundUser.user.name = fbUser.name;
                    foundUser.user.fullName = fbUser.fullName;
                    foundUser.user.profilePicture = fbUser.profilePicture;
                    foundUser.user.accessToken = fbUser.accessToken;
                    return _this.userProvider.saveUser(foundUser.user, postToken).subscribe(function (res) {
                        return foundUser.user;
                    }, function (error) {
                        _this.notificationProvider.presentTopToast("Error guardando el usuario.");
                    });
                }
                else {
                    return foundUser.user;
                }
            }
            else {
                return null;
            }
        }).catch(function (err) {
            if (err.status === 404) {
                return _this.createUserByFBUser(fbUser).map(function (res) {
                    if (res.status == 201) {
                        return __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].of(res.user);
                    }
                    else {
                        return __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].of(null);
                    }
                }).catch(function (error) {
                    return __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].throw("[findAndUpdateOrCreateUser] -> " + error);
                });
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].of(null);
            }
        });
    };
    LoginPage.prototype.usersAreDifferent = function (fbUser, foundUser) {
        var out = false;
        if (fbUser.email != foundUser.email || fbUser.name != foundUser.name ||
            fbUser.fullName != foundUser.fullName || fbUser.profilePicture != foundUser.profilePicture ||
            fbUser.accessToken != foundUser.accessToken) {
            out = true;
        }
        return out;
    };
    LoginPage.prototype.findUserByEmail = function (email) {
        var user;
        var status;
        return this.userProvider.findUserByEmail(email).map(function (res) {
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
        return this.userProvider.createUser(user).map(function (res) {
            status = res.status;
            if (status === 201) {
                user = res.json();
            }
            return { user: user, status: status };
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/login/login.html"*/'<ion-content>\n    <ion-grid style="height: 100%">\n        <ion-row align-items-center text-center style="height: 100%">\n            <ion-col>\n                <h2>{{ config.appName }}</h2>\n                <p>\n                    Proyecto reciclaje TFG en la universidad de Alicante.\n                </p>\n\n                <ion-col class="login-button">\n                    <button ion-button block (click)="doFbLogin()">Facebook Login</button>\n                    <div *ngIf="config.DEBUG_MODE == true">\n                        <button ion-button block color="dark" (click)="doFbLoginInDebugMode()">Debug Login</button>\n                    </div>\n                </ion-col>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/login/login.html"*/,
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_8__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_app_app__["a" /* App */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_notifications__["a" /* NotificationProvider */],
            __WEBPACK_IMPORTED_MODULE_10__providers_api_userProvider__["a" /* UserProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 173:
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
webpackEmptyAsyncContext.id = 173;

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/tabs/tabs.module": [
		705,
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
webpackAsyncContext.id = 218;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecyclePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_crop__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_transfer__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_location_accuracy__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_config__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Rx__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_position__ = __webpack_require__(677);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__recycle_map_recycleMap__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_notifications__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_google__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_session__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__models_recycleItem__ = __webpack_require__(681);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__models_typeRecicle__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_utils__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_api_userProvider__ = __webpack_require__(87);
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
    function RecyclePage(config, navCtrl, camera, transfer, actionSheetCtrl, loadingCtrl, geolocation, locationAccuracy, alertCtrl, notificationProvider, googleCloudServiceProvider, utilsProvider, sessionProvider, userProvider, crop) {
        this.config = config;
        this.navCtrl = navCtrl;
        this.camera = camera;
        this.transfer = transfer;
        this.actionSheetCtrl = actionSheetCtrl;
        this.loadingCtrl = loadingCtrl;
        this.geolocation = geolocation;
        this.locationAccuracy = locationAccuracy;
        this.alertCtrl = alertCtrl;
        this.notificationProvider = notificationProvider;
        this.googleCloudServiceProvider = googleCloudServiceProvider;
        this.utilsProvider = utilsProvider;
        this.sessionProvider = sessionProvider;
        this.userProvider = userProvider;
        this.crop = crop;
        this.lastImage = null;
        this.errorMsg = "";
        this.temporalName = "";
        this.isitemTypeName = false;
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
        this.isitemTypeName = true;
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
            _this.user.lastPosition = position;
            _this.userProvider.saveUser(_this.user, _this.user.accessToken).subscribe(function (res) {
                _this.goToMapPage(myPosition);
            }, function (error) {
                _this.loading.dismiss();
                _this.notificationProvider.presentTopToast(_this.config.defaultTimeoutMsg);
            });
        }, function (error) {
            _this.loading.dismiss();
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
        this.loading = this.loadingCtrl.create({
            content: 'Cargando...'
        });
        this.loading.present();
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            targetWidth: 900,
            targetHeight: 900,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE
        };
        // Get the data of an image 
        this.camera.getPicture(options).then(function (imagePath) {
            var fileUri = 'file://' + imagePath;
            //var image = `data:image/png;base64,${imagePath}`; //load image on view
            _this.crop.crop(fileUri, { quality: 100, targetWidth: 650, targetHeight: 650 }).then(function (image) {
                _this.uploadImage(image);
            }, function (error) {
                _this.loading.dismiss();
                if (error.message != "User cancelled") {
                    _this.notificationProvider.presentTopToast('Error en la selección de la imagen.');
                }
            });
        }).catch(function (error) {
            _this.loading.dismiss();
            if (error != 'No Image Selected') {
                _this.notificationProvider.presentTopToast('Error en la selección de la imagen.');
            }
        });
    };
    RecyclePage.prototype.presentActionSheetActions = function () {
        var _this = this;
        this.sessionProvider.getSession().then(function (user) {
            _this.user = user;
            _this.locationAccuracy.request(_this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(function (resp) {
                _this.actionSheetMenuActions();
            }).catch(function (error) {
                if (_this.config.DEBUG_MODE == true) {
                    _this.actionSheetMenuActions();
                }
                else {
                    _this.notificationProvider.presentTopToast('Error en la obtención de los permisos necesarios.');
                }
            });
        }, function (err) {
            _this.loading.dismiss();
            _this.notificationProvider.presentTopToast('Error obteniendo los datos necesarios.');
        });
    };
    RecyclePage.prototype.actionSheetMenuActions = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
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
        this.loading.setContent('Subiendo la imagen...');
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
        this.upload(targetPath, urlUpload, options, fileTransfer, urlUploadedFiles);
    };
    RecyclePage.prototype.getTypeFromDB = function (labelResponseList) {
        var _this = this;
        return this.googleCloudServiceProvider.getLabelAnnotations(labelResponseList).map(function (res) {
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
                                _this.loading.dismiss();
                                _this.notificationProvider.presentTopToast("Error interno en la obtención del nombre.");
                            });
                        }
                        else {
                            _this.loading.dismiss();
                        }
                    }, function (error) {
                        _this.loading.dismiss();
                        _this.notificationProvider.presentTopToast("Error obteniendo el tipo de objeto");
                    });
                }
            }, function (err) {
                _this.loading.dismiss();
                _this.notificationProvider.presentTopToast("Error a la hora de utilizar la imagen.");
            });
        }).catch(function (error) {
            _this.loading.dismiss();
            _this.notificationProvider.presentTopToast('Error de conexión con el servidor de imágenes.');
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
                    isitemTypeName: _this.isitemTypeName,
                    recycleItem: _this.recycleItem,
                    myPosition: myPosition
                });
                _this.loading.dismiss();
            }
            else {
                _this.loading.dismiss();
                _this.notificationProvider.presentTopToast('No hay ningún punto de reciclaje cercano.');
            }
        }, function (error) {
            _this.loading.dismiss();
            _this.notificationProvider.presentTopToast(_this.config.defaultTimeoutMsg);
        });
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
            if (__WEBPACK_IMPORTED_MODULE_16__models_typeRecicle__["c" /* TypeRecycle_EN */][itemTypeId]) {
                out = __WEBPACK_IMPORTED_MODULE_16__models_typeRecicle__["c" /* TypeRecycle_EN */][itemTypeId];
            }
        }
        return out;
    };
    RecyclePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recycle',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            Reciclar!\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-grid style="height: 100%">\n        <ion-row align-items-center text-center style="height: 100%">\n            <ion-col>\n                <img src="assets/imgs/quieroReciclar.png" />\n                <p>\n                    <button ion-button (click)="presentActionSheetActions()">\n                        Quiero reciclar\n                    </button>\n                </p>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_7__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_7__app_app_config__["ApplicationConfig"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__app_app_config__["ApplicationConfig"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_transfer__["a" /* Transfer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_transfer__["a" /* Transfer */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_native_location_accuracy__["a" /* LocationAccuracy */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_native_location_accuracy__["a" /* LocationAccuracy */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_12__providers_notifications__["a" /* NotificationProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__providers_notifications__["a" /* NotificationProvider */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_13__providers_google__["a" /* GoogleCloudServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_13__providers_google__["a" /* GoogleCloudServiceProvider */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_17__providers_utils__["a" /* UtilsProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_17__providers_utils__["a" /* UtilsProvider */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_14__providers_session__["a" /* SessionProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_14__providers_session__["a" /* SessionProvider */]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_18__providers_api_userProvider__["a" /* UserProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_18__providers_api_userProvider__["a" /* UserProvider */]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_crop__["a" /* Crop */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_crop__["a" /* Crop */]) === "function" && _q || Object])
    ], RecyclePage);
    return RecyclePage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
}());

//# sourceMappingURL=recycle.js.map

/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_notifications__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_config__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_session__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_typeRecicle__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__popover_map_popoverMap__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_utils__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_api_recycleItemsProvider__ = __webpack_require__(138);
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
    function MapPage(navParams, notificationProvider, alertCtrl, sessionProvider, popoverCtrl, platform, utilsProvider, loadingCtrl, recycleItemsProvider, config) {
        this.navParams = navParams;
        this.notificationProvider = notificationProvider;
        this.alertCtrl = alertCtrl;
        this.sessionProvider = sessionProvider;
        this.popoverCtrl = popoverCtrl;
        this.platform = platform;
        this.utilsProvider = utilsProvider;
        this.loadingCtrl = loadingCtrl;
        this.recycleItemsProvider = recycleItemsProvider;
        this.config = config;
        this.recycledAlready = false;
        this.isitemTypeName = false;
        this.modifiedItemName = false;
        this.recycleItem = this.navParams.get("recycleItem");
        this.myPosition = this.navParams.get("myPosition");
        this.isitemTypeName = this.navParams.get("isitemTypeName");
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
            _this.initMarkers(_this.recycleItem.storage.position, "Punto más cercano", __WEBPACK_IMPORTED_MODULE_6__models_typeRecicle__["b" /* TypeRecycle_Color_EN */][_this.recycleItem.itemType]);
        })
            .catch(function (error) {
            _this.notificationProvider.presentTopToast("Parece que ha habido algún problema");
        });
    };
    MapPage.prototype.initMarkers = function (storagePosition, title, itemTypeColor) {
        var _this = this;
        this.map.clear();
        this.createMarker(this.myPosition, "Yo", 'red').then(function (marker) {
        });
        this.createMarker(storagePosition, title, itemTypeColor).then(function (marker) {
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
        var savedStorage = this.recycleItem.storage;
        this.sessionProvider.getSession().then(function (user) {
            _this.recycleItem.storage = _this.recycleItem.storage.id;
            _this.recycleItemsProvider.saveRecycleItem(_this.recycleItem, user.accessToken).subscribe(function (res) {
                var status = res.status;
                if (status === 201) {
                    _this.recycledAlready = true;
                    _this.notificationProvider.presentAlertOk('Se ha guardadado correctamente este reciclado!');
                }
                else {
                    _this.notificationProvider.presentTopToast("Los datos insertados son incorrectos.");
                }
                _this.recycleItem.storage = savedStorage;
            }, function (error) {
                _this.recycleItem.storage = savedStorage;
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
                            _this.modifiedItemName = true;
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
        for (var type in __WEBPACK_IMPORTED_MODULE_6__models_typeRecicle__["a" /* TypeRecycle */]) {
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
                _this.recycleItem.itemType = _this.getItemType(data); // string to number
                if (_this.modifiedItemName == false && _this.isitemTypeName == true) {
                    _this.recycleItem.name = data;
                }
                _this.callGetNearestStoragePointByItemType();
            }
        });
        alert.present();
    };
    MapPage.prototype.callGetNearestStoragePointByItemType = function () {
        var _this = this;
        this.utilsProvider.getNearestStoragePointByItemType(this.myPosition, this.recycleItem.itemType).timeout(this.config.defaultTimeoutTime).subscribe(function (result) {
            if (result.status == 200) {
                _this.loading.dismiss();
                _this.initMarkers(result.storagePoint.position, "Punto más cercano", __WEBPACK_IMPORTED_MODULE_6__models_typeRecicle__["b" /* TypeRecycle_Color_EN */][_this.recycleItem.itemType]);
            }
            else {
                _this.loading.dismiss();
                _this.notificationProvider.presentTopToast('No hay ningún punto de reciclaje cercano.');
            }
        }, function (error) {
            _this.loading.dismiss();
            _this.notificationProvider.presentTopToast(_this.config.defaultTimeoutMsg);
        });
    };
    MapPage.prototype.presentPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_7__popover_map_popoverMap__["a" /* PopoverMap */], {
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
            selector: 'page-recycleMap',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle_map/recycleMap.html"*/'<ion-header>\n    <ion-navbar>\n        <div style="display: flex;justify-content: center; align-items: center;">\n            <div class="title-navbar" align="center">\n                <div class=\'main-title\'>Reciclar {{getItemType(recycleItem.itemType)}}</div>\n                <div class=\'sub-title\'>{{recycleItem.name}}</div>\n            </div>\n            <div class="iconsRight">\n                <div *ngIf="!recycledAlready; else onlymap">\n                    <ion-buttons right>\n                        <button ion-button icon-only color="royal" (tap)="recycleFinish()">\n                            <ion-icon name="checkmark"></ion-icon>\n                        </button>\n\n                        <button ion-button icon-only color="royal" (tap)="presentPopover($event)">\n                            <ion-icon name="more"></ion-icon>\n                        </button>\n                    </ion-buttons>\n                </div>\n\n                <ng-template #onlymap>\n                    <ion-buttons right>\n                        <button ion-button icon-only (click)="viewOnExtenalMap()">\n                            <ion-icon name="md-map"></ion-icon>\n                        </button>\n                    </ion-buttons>\n                </ng-template>\n            </div>\n        </div>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div #map id="map_canvas">\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle_map/recycleMap.html"*/
        }),
        __param(9, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_4__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_notifications__["a" /* NotificationProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_8__providers_utils__["a" /* UtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_9__providers_api_recycleItemsProvider__["a" /* RecycleItemsProvider */], Object])
    ], MapPage);
    return MapPage;
}());

//# sourceMappingURL=recycleMap.js.map

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverMap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
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

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleCloudServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_config__ = __webpack_require__(33);
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
        this.requestJsonOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json'
            })
        });
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
    GoogleCloudServiceProvider.prototype.getLabelAnnotations = function (labelResponseList) {
        return this.http.post(this.config.apiEndpoint + '/itemTypeName/labelAnnotations', JSON.stringify(labelResponseList), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime);
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

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_session__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(139);
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

/***/ 324:
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

/***/ 33:
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

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(319);
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

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return recycleItemInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_session__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_api_recycleItemsProvider__ = __webpack_require__(138);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var recycleItemInfoPage = (function () {
    function recycleItemInfoPage(navParams, sessionProvider, utilsProvider, recycleItemsProvider) {
        this.navParams = navParams;
        this.sessionProvider = sessionProvider;
        this.utilsProvider = utilsProvider;
        this.recycleItemsProvider = recycleItemsProvider;
        this.showLoadingMsg = true;
        this.errorLoadingContent = false;
        this.recycleItemId = this.navParams.get("recycleItemId");
    }
    recycleItemInfoPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var status;
        this.sessionProvider.getSession().then(function (user) {
            _this.recycleItemsProvider.getRecycleItemById(_this.recycleItemId, user.accessToken).subscribe(function (res) {
                status = res.status;
                if (status === 200) {
                    _this.recycleItem = res.json();
                }
                _this.showLoadingMsg = false;
            }, function (error) {
                _this.showLoadingMsg = false;
                _this.errorLoadingContent = true;
            });
        }, function (err) {
            _this.showLoadingMsg = false;
            _this.errorLoadingContent = true;
        });
    };
    recycleItemInfoPage.prototype.getItemType = function (itemTypeId) {
        return this.utilsProvider.getItemType(itemTypeId);
    };
    recycleItemInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recycleItemInfo',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile_recycledItems/profile_recycledItems_info/recycleItemInfo.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Detalles del reciclaje</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div *ngIf="recycleItem != null;else recycleItemsNotFound">\n        <ion-grid style="height: 97%;">\n            <ion-row style="height: 100%;">\n                <ion-col style="height: 100%;">\n                    <ion-card *ngIf="recycleItem" style="height: 100%;">\n                        <ion-card-header>{{ recycleItem.name }}</ion-card-header>\n                        <img [src]="recycleItem.image" onError="this.src = \'assets/imgs/quieroReciclar.png\'" style="max-height: 75%;" />\n                        <ion-card-content>\n                            <p>Tipo: {{ getItemType(recycleItem.itemType.id) }}</p>\n                            <p>Reciclado el: {{ recycleItem.createdDate | date: \'dd/MM/yyyy H:mm\'}}</p>\n                        </ion-card-content>\n                    </ion-card>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n    </div>\n</ion-content>\n\n<ng-template #recycleItemsNotFound>\n    <ion-row align-items-center text-center style="height: 100%">\n        <ion-col>\n            <div *ngIf="showLoadingMsg == true; else showLoadingResult">\n                <h5>Cargando...</h5>\n            </div>\n            <ng-template #showLoadingResult>\n                <div *ngIf="errorLoadingContent == true; else showNoRecycledItemFound">\n                    <div>\n                        <p>Ha habido algún problema</p>\n                        <h5 style="font-weight: bold">Intentalo de nuevo en unos minutos</h5>\n                    </div>\n                </div>\n                <ng-template #showNoRecycledItemFound>\n                    <div>\n                        <p>Todavía no has reciclado nada</p>\n                        <h5 style="font-weight: bold">¡A qué esperas!</h5>\n                    </div>\n                </ng-template>\n            </ng-template>\n        </ion-col>\n    </ion-row>\n</ng-template>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile_recycledItems/profile_recycledItems_info/recycleItemInfo.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__providers_session__["a" /* SessionProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_session__["a" /* SessionProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__providers_utils__["a" /* UtilsProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_utils__["a" /* UtilsProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__providers_api_recycleItemsProvider__["a" /* RecycleItemsProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_api_recycleItemsProvider__["a" /* RecycleItemsProvider */]) === "function" && _d || Object])
    ], recycleItemInfoPage);
    return recycleItemInfoPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=recycleItemInfo.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(372);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(699);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_index__ = __webpack_require__(700);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_http__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_crop__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_config__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_file__ = __webpack_require__(702);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_transfer__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_file_path__ = __webpack_require__(703);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_camera__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_location_accuracy__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_google_maps__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers__ = __webpack_require__(704);
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
                __WEBPACK_IMPORTED_MODULE_9__angular_http__["c" /* HttpModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_index__["a" /* APP_PAGES */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_19__providers__["a" /* APP_PROVIDERS */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__["a" /* Facebook */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                { provide: __WEBPACK_IMPORTED_MODULE_11__app_config__["b" /* APP_CONFIG_TOKEN */], useValue: __WEBPACK_IMPORTED_MODULE_11__app_config__["a" /* APP_CONFIG */] },
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_transfer__["a" /* Transfer */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_file_path__["a" /* FilePath */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_google_maps__["a" /* GoogleMaps */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_crop__["a" /* Crop */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 677:
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

/***/ 681:
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

/***/ 699:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_status_bar__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_session__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(139);
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

/***/ 700:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_PAGES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__recycle_recycle__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__profile_profile__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__profile_profile_recycledItems_myRecycledItems__ = __webpack_require__(701);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__recycle_recycle_map_recycleMap__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__recycle_recycle_map_popover_map_popoverMap__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__profile_profile_recycledItems_profile_recycledItems_info_recycleItemInfo__ = __webpack_require__(366);









var APP_PAGES = [
    __WEBPACK_IMPORTED_MODULE_0__recycle_recycle__["a" /* RecyclePage */],
    __WEBPACK_IMPORTED_MODULE_1__profile_profile__["a" /* ProfilePage */],
    __WEBPACK_IMPORTED_MODULE_8__profile_profile_recycledItems_profile_recycledItems_info_recycleItemInfo__["a" /* recycleItemInfoPage */],
    __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */],
    __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */],
    __WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */],
    __WEBPACK_IMPORTED_MODULE_5__profile_profile_recycledItems_myRecycledItems__["a" /* myRecycledItemsPage */],
    __WEBPACK_IMPORTED_MODULE_6__recycle_recycle_map_recycleMap__["a" /* MapPage */],
    __WEBPACK_IMPORTED_MODULE_7__recycle_recycle_map_popover_map_popoverMap__["a" /* PopoverMap */]
];
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 701:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return myRecycledItemsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_typeRecicle__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_session__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__profile_recycledItems_info_recycleItemInfo__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_api_userProvider__ = __webpack_require__(87);
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
    function myRecycledItemsPage(config, navCtrl, sessionProvider, userProvider) {
        var _this = this;
        this.config = config;
        this.navCtrl = navCtrl;
        this.sessionProvider = sessionProvider;
        this.userProvider = userProvider;
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
            _this.userProvider.getUserRecycleItems(_this.user.id, _this.user.accessToken, _this.page, _this.perPage).subscribe(function (res) {
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__profile_recycledItems_info_recycleItemInfo__["a" /* recycleItemInfoPage */], {
            recycleItemId: id
        });
    };
    myRecycledItemsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-myRecycledItems',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile_recycledItems/myRecycledItems.html"*/'<ion-grid style="height: 100%">\n\n    <div *ngIf="recycleItems?.length > 0;else recycleItemsNotFound">\n        <ion-row justify-content-center align-items-center style="height: 100%">\n            <ion-col>\n                <div *ngFor="let recycleItem of recycleItems">\n                    <ion-card (click)="showRecycleItemInfo(recycleItem.id)">\n                        <ion-item class="recycleItemIonItem">\n                            <ion-avatar item-start>\n                                <img src="{{recycleItem.image}}" onError="this.src = \'assets/imgs/quieroReciclar.png\'">\n                            </ion-avatar>\n                            {{recycleItem.name}}\n                            <p>{{ getItemType(recycleItem.itemType.id) }} - {{ recycleItem.createdDate | date: \'dd/MM/yyyy H:mm\'}}\n                            </p>\n                        </ion-item>\n                    </ion-card>\n                </div>\n                <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="page < totalPages">\n                    <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Cargando más datos..."></ion-infinite-scroll-content>\n                </ion-infinite-scroll>\n            </ion-col>\n        </ion-row>\n    </div>\n\n</ion-grid>\n\n<ng-template #recycleItemsNotFound>\n    <ion-row align-items-center text-center style="height: 100%">\n        <ion-col>\n            <div *ngIf="showLoadingMsg == true; else showLoadingResult">\n                <h5>Cargando...</h5>\n            </div>\n            <ng-template #showLoadingResult>\n                <div *ngIf="errorLoadingContent == true; else showNoRecycledItemsFound">\n                    <div>\n                        <p>Ha habido algún problema</p>\n                        <h5 style="font-weight: bold">Intentalo de nuevo en unos minutos</h5>\n                    </div>\n                </div>\n                <ng-template #showNoRecycledItemsFound>\n                    <div>\n                        <p>Todavía no has reciclado nada</p>\n                        <h5 style="font-weight: bold">¡A qué esperas!</h5>\n                    </div>\n                </ng-template>\n            </ng-template>\n        </ion-col>\n    </ion-row>\n</ng-template>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile_recycledItems/myRecycledItems.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_api_userProvider__["a" /* UserProvider */]])
    ], myRecycledItemsPage);
    return myRecycledItemsPage;
}());

//# sourceMappingURL=myRecycledItems.js.map

/***/ }),

/***/ 704:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_PROVIDERS; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__session__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notifications__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__google__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_userProvider__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_recycleItemsProvider__ = __webpack_require__(138);






var APP_PROVIDERS = [
    __WEBPACK_IMPORTED_MODULE_0__session__["a" /* SessionProvider */],
    __WEBPACK_IMPORTED_MODULE_1__notifications__["a" /* NotificationProvider */],
    __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* UtilsProvider */],
    __WEBPACK_IMPORTED_MODULE_3__google__["a" /* GoogleCloudServiceProvider */],
    __WEBPACK_IMPORTED_MODULE_4__api_userProvider__["a" /* UserProvider */],
    __WEBPACK_IMPORTED_MODULE_5__api_recycleItemsProvider__["a" /* RecycleItemsProvider */]
];
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
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

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TypeRecycle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return TypeRecycle_EN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TypeRecycle_Color_EN; });
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
var TypeRecycle_Color_EN;
(function (TypeRecycle_Color_EN) {
    TypeRecycle_Color_EN[TypeRecycle_Color_EN["purple"] = 1] = "purple";
    TypeRecycle_Color_EN[TypeRecycle_Color_EN["yellow"] = 2] = "yellow";
    TypeRecycle_Color_EN[TypeRecycle_Color_EN["green"] = 3] = "green";
    TypeRecycle_Color_EN[TypeRecycle_Color_EN["blue"] = 4] = "blue";
    TypeRecycle_Color_EN[TypeRecycle_Color_EN["lightblue"] = 5] = "lightblue";
})(TypeRecycle_Color_EN || (TypeRecycle_Color_EN = {}));
//# sourceMappingURL=typeRecicle.js.map

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_config__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_typeRecicle__ = __webpack_require__(85);
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

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__session__ = __webpack_require__(34);
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




var UserProvider = (function () {
    function UserProvider(http, sessionProvider, config) {
        this.http = http;
        this.sessionProvider = sessionProvider;
        this.config = config;
        this.requestJsonOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json'
            })
        });
    }
    UserProvider.prototype.saveUser = function (user, token) {
        user.recycleItems = null;
        this.sessionProvider.updateSession(user);
        return this.http.put(this.config.apiEndpoint + "/users/private/" + user.id + "?token=" + token, JSON.stringify(user), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime);
    };
    UserProvider.prototype.createUser = function (user) {
        return this.http.post(this.config.apiEndpoint + "/users", JSON.stringify(user), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime);
    };
    UserProvider.prototype.findUserByEmail = function (email) {
        return this.http.get(this.config.apiEndpoint + "/users/email/" + email);
    };
    UserProvider.prototype.getUserRecycleItems = function (id, accessToken, page, perPage) {
        return this.http.get(this.config.apiEndpoint + "/users/private/" + id + "/recycleItems?page=" + page + "&perPage=" + perPage + "&token=" + accessToken).timeout(this.config.defaultTimeoutTime);
    };
    UserProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__session__["a" /* SessionProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__session__["a" /* SessionProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__app_app_config__["ApplicationConfig"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__app_app_config__["ApplicationConfig"]) === "function" && _c || Object])
    ], UserProvider);
    return UserProvider;
    var _a, _b, _c;
}());

//# sourceMappingURL=userProvider.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recycle_recycle__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_profile__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(324);
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

},[367]);
//# sourceMappingURL=main.js.map