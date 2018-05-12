webpackJsonp([1],{

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ApplicationConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return APP_CONFIG_TOKEN; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

var ApplicationConfig = (function () {
    function ApplicationConfig() {
    }
    return ApplicationConfig;
}());

// Configuration values for our app
var APP_CONFIG = new ApplicationConfig();
// https://reciclaweb-server.herokuapp.com || http://127.0.0.1:8080
APP_CONFIG.appName = 'ReciclaWeb App';
APP_CONFIG.apiEndpoint = 'https://reciclaweb-server.herokuapp.com';
APP_CONFIG.uploadFilesUrl = 'https://reciclaweb.000webhostapp.com';
APP_CONFIG.DEBUG_MODE = true;
APP_CONFIG.defaultTimeoutTime = 10000;
APP_CONFIG.defaultTimeoutMsg = 'Parece que ha habido algún problema, prueba en unos minutos.';
APP_CONFIG.googleCloudVisionAPIKey = 'AIzaSyCVl9Ien_9KOFEN197dPqklyIJ7ad1z44k';
APP_CONFIG.itemsPerPage = 10;
APP_CONFIG.debugUserEmail = 'debug@debug.com';
APP_CONFIG.debugUserPassword = 'debug';
APP_CONFIG.instagramAPIKey = '7bec1422cf9f4eaf952b4c1f3dbfa4ab';
APP_CONFIG.emailFrom = 'recicla.ua.noreply@gmail.com';
APP_CONFIG.emailFromName = 'ReciclaUA (no contestar)';
APP_CONFIG.emailFromPassword = 'w2L-gDk-cSq-nuK';
var APP_CONFIG_TOKEN = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* InjectionToken */]('config');
//# sourceMappingURL=app-config.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_storagesProvider__ = __webpack_require__(325);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UtilsProvider = (function () {
    function UtilsProvider(storagesProvider) {
        this.storagesProvider = storagesProvider;
        this.rad = function (x) {
            return x * Math.PI / 180;
        };
    }
    UtilsProvider.prototype.calculateDistance = function (position1, position2) {
        var R = 6371e3; // metres
        var φ1 = this.rad(position1.latitude);
        var φ2 = this.rad(position2.latitude);
        var Δφ = this.rad(position2.latitude - position1.latitude);
        var Δλ = this.rad(position2.longitude - position1.longitude);
        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };
    UtilsProvider.prototype.getNearestStoragePointByItemType = function (currentPosition, itemTypeId) {
        var _this = this;
        var status;
        var storagePointList;
        var storagePoint;
        return new Promise(function (resolve, reject) {
            _this.storagesProvider.getStoragePointsByItemType(itemTypeId).subscribe(function (res) {
                status = res.status;
                storagePointList = res.json();
                storagePoint = storagePointList[0];
                for (var _i = 0, storagePointList_1 = storagePointList; _i < storagePointList_1.length; _i++) {
                    var currentSPoint = storagePointList_1[_i];
                    if (_this.calculateDistance(currentPosition, currentSPoint.position) < _this.calculateDistance(currentPosition, storagePoint.position)) {
                        storagePoint = currentSPoint;
                    }
                }
                resolve(storagePoint);
            }, function (error) {
                reject(error);
            });
        });
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
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].of(zoomLevel);
    };
    UtilsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__api_storagesProvider__["a" /* StoragesProvider */]])
    ], UtilsProvider);
    return UtilsProvider;
}());

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemTypeProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_labelResponseWithImage__ = __webpack_require__(700);
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




var ItemTypeProvider = (function () {
    function ItemTypeProvider(http, config) {
        this.http = http;
        this.config = config;
        this.requestJsonOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json'
            })
        });
    }
    ItemTypeProvider.prototype.getRecycleItemItemTypeBylabelAnnotations = function (labelResponseList, base64Image) {
        var labelResponseWithImage = new __WEBPACK_IMPORTED_MODULE_3__models_labelResponseWithImage__["a" /* LabelResponseWithImage */](labelResponseList, base64Image);
        return this.http.post(this.config.apiEndpoint + '/itemTypeNames/labelAnnotations', JSON.stringify(labelResponseWithImage), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime);
    };
    ItemTypeProvider.prototype.findItemTypeById = function (id) {
        return this.http.get(this.config.apiEndpoint + "/itemTypes/" + id).timeout(this.config.defaultTimeoutTime);
    };
    ItemTypeProvider.prototype.getAllItemTypes = function () {
        return this.http.get(this.config.apiEndpoint + "/itemTypes").timeout(this.config.defaultTimeoutTime);
    };
    ItemTypeProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_2__app_app_config__["c" /* ApplicationConfig */]])
    ], ItemTypeProvider);
    return ItemTypeProvider;
}());

//# sourceMappingURL=itemTypeProvider.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_session__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_notifications__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_app_app__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_user__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_config__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_api_userProvider__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__normalLogin_normalLogin__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_encryptProvider__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_instagramProvider__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__models_typeUser__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_fileProvider__ = __webpack_require__(91);
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
    function LoginPage(config, sessionProvider, app, fb, loadingCtrl, notificationProvider, userProvider, navCtrl, encryptProvider, instagramProvider, fileProvider) {
        this.config = config;
        this.sessionProvider = sessionProvider;
        this.app = app;
        this.fb = fb;
        this.loadingCtrl = loadingCtrl;
        this.notificationProvider = notificationProvider;
        this.userProvider = userProvider;
        this.navCtrl = navCtrl;
        this.encryptProvider = encryptProvider;
        this.instagramProvider = instagramProvider;
        this.fileProvider = fileProvider;
    }
    LoginPage.prototype.doNormalLogin = function (defaultPage) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__normalLogin_normalLogin__["a" /* NormalLoginPage */], {
            defaultPage: defaultPage
        });
    };
    LoginPage.prototype.doFbLogin = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Iniciando sesión...'
        });
        this.loading.present();
        this.loginFb().then().then(function (user) {
            _this.loading.dismiss();
            _this.sessionProvider.updateSession(user);
            _this.app.getRootNavs()[0].setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
        }, function (error) {
            _this.loading.dismiss();
            _this.notificationProvider.presentTopToast(_this.config.defaultTimeoutMsg);
        });
    };
    LoginPage.prototype.loginFb = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.fb.login(['public_profile', 'email']).then(function (fbUser) {
                return _this.fb.api('me?fields=id,email,name,picture.width(720).height(720).as(picture_large)', []).then(function (profile) {
                    var user = new __WEBPACK_IMPORTED_MODULE_5__models_user__["a" /* User */]();
                    //user.email = profile['email']
                    user.username = profile['id'];
                    user.fullName = profile['name'];
                    user.profilePicture = profile['picture_large']['data']['url'];
                    user.accessToken = fbUser.authResponse.accessToken;
                    user.type = __WEBPACK_IMPORTED_MODULE_13__models_typeUser__["a" /* TypeUser */].Facebook;
                    return _this.findOrCreateUser(user).then(function (res) {
                        user = res;
                        resolve(user);
                    }, function (error) {
                        reject(error);
                    });
                }, function (error) {
                    reject(error);
                });
            }).catch(function (error) {
                reject(error);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    LoginPage.prototype.doInstagramLogin = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Iniciando sesión...'
        });
        this.loading.present();
        this.instagramProvider.login().then(function (tokenRes) {
            _this.instagramProvider.getInstagramUserInfo(tokenRes.access_token).subscribe(function (res) {
                var instagramUser = res.json();
                var user = new __WEBPACK_IMPORTED_MODULE_5__models_user__["a" /* User */]();
                //user.email = instagramUser.data.username
                user.username = instagramUser.data.id;
                user.fullName = instagramUser.data.full_name;
                user.profilePicture = instagramUser.data.profile_picture;
                user.accessToken = tokenRes.access_token;
                user.type = __WEBPACK_IMPORTED_MODULE_13__models_typeUser__["a" /* TypeUser */].Instagram;
                _this.findOrCreateUser(user).then(function (res) {
                    _this.sessionProvider.updateSession(res);
                    _this.app.getRootNavs()[0].setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
                }, function (error) {
                    _this.loading.dismiss();
                    _this.notificationProvider.presentTopToast("Error iniciando sesión.");
                });
            }, function (error) {
                _this.loading.dismiss();
                _this.notificationProvider.presentTopToast("Error obteniendo el usuario de Instagram.");
            });
        }).catch(function (error) {
            _this.loading.dismiss();
            _this.notificationProvider.presentTopToast(_this.config.defaultTimeoutMsg);
        });
    };
    LoginPage.prototype.loginInDebugMode = function () {
        var _this = this;
        var password = this.encryptProvider.encryptPassword(this.config.debugUserPassword);
        var user = new __WEBPACK_IMPORTED_MODULE_5__models_user__["a" /* User */]();
        user.email = this.config.debugUserEmail;
        user.password = password;
        user.username = this.config.debugUserEmail;
        user.fullName = 'Debug user';
        user.accessToken = 'DEBUG_MODE';
        user.profilePicture = 'https://reciclaweb.000webhostapp.com/uploads/avatars/Debug.jpg';
        user.type = __WEBPACK_IMPORTED_MODULE_13__models_typeUser__["a" /* TypeUser */].Normal;
        return new Promise(function (resolve, reject) {
            _this.findOrCreateUser(user).then(function (res) {
                if (res.value != null) {
                    user = res.value;
                }
                else {
                    user = res;
                }
                resolve(user);
            }, function (error) {
                reject(user);
            });
        });
    };
    LoginPage.prototype.doDebugModeLogin = function () {
        var _this = this;
        if (this.config.DEBUG_MODE) {
            this.loading = this.loadingCtrl.create({
                content: 'Iniciando sesión...'
            });
            this.loading.present();
            this.loginInDebugMode().then(function (user) {
                _this.loading.dismiss();
                if (user != null) {
                    _this.sessionProvider.updateSession(user);
                    _this.app.getRootNavs()[0].setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
                }
            }, function (rejectUser) {
                _this.userProvider.login(rejectUser).subscribe(function (res) {
                    _this.loading.dismiss();
                    _this.sessionProvider.updateSession(res.json());
                    _this.app.getRootNavs()[0].setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
                }, function (error) {
                    _this.loading.dismiss();
                    _this.notificationProvider.presentTopToast(_this.config.defaultTimeoutMsg);
                });
            });
        }
    };
    LoginPage.prototype.findOrCreateUser = function (loginUser) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.findLoginUserByUsername(loginUser.username, loginUser.accessToken, loginUser.type).then(function (res) {
                resolve(res);
            }, function (err) {
                if (err.status === 404) {
                    return _this.createUserBySocialUser(loginUser).then(function (res) {
                        resolve(res);
                    }, function (error) {
                        reject(error);
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    };
    LoginPage.prototype.findLoginUserByUsername = function (username, accessToken, userType) {
        var _this = this;
        var user;
        return new Promise(function (resolve, reject) {
            _this.userProvider.findUserByUsername(username, accessToken, userType).subscribe(function (res) {
                user = res.json();
                resolve(user);
            }, function (error) {
                reject(error);
            });
        });
    };
    LoginPage.prototype.createUserBySocialUser = function (user) {
        var _this = this;
        var user;
        return new Promise(function (resolve, reject) {
            var date = new Date();
            var filename = user.id + "_" + date.getTime() + ".png";
            var url = _this.config.uploadFilesUrl;
            var urlUpload = url + "/upload-avatar.php";
            var completeUrl = url + _this.fileProvider.avatarsFolder + filename;
            _this.fileProvider.convertToDataURLviaCanvas(user.profilePicture, "image/png").then(function (res) {
                _this.fileProvider.uploadFile(res, filename, urlUpload).then(function (res) {
                    user.profilePicture = completeUrl;
                    _this.userProvider.createUser(user).subscribe(function (res) {
                        resolve(res.json());
                    }, function (error) {
                        reject(error);
                    });
                }, function (error) {
                    _this.loading.dismiss();
                    _this.notificationProvider.presentAlertError('Error de conexión con el servidor de imágenes.');
                    reject(error);
                });
            });
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/login/login.html"*/'<ion-content>\n    <ion-grid style="height: 100%">\n        <ion-row align-items-center text-center style="height: 100%">\n            <ion-col>\n                <h2>{{ config.appName }}</h2>\n                <p>\n                    Proyecto reciclaje TFG en la universidad de Alicante.\n                </p>\n                <ion-col class="login-button">\n                    <p style="margin:0">\n                        <button class="loginBtn loginBtn-facebook" (tap)="doFbLogin()">Iniciar sesión con Facebook</button>\n                    </p>\n                    <p style="margin:0">\n                        <button class="loginBtn loginBtn-instagram" (tap)="doInstagramLogin()">Iniciar sesión con Instagram</button>\n                    </p>\n                    <button ion-button clear (tap)="doNormalLogin(\'login\')">Iniciar sesión</button>\n                    <button ion-button clear (tap)="doNormalLogin(\'register\')">Registrarse</button>\n                    <br>\n                </ion-col>\n            </ion-col>\n        </ion-row>\n        <div *ngIf="config.DEBUG_MODE == true">\n            <button ion-button block [outline]="isOutline" [round]="isRound" color="light" (tap)="doDebugModeLogin()">Debug Login</button>\n        </div>\n    </ion-grid>\n\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/login/login.html"*/,
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_7__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__app_app_config__["c" /* ApplicationConfig */],
            __WEBPACK_IMPORTED_MODULE_1__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_app_app__["a" /* App */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_notifications__["a" /* NotificationProvider */],
            __WEBPACK_IMPORTED_MODULE_9__providers_api_userProvider__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_11__providers_encryptProvider__["a" /* EncryptProvider */],
            __WEBPACK_IMPORTED_MODULE_12__providers_instagramProvider__["a" /* InstagramProvider */],
            __WEBPACK_IMPORTED_MODULE_14__providers_fileProvider__["a" /* FileProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 180:
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
webpackEmptyAsyncContext.id = 180;

/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/tabs/tabs.module": [
		743,
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
webpackAsyncContext.id = 225;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecyclePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_location_accuracy__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_config__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_position__ = __webpack_require__(696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__recycle_map_recycleMap__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_notifications__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_google__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_session__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__models_labelResponse__ = __webpack_require__(701);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__models_recycleItem__ = __webpack_require__(702);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_utils__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_api_userProvider__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_api_itemTypeProvider__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_api_tipProvider__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_fileProvider__ = __webpack_require__(91);
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
    function RecyclePage(config, navCtrl, camera, actionSheetCtrl, loadingCtrl, geolocation, locationAccuracy, alertCtrl, notificationProvider, googleCloudServiceProvider, utilsProvider, sessionProvider, userProvider, itemTypeProvider, tipProvider, fileProvider) {
        var _this = this;
        this.config = config;
        this.navCtrl = navCtrl;
        this.camera = camera;
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
        this.itemTypeProvider = itemTypeProvider;
        this.tipProvider = tipProvider;
        this.fileProvider = fileProvider;
        this.lastImage = null;
        this.errorMsg = "";
        this.temporalName = "";
        this.isitemTypeName = false;
        this.showLoadingMsg = true;
        this.itemTypeList = [];
        this.getAllItems().then(function (res) {
            _this.showLoadingMsg = false;
        });
        this.getRandomTip();
    }
    RecyclePage.prototype.getAllItems = function () {
        var _this = this;
        var status;
        return new Promise(function (resolve) {
            _this.itemTypeProvider.getAllItemTypes().subscribe(function (res) {
                status = res.status;
                if (status === 200) {
                    _this.itemTypeList = res.json();
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }, function (error) {
                if (error.status == 404) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    RecyclePage.prototype.getRandomTip = function () {
        var _this = this;
        var status;
        return new Promise(function (resolve) {
            _this.tipProvider.getRandomTip().subscribe(function (res) {
                status = res.status;
                if (status === 200) {
                    _this.tip = res.json();
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }, function (error) {
                if (error.status == 404) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    RecyclePage.prototype.loadPositionSlide = function (itemType) {
        this.recycleItem = new __WEBPACK_IMPORTED_MODULE_14__models_recycleItem__["a" /* RecycleItem */]();
        this.recycleItem.itemType = itemType;
        this.recycleItem.name = itemType.typeEs;
        this.recycleItem.recycleUser = this.user.id;
        this.isitemTypeName = true;
        this.getUserPositionButton(); //directly without new button step
    };
    RecyclePage.prototype.getUserPositionButton = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Obteniendo la ubicación del usuario...',
            enableBackdropDismiss: true
        });
        this.loading.present();
        this.getUserPosition();
    };
    RecyclePage.prototype.getUserPosition = function () {
        var _this = this;
        var myPosition;
        var GPSoptions = { timeout: this.config.defaultTimeoutTime, enableHighAccuracy: true, maximumAge: 100 };
        this.geolocation.getCurrentPosition(GPSoptions).then(function (position) {
            myPosition = new __WEBPACK_IMPORTED_MODULE_8__models_position__["a" /* Position */](-1, position.coords.latitude, position.coords.longitude);
            if (_this.user.lastPosition != null) {
                myPosition.id = _this.user.lastPosition.id;
            }
            _this.user.lastPosition = myPosition;
            _this.userProvider.saveUser(_this.user, _this.user.accessToken).subscribe(function (res) {
                _this.goToMapPage(myPosition);
            }, function (error) {
                console.log(error);
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
                    _this.notificationProvider.presentTopToast("Error, comprueba que la localización esté activada");
                }
            }
            else {
                _this.notificationProvider.presentTopToast("Error obteniendo la ubicación");
            }
        });
    };
    RecyclePage.prototype.presentActionSheetActions = function () {
        var _this = this;
        this.sessionProvider.getSession().then(function (res) {
            _this.user = res;
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
    RecyclePage.prototype.takePicture = function (sourceType) {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Cargando...',
            enableBackdropDismiss: true
        });
        this.loading.present();
        this.fileProvider.takePicture(sourceType).then(function (res) {
            _this.processImage(res['base64Image'], res['imagePath']);
        }, function (error) {
            _this.loading.dismiss();
            if (error != 'No Image Selected' && error.message != "User cancelled") {
                _this.notificationProvider.presentTopToast('Error en la selección de la imagen.');
            }
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
        var actionSheet = this.actionSheetCtrl.create({
            title: '¿Qué deseas reciclar?'
        });
        var _loop_1 = function (i) {
            actionSheet.addButton({
                text: this_1.itemTypeList[i].typeEs,
                handler: function () {
                    _this.loadPositionSlide(_this.itemTypeList[i]);
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.itemTypeList.length; i++) {
            _loop_1(i);
        }
        actionSheet.addButton({
            text: 'Cancelar',
            role: 'cancel'
        });
        actionSheet.present();
    };
    RecyclePage.prototype.processImage = function (base64Image, imagePath) {
        var _this = this;
        this.loading.setContent('Subiendo la imagen...');
        var date = new Date();
        var filename = this.user.id + "_" + date.getTime() + ".png";
        var url = this.config.uploadFilesUrl;
        var urlUpload = url + "/upload.php";
        var urlUploadedFile = url + this.fileProvider.recycleItemImagesFolder + filename;
        this.recycleItem = new __WEBPACK_IMPORTED_MODULE_14__models_recycleItem__["a" /* RecycleItem */]();
        this.recycleItem.id = null;
        this.recycleItem.image = urlUploadedFile;
        this.recycleItem.recycleUser = this.user.id;
        this.recycleItem.createdDate = new Date();
        this.fileProvider.uploadFile(imagePath, filename, urlUpload).then(function (res) {
            if (res == true) {
                _this.loading.setContent('Obteniendo el tipo de objeto...');
                _this.getItemInfo(base64Image);
            }
            else {
                _this.loading.dismiss();
                _this.notificationProvider.presentAlertError('La imagen no ha sido cargada correctamente.');
            }
        }, function (error) {
            _this.loading.dismiss();
            _this.notificationProvider.presentAlertError('Tiempo excedido, por favor, prueba de nuevo.');
        });
    };
    RecyclePage.prototype.getItemInfo = function (base64Image) {
        var _this = this;
        this.googleCloudServiceProvider.getLabels(base64Image).timeout(this.config.defaultTimeoutTime).subscribe(function (result) {
            var labelResponseList = [];
            labelResponseList = result.json().responses[0].labelAnnotations;
            if (labelResponseList == null || labelResponseList.length == 0) {
                labelResponseList = [];
                var myLabelResponse = new __WEBPACK_IMPORTED_MODULE_13__models_labelResponse__["a" /* LabelResponse */]("empty", 1);
                labelResponseList.push(myLabelResponse);
            }
            _this.temporalName = labelResponseList[0].description;
            _this.getTypeFromDB(labelResponseList, base64Image).subscribe(function (res) {
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
        }, function (err) {
            _this.loading.dismiss();
            _this.notificationProvider.presentTopToast("Error a la hora de utilizar la imagen.");
        });
    };
    RecyclePage.prototype.getTypeFromDB = function (labelResponseList, base64Image) {
        var _this = this;
        return this.itemTypeProvider.getRecycleItemItemTypeBylabelAnnotations(labelResponseList, base64Image).map(function (res) {
            _this.temporalName = res.json().description;
            _this.recycleItem.itemType = res.json().itemType;
            return true;
        }).catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].fromPromise(_this.showRadioModifyItemType()).flatMap(function (res) {
                return __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].of(res);
            });
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
                            _this.recycleItem.itemType = _this.itemTypeList[data];
                            resolve(true);
                        }
                    }
                ]
            });
            for (var i = 0; i < _this.itemTypeList.length; i++) {
                alert.addInput({
                    type: 'radio',
                    value: i.toString(),
                    label: _this.itemTypeList[i].typeEs,
                });
            }
            alert.present();
        });
    };
    RecyclePage.prototype.goToMapPage = function (myPosition) {
        var _this = this;
        this.utilsProvider.getNearestStoragePointByItemType(myPosition, this.recycleItem.itemType.id).then(function (result) {
            _this.recycleItem.storage = result;
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__recycle_map_recycleMap__["a" /* MapPage */], {
                isitemTypeName: _this.isitemTypeName,
                recycleItem: _this.recycleItem,
                myPosition: myPosition,
                itemTypeList: _this.itemTypeList
            });
            _this.loading.dismiss();
        }, function (error) {
            _this.loading.dismiss();
            if (error.status == 404) {
                _this.notificationProvider.presentTopToast('No hay ningún punto de reciclaje cercano.');
            }
            else {
                _this.notificationProvider.presentTopToast(_this.config.defaultTimeoutMsg);
            }
        });
    };
    RecyclePage.prototype.doRefresh = function (refresher) {
        this.getRandomTip();
        this.getAllItems().then(function (res) {
            refresher.complete();
        });
    };
    RecyclePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recycle',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            Reciclar!\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n    <div *ngIf="itemTypeList?.length > 0;else itemTypeListEmpty" style="height: 100%">\n        <ion-col>\n            <div style="height: 350px;">\n                <ion-card style="height: auto;" *ngIf="tip != null;else tipNotFound">\n                    <ion-card-header text-left style="border-bottom: 1px solid #e9e9e9;">\n                        {{tip.name}}\n                    </ion-card-header>\n                    <ion-card-content class="tip-box">\n                        <span class="tip-box-content" [innerHtml]="tip.description"></span>\n                    </ion-card-content>\n                </ion-card>\n            </div>\n            <p text-center>\n                <button ion-button (tap)="presentActionSheetActions()">\n                    Quiero reciclar\n                </button>\n            </p>\n        </ion-col>\n    </div>\n</ion-content>\n\n<ng-template #itemTypeListEmpty>\n    <ion-row align-items-center text-center style="height: 100%">\n        <ion-col>\n            <div *ngIf="showLoadingMsg == true; else showLoadingResult">\n                <h5>Cargando...</h5>\n            </div>\n        </ion-col>\n    </ion-row>\n</ng-template>\n\n<ng-template #showLoadingResult>\n    <div>\n        <p>Ha habido algún problema</p>\n        <h5 style="font-weight: bold">Intentalo de nuevo en unos minutos</h5>\n    </div>\n</ng-template>\n\n<ng-template #tipNotFound>\n    <img src="assets/imgs/quieroReciclar.png" />\n</ng-template>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_5__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__app_app_config__["c" /* ApplicationConfig */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_10__providers_notifications__["a" /* NotificationProvider */],
            __WEBPACK_IMPORTED_MODULE_11__providers_google__["a" /* GoogleCloudServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_15__providers_utils__["a" /* UtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_12__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_16__providers_api_userProvider__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_17__providers_api_itemTypeProvider__["a" /* ItemTypeProvider */],
            __WEBPACK_IMPORTED_MODULE_18__providers_api_tipProvider__["a" /* TipProvider */],
            __WEBPACK_IMPORTED_MODULE_19__providers_fileProvider__["a" /* FileProvider */]])
    ], RecyclePage);
    return RecyclePage;
}());

//# sourceMappingURL=recycle.js.map

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(323);
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

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
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
    NotificationProvider.prototype.presentBottomToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 5000,
            position: 'bottom'
        });
        toast.present();
    };
    NotificationProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], NotificationProvider);
    return NotificationProvider;
}());

//# sourceMappingURL=notifications.js.map

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__session__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
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
    UserProvider.prototype.saveUser = function (user, token, prev_password) {
        var _this = this;
        if (prev_password === void 0) { prev_password = ""; }
        user.recycleItems = null;
        user.questionsDone = null;
        this.requestJsonOptions.headers.set('X-Auth-Token', token);
        var parameters = "";
        if (prev_password != "") {
            parameters = "?prev_password=" + prev_password;
        }
        return this.http.put(this.config.apiEndpoint + "/private/users/" + user.id + parameters, JSON.stringify(user), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime).map(function (res) {
            _this.sessionProvider.updateSession(res.json());
            return __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"].of(res);
        }, function (error) {
            return __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"].of(error);
        });
    };
    UserProvider.prototype.createUser = function (user) {
        return this.http.post(this.config.apiEndpoint + "/users", JSON.stringify(user), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime);
    };
    UserProvider.prototype.findUserByUsername = function (username, token, userType) {
        this.requestJsonOptions.headers.set('X-Auth-Token', token);
        this.requestJsonOptions.headers.set('user-type', userType);
        return this.http.get(this.config.apiEndpoint + "/private/users/username/" + username, this.requestJsonOptions).timeout(this.config.defaultTimeoutTime);
    };
    UserProvider.prototype.getUserRecycleItems = function (id, token, page, perPage) {
        this.requestJsonOptions.headers.set('X-Auth-Token', token);
        return this.http.get(this.config.apiEndpoint + "/private/users/" + id + "/recycleItems?page=" + page + "&perPage=" + perPage, this.requestJsonOptions).timeout(this.config.defaultTimeoutTime);
    };
    UserProvider.prototype.login = function (user) {
        return this.http.post(this.config.apiEndpoint + "/users/login", JSON.stringify(user), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime);
    };
    UserProvider.prototype.getTopRankedUsers = function () {
        return this.http.get(this.config.apiEndpoint + "/users/topRanked/").timeout(this.config.defaultTimeoutTime);
    };
    UserProvider.prototype.sendRecoverMail = function (myMail) {
        return this.http.post(this.config.apiEndpoint + "/users/forget", JSON.stringify(myMail), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime);
    };
    UserProvider.prototype.recoverUser = function (user) {
        return this.http.post(this.config.apiEndpoint + "/users/recover", JSON.stringify(user), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime);
    };
    UserProvider.prototype.existUserByEmail = function (email) {
        return this.http.get(this.config.apiEndpoint + "/users/exist/email/" + email, this.requestJsonOptions).timeout(this.config.defaultTimeoutTime);
    };
    UserProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_3__session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_2__app_app_config__["c" /* ApplicationConfig */]])
    ], UserProvider);
    return UserProvider;
}());

//# sourceMappingURL=userProvider.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_notifications__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_config__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_session__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__popover_map_popoverMap__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_utils__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_api_recycleItemsProvider__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_api_itemTypeProvider__ = __webpack_require__(144);
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
    function MapPage(navParams, notificationProvider, alertCtrl, sessionProvider, popoverCtrl, platform, utilsProvider, loadingCtrl, recycleItemsProvider, events, navCtrl, itemTypeProvider, config) {
        this.navParams = navParams;
        this.notificationProvider = notificationProvider;
        this.alertCtrl = alertCtrl;
        this.sessionProvider = sessionProvider;
        this.popoverCtrl = popoverCtrl;
        this.platform = platform;
        this.utilsProvider = utilsProvider;
        this.loadingCtrl = loadingCtrl;
        this.recycleItemsProvider = recycleItemsProvider;
        this.events = events;
        this.navCtrl = navCtrl;
        this.itemTypeProvider = itemTypeProvider;
        this.config = config;
        this.recycledAlready = false;
        this.isitemTypeName = false;
        this.modifiedItemName = false;
        this.itemTypeList = [];
        this.currentPlatformIsBrowser = false;
        if (this.platform.is('mobileweb') || this.platform.is('core')) {
            this.currentPlatformIsBrowser = true;
        }
        this.recycleItem = this.navParams.get("recycleItem"); //recycleitem.storage -> storageposition
        this.myPosition = this.navParams.get("myPosition");
        this.isitemTypeName = this.navParams.get("isitemTypeName");
        this.itemTypeList = this.navParams.get("itemTypeList");
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
            _this.initMarkers(_this.recycleItem.storage.position, _this.recycleItem.storage.name, _this.recycleItem.itemType.typeColor);
            _this.notificationProvider.presentBottomToast("Puedes ver la ruta más rápida desde el menú superior");
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
        this.loading = this.loadingCtrl.create({
            content: 'Guardando...',
            enableBackdropDismiss: true
        });
        this.loading.present();
        this.sessionProvider.getSession().then(function (user) {
            _this.recycleItem.storage = _this.recycleItem.storage.id;
            _this.recycleItemsProvider.saveRecycleItem(_this.recycleItem, user.accessToken).subscribe(function (res) {
                var status = res.status;
                if (status === 201) {
                    _this.itemTypeProvider.findItemTypeById(_this.recycleItem.itemType).subscribe(function (res) {
                        user.points = user.points + res.json().recycleValue;
                        _this.sessionProvider.updateSession(user);
                        _this.recycledAlready = true;
                        _this.loading.dismiss();
                        _this.notificationProvider.presentAlertOk('Se ha guardadado correctamente este reciclado!');
                        _this.navCtrl.pop();
                        _this.events.publish('change-tab', "profile", "history");
                        _this.events.publish('update-user', user);
                    }, function (error) {
                        _this.loading.dismiss();
                        _this.notificationProvider.presentTopToast(_this.config.defaultTimeoutMsg);
                    });
                }
                else {
                    _this.loading.dismiss();
                    _this.notificationProvider.presentTopToast("Los datos insertados son incorrectos.");
                }
            }, function (error) {
                _this.loading.dismiss();
                _this.notificationProvider.presentTopToast(_this.config.defaultTimeoutMsg);
            });
        }, function (err) {
            _this.loading.dismiss();
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
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Mostrar la mejor ruta',
            message: "Se abrirá la aplicación de mapas, después podrás volver para finalizar el reciclaje.",
            buttons: [
                {
                    text: 'Cancelar',
                    handler: function (data) {
                        return null;
                    }
                },
                {
                    text: 'Ver ruta',
                    handler: function (data) {
                        if (_this.platform.is('ios')) {
                            window.open('maps://?q=Yo&saddr=' + _this.myPosition.latitude + ',' + _this.myPosition.longitude + '&daddr=' + _this.recycleItem.storage.position.latitude + ',' + _this.recycleItem.storage.position.longitude, '_system');
                        }
                        else if (_this.platform.is('android')) {
                            var url = 'http://maps.google.com/?saddr=' + _this.myPosition.latitude + ',' + _this.myPosition.longitude + '&daddr=' + _this.recycleItem.storage.position.latitude + ',' + _this.recycleItem.storage.position.longitude;
                            window.open(url, '_system', 'location=yes'), !1;
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    MapPage.prototype.showRadioModifyItemType = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Selecciona un tipo');
        for (var i = 0; i < this.itemTypeList.length; i++) {
            if (this.recycleItem.itemType.id == this.itemTypeList[i].id) {
                alert.addInput({
                    type: 'radio',
                    label: this.itemTypeList[i].typeEs,
                    value: i.toString(),
                    checked: true
                });
            }
            else {
                alert.addInput({
                    type: 'radio',
                    label: this.itemTypeList[i].typeEs,
                    value: i.toString()
                });
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
                _this.recycleItem.itemType = _this.itemTypeList[data];
                if (_this.modifiedItemName == false && _this.isitemTypeName == true) {
                    _this.recycleItem.name = _this.itemTypeList[data].typeEs;
                }
                _this.callGetNearestStoragePointByItemType();
            }
        });
        alert.present();
    };
    MapPage.prototype.callGetNearestStoragePointByItemType = function () {
        var _this = this;
        this.utilsProvider.getNearestStoragePointByItemType(this.myPosition, this.recycleItem.itemType.id).then(function (result) {
            _this.recycleItem.storage.position = result.position;
            _this.loading.dismiss();
            _this.initMarkers(result.position, result.name, _this.recycleItem.itemType.typeColor);
        }, function (error) {
            _this.loading.dismiss();
            if (error.status == 404) {
                _this.notificationProvider.presentTopToast('No hay ningún punto de reciclaje cercano.');
            }
            else {
                _this.notificationProvider.presentTopToast(_this.config.defaultTimeoutMsg);
            }
        });
    };
    MapPage.prototype.presentPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_6__popover_map_popoverMap__["a" /* PopoverMap */], {
            mapPage: this
        });
        popover.present({
            ev: myEvent
        });
    };
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recycleMap',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle_map/recycleMap.html"*/'<ion-header>\n    <ion-navbar>\n        <div style="display: flex;justify-content: center; align-items: center;">\n            <div class="title-navbar" align="center">\n                <div class=\'main-title\'>Reciclar {{recycleItem.itemType.typeEs}}</div>\n                <div class=\'sub-title\'>{{recycleItem.name}}</div>\n            </div>\n            <div class="iconsRight">\n                <div *ngIf="!recycledAlready;">\n                    <ion-buttons right>\n                        <button ion-button icon-only color="royal" (tap)="recycleFinish()">\n                            <ion-icon name="ios-checkmark-circle"></ion-icon>\n                        </button>\n                        <button ion-button icon-only (tap)="viewOnExtenalMap()">\n                            <ion-icon name="reciclaUA-directions"></ion-icon>\n                        </button>\n                        <button ion-button icon-only color="royal" (tap)="presentPopover($event)">\n                            <ion-icon name="md-create"></ion-icon>\n                        </button>\n                    </ion-buttons>\n                </div>\n            </div>\n        </div>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div #map id="map_canvas">\n        <div *ngIf="currentPlatformIsBrowser == true;" style="height: 100%">\n            <ion-grid justify-content-center align-items-center style="height: 100%">\n                <ion-row align-items-center text-center style="height: 100%">\n                    <ion-col>\n                        <div>\n                            <p>Puedes utilizar las opciones del menú superior</p>\n                            <h5 style="font-weight: bold">Mapa no disponible en versión web</h5>\n                        </div>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </div>\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/recycle/recycle_map/recycleMap.html"*/
        }),
        __param(12, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_4__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_notifications__["a" /* NotificationProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__providers_utils__["a" /* UtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_8__providers_api_recycleItemsProvider__["a" /* RecycleItemsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_9__providers_api_itemTypeProvider__["a" /* ItemTypeProvider */],
            __WEBPACK_IMPORTED_MODULE_4__app_app_config__["c" /* ApplicationConfig */]])
    ], MapPage);
    return MapPage;
}());

//# sourceMappingURL=recycleMap.js.map

/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverMap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
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
            template: "\n      <ion-list style=\"height: 125px;\">\n        <button ion-item (tap)=\"viewOnExtenalMap()\">Abrir en Mapas</button>\n        <button ion-item (tap)=\"showRadioModifyItemType()\">Modificar el tipo</button>\n        <button ion-item (tap)=\"modifyRecycleName()\">Modificar el nombre</button>\n      </ion-list>\n    "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], PopoverMap);
    return PopoverMap;
}());

//# sourceMappingURL=popoverMap.js.map

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoragesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(13);
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



var StoragesProvider = (function () {
    function StoragesProvider(http, config) {
        this.http = http;
        this.config = config;
        this.requestJsonOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json'
            })
        });
    }
    StoragesProvider.prototype.getStoragePointsByItemType = function (itemTypeId) {
        return this.http.get(this.config.apiEndpoint + "/storages/itemTypes/" + itemTypeId + '/storagePoints').timeout(this.config.defaultTimeoutTime);
    };
    StoragesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_2__app_app_config__["c" /* ApplicationConfig */]])
    ], StoragesProvider);
    return StoragesProvider;
}());

//# sourceMappingURL=storagesProvider.js.map

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleCloudServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(13);
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
    GoogleCloudServiceProvider.prototype.getLabels = function (base64Image) {
        //this.base64.encodeFile(imagePath).then((base64Image: string) => {
        var body = {
            "requests": [
                {
                    "image": {
                        "content": base64Image
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
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_2__app_app_config__["c" /* ApplicationConfig */]])
    ], GoogleCloudServiceProvider);
    return GoogleCloudServiceProvider;
}());

//# sourceMappingURL=google.js.map

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TipProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(13);
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



var TipProvider = (function () {
    function TipProvider(http, config) {
        this.http = http;
        this.config = config;
        this.requestJsonOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json'
            })
        });
    }
    TipProvider.prototype.getRandomTip = function () {
        return this.http.get(this.config.apiEndpoint + '/tips/random', this.requestJsonOptions).timeout(this.config.defaultTimeoutTime);
    };
    TipProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_2__app_app_config__["c" /* ApplicationConfig */]])
    ], TipProvider);
    return TipProvider;
}());

//# sourceMappingURL=tipProvider.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_session__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profile_edit_profileEdit__ = __webpack_require__(336);
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
    function ProfilePage(sessionProvider, app, navCtrl, navParams, events) {
        var _this = this;
        this.sessionProvider = sessionProvider;
        this.app = app;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        sessionProvider.getSession().then(function (res) {
            _this.user = res;
        });
        this.profileSegment = this.navParams.get("profileSegment");
        this.events.subscribe('change-tab', function (tabName, profileSegment) {
            _this.profileSegment = profileSegment;
        });
        this.events.subscribe('update-user', function (user) {
            _this.user = user;
        });
    }
    ProfilePage.prototype.goToLogout = function () {
        this.sessionProvider.destroySession();
        this.app.getRootNavs()[0].setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    ProfilePage.prototype.goEditProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__profile_edit_profileEdit__["a" /* ProfileEditPage */], {
            user: this.user
        });
    };
    ProfilePage.prototype.ionSelected = function () {
        this.content.scrollToTop();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], ProfilePage.prototype, "content", void 0);
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile.html"*/'<ion-header>\n    <ion-toolbar>\n        <ion-segment [(ngModel)]="profileSegment">\n            <ion-segment-button value="profile">\n                <div class="segmentName">Perfil</div>\n            </ion-segment-button>\n            <ion-segment-button value="history">\n                <div class="segmentName">Mi historial</div>\n            </ion-segment-button>\n        </ion-segment>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content>\n    <div [ngSwitch]="profileSegment" style="height: 97%">\n        <ion-list *ngSwitchCase="\'profile\'" style="height: 100%;">\n            <ion-card *ngIf="user">\n                <ion-card-header>\n                    <span style="float: left;">\n                        <ion-badge style="vertical-align: middle" *ngIf="user.collective != null">{{user.collective.abbreviation}}</ion-badge> {{ user.fullName }}</span>\n                    <span style="float: right;">\n                        <button color="dark" ion-button clear class="editButton" (tap)="goEditProfile()">\n                            <ion-icon name="md-create"></ion-icon>\n                        </button>\n                    </span>\n                </ion-card-header>\n                <img [src]="user.profilePicture" onError="this.src = \'assets/imgs/quieroReciclar.png\'" />\n                <ion-card-content>\n                    <ion-item>\n                        <ion-icon name="md-mail" item-start></ion-icon>\n                        <span item-end>{{ user.email }}</span>\n                    </ion-item>\n                    <ion-item>\n                        <ion-icon name="md-school" item-start></ion-icon>\n                        <span item-end>{{user.school}}</span>\n                    </ion-item>\n                    <ion-item>\n                        Fecha de registro\n                        <ion-badge item-end>{{ user.createdDate | date: \'dd/MM/yyyy\'}}</ion-badge>\n                    </ion-item>\n                    <ion-item>\n                        Año de nacimiento\n                        <ion-badge item-end>{{ user.birthdate | date: \'dd/MM/yyyy\'}}</ion-badge>\n                    </ion-item>\n                    <ion-row class="pointsBox">\n                        <ion-col>\n                            <p>Puntos reciclando</p>\n                            <p>\n                                <ion-badge item-end>{{ user.points}}</ion-badge>\n                            </p>\n                        </ion-col>\n                        <ion-col>\n                            <p>Puntos jugando</p>\n                            <p>\n                                <ion-badge item-end>{{ user.gamePoints}}</ion-badge>\n                            </p>\n                        </ion-col>\n                    </ion-row>\n\n                </ion-card-content>\n            </ion-card>\n            <div class="logoutButton">\n                <button ion-button block (tap)="goToLogout()">Cerrar sesión</button>\n            </div>\n\n        </ion-list>\n        <ion-list *ngSwitchCase="\'history\'" style="height: 100%">\n            <page-myRecycledItems></page-myRecycledItems>\n        </ion-list>\n    </div>\n\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NormalLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_userProvider__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_user__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_session__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tabs_tabs__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_notifications__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_encryptProvider__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_typeUser__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__recoverPasswordGenCode_recoverPasswordGenCode__ = __webpack_require__(333);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var NormalLoginPage = (function () {
    function NormalLoginPage(app, navParams, formBuilder, userProvider, loadingCtrl, sessionProvider, notificationProvider, encryptProvider, navCtrl) {
        this.app = app;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.userProvider = userProvider;
        this.loadingCtrl = loadingCtrl;
        this.sessionProvider = sessionProvider;
        this.notificationProvider = notificationProvider;
        this.encryptProvider = encryptProvider;
        this.navCtrl = navCtrl;
        this.defaultPage = 'login';
        this.email = '';
        this.password = '';
        this.defaultPage = this.navParams.get("defaultPage");
        this.loginForm = this.formBuilder.group({
            email: [''],
            password: ['']
        }, {
            validator: NormalLoginPage_1.EmailIsValid
        });
    }
    NormalLoginPage_1 = NormalLoginPage;
    NormalLoginPage.prototype.ionViewDidLoad = function () {
    };
    NormalLoginPage.prototype.setDefaultPage = function (defaultPage) {
        this.defaultPage = defaultPage;
    };
    NormalLoginPage.prototype.login_Button = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Iniciando sesión...'
        });
        this.loading.present();
        var emailForm = this.loginForm.get("email");
        var passwordForm = this.loginForm.get("password");
        var password = this.encryptProvider.encryptPassword(passwordForm.value);
        var user = new __WEBPACK_IMPORTED_MODULE_3__models_user__["a" /* User */]();
        user.email = emailForm.value;
        user.password = password;
        user.type = __WEBPACK_IMPORTED_MODULE_9__models_typeUser__["a" /* TypeUser */].Normal;
        this.userProvider.login(user).subscribe(function (res) {
            _this.loading.dismiss();
            if (res.status == 200) {
                user = res.json();
                _this.sessionProvider.updateSession(user);
                _this.app.getRootNavs()[0].setRoot(__WEBPACK_IMPORTED_MODULE_6__tabs_tabs__["a" /* TabsPage */]);
            }
        }, function (error) {
            _this.loading.dismiss();
            emailForm.setValue('');
            passwordForm.setValue('');
            _this.notificationProvider.presentAlertError("El usuario y/o contrseña son incorrectos.");
        });
    };
    NormalLoginPage.EmailIsValid = function (control) {
        var email = control.controls.email; // to get value in input tag
        var EMAIL_REGEXP = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
        if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(email.value))) {
            email.setErrors({ EmailIsValid: true });
        }
        else {
            return null;
        }
    };
    NormalLoginPage.prototype.goToRecoverPasswordPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__recoverPasswordGenCode_recoverPasswordGenCode__["a" /* RecoverPasswordGenCodePage */], {});
    };
    NormalLoginPage = NormalLoginPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-normalLogin',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/login/normalLogin/normalLogin.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Iniciar sesión</ion-title>\n    </ion-navbar>\n    <ion-toolbar>\n        <ion-segment [(ngModel)]="defaultPage">\n            <ion-segment-button value="login">\n                <div class="segmentName">Iniciar sesión</div>\n            </ion-segment-button>\n            <ion-segment-button value="register">\n                <div class="segmentName">Registrarse</div>\n            </ion-segment-button>\n        </ion-segment>\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n    <div [ngSwitch]="defaultPage" style="height: 97%">\n        <ion-list *ngSwitchCase="\'login\'" style="height: 100%;">\n            <ion-grid style="height: 100%">\n                <ion-row align-items-center text-center style="height: 100%">\n                    <ion-col>\n                        <div class="login-box">\n                            <form [formGroup]="loginForm" (ngSubmit)="login_Button()">\n                                <ion-row>\n                                    <ion-col>\n                                        <ion-list inset>\n                                            <ion-item>\n                                                <ion-input type="email" placeholder="Email" formControlName="email" required></ion-input>\n                                            </ion-item>\n\n                                            <ion-item>\n                                                <ion-input type="password" placeholder="Password" formControlName="password" required></ion-input>\n                                            </ion-item>\n\n                                        </ion-list>\n                                    </ion-col>\n                                </ion-row>\n\n                                <ion-row>\n                                    <ion-col class="signup-col">\n                                        <button ion-button class="submit-btn" full type="submit" [disabled]="!loginForm.valid">Iniciar sesión</button>\n                                    </ion-col>\n                                </ion-row>\n                                <ion-row>\n                                    <ion-col style="padding:0">\n                                        <button ion-button clear [ngStyle]="{\'font-size\': \'12px\' }" (tap)="goToRecoverPasswordPage()">No me acuerdo de mi contraseña</button>\n                                    </ion-col>\n                                </ion-row>\n\n\n                            </form>\n                        </div>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-list>\n        <ion-list *ngSwitchCase="\'register\'" style="height: 100%">\n            <page-normalRegister (onRegisterFinishEvent)="setDefaultPage($event)"></page-normalRegister>\n        </ion-list>\n    </div>\n\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/login/normalLogin/normalLogin.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2__providers_api_userProvider__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_notifications__["a" /* NotificationProvider */],
            __WEBPACK_IMPORTED_MODULE_8__providers_encryptProvider__["a" /* EncryptProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], NormalLoginPage);
    return NormalLoginPage;
    var NormalLoginPage_1;
}());

//# sourceMappingURL=normalLogin.js.map

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecoverPasswordGenCodePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_api_userProvider__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_notifications__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_config__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_myMail__ = __webpack_require__(704);
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







var RecoverPasswordGenCodePage = (function () {
    function RecoverPasswordGenCodePage(formBuilder, userProvider, notificationProvider, loadingCtrl, config) {
        this.formBuilder = formBuilder;
        this.userProvider = userProvider;
        this.notificationProvider = notificationProvider;
        this.loadingCtrl = loadingCtrl;
        this.config = config;
        this.defaultPage = 'code';
        this.onRegisterFinishEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.generateCodeForm = this.formBuilder.group({
            email: ['']
        }, {
            validator: [RecoverPasswordGenCodePage_1.EmailIsValid]
        });
    }
    RecoverPasswordGenCodePage_1 = RecoverPasswordGenCodePage;
    RecoverPasswordGenCodePage.prototype.setDefaultPage = function (defaultPage) {
        this.defaultPage = defaultPage;
    };
    RecoverPasswordGenCodePage.prototype.register_Button = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Cargando...'
        });
        this.loading.present();
        var emailForm = this.generateCodeForm.get("email");
        var myMail = new __WEBPACK_IMPORTED_MODULE_6__models_myMail__["a" /* MyMail */]();
        myMail.from = this.config.emailFrom;
        myMail.fromName = this.config.emailFromName;
        myMail.fromPassword = this.config.emailFromPassword;
        myMail.message = null; /* code is generated by sever */
        myMail.subject = "Recuperar contraseña";
        myMail.to = emailForm.value;
        this.userProvider.sendRecoverMail(myMail).subscribe(function (res) {
            _this.loading.dismiss();
            _this.notificationProvider.presentBottomToast("Se ha generado un código, por favor revisa el correo");
            _this.defaultPage = 'resetPwd';
        }, function (error) {
            _this.loading.dismiss();
            if (error.status == 404) {
                _this.notificationProvider.presentAlertError("El correo indicado no existe");
            }
            else {
                _this.notificationProvider.presentTopToast(_this.config.defaultTimeoutMsg);
            }
        });
    };
    RecoverPasswordGenCodePage.EmailIsValid = function (control) {
        var email = control.controls.email; // to get value in input tag
        var EMAIL_REGEXP = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
        if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(email.value))) {
            email.setErrors({ EmailIsValid: true });
        }
        else {
            return null;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], RecoverPasswordGenCodePage.prototype, "onRegisterFinishEvent", void 0);
    RecoverPasswordGenCodePage = RecoverPasswordGenCodePage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recoverPasswordGenCode',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/login/normalLogin/recoverPasswordGenCode/recoverPasswordGenCode.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Recuperar contraseña</ion-title>\n    </ion-navbar>\n    <ion-toolbar>\n        <ion-segment [(ngModel)]="defaultPage">\n            <ion-segment-button value="code">\n                <div class="segmentName">Enviar código</div>\n            </ion-segment-button>\n            <ion-segment-button value="resetPwd">\n                <div class="segmentName">Ya tengo mi código</div>\n            </ion-segment-button>\n        </ion-segment>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content>\n    <div [ngSwitch]="defaultPage" style="height: 97%">\n        <ion-list *ngSwitchCase="\'code\'" style="height: 100%;">\n            <ion-grid style="height: 100%">\n                <ion-row align-items-center text-center style="height: 100%">\n                    <ion-col>\n                        <form [formGroup]="generateCodeForm" (ngSubmit)="register_Button()">\n                            <ion-row>\n                                <ion-col>\n                                    <ion-list inset>\n                                        <ion-item>\n                                            <ion-input type="email" placeholder="Email" formControlName="email" required></ion-input>\n                                        </ion-item>\n                                    </ion-list>\n                                </ion-col>\n                            </ion-row>\n\n                            <ion-row>\n                                <ion-col class="signup-col">\n                                    <button ion-button class="submit-btn" full type="submit" [disabled]="!generateCodeForm.valid">Recuperar cuenta</button>\n                                </ion-col>\n                            </ion-row>\n                        </form>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-list>\n        <ion-list *ngSwitchCase="\'resetPwd\'" style="height: 100%">\n            <page-recoverPassword (onRegisterFinishEvent)="setDefaultPage($event)"></page-recoverPassword>\n        </ion-list>\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/login/normalLogin/recoverPasswordGenCode/recoverPasswordGenCode.html"*/
        }),
        __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_5__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__providers_api_userProvider__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_notifications__["a" /* NotificationProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__app_app_config__["c" /* ApplicationConfig */]])
    ], RecoverPasswordGenCodePage);
    return RecoverPasswordGenCodePage;
    var RecoverPasswordGenCodePage_1;
}());

//# sourceMappingURL=recoverPasswordGenCode.js.map

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InstagramProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cordova_oauth_core__ = __webpack_require__(705);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cordova_oauth_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_cordova_oauth_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cordova_oauth_platform_cordova__ = __webpack_require__(714);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cordova_oauth_platform_cordova___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_cordova_oauth_platform_cordova__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_config__ = __webpack_require__(13);
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





var InstagramProvider = (function () {
    function InstagramProvider(http, config) {
        this.http = http;
        this.config = config;
        this.oauth = new __WEBPACK_IMPORTED_MODULE_2_ng2_cordova_oauth_platform_cordova__["OauthCordova"]();
        this.instagramProvider = new __WEBPACK_IMPORTED_MODULE_1_ng2_cordova_oauth_core__["Instagram"]({
            clientId: this.config.instagramAPIKey,
            redirectUri: 'http://localhost',
            responseType: 'token',
            appScope: ['basic']
        });
    }
    InstagramProvider.prototype.login = function () {
        return this.oauth.logInVia(this.instagramProvider);
    };
    InstagramProvider.prototype.getInstagramUserInfo = function (access_token) {
        //GET USER PHOTOS
        return this.http.get('https://api.instagram.com/v1/users/self/?access_token=' + access_token + '&count=5');
    };
    InstagramProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_4__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_4__app_app_config__["c" /* ApplicationConfig */]])
    ], InstagramProvider);
    return InstagramProvider;
}());

//# sourceMappingURL=instagramProvider.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileEditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_notifications__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_api_userProvider__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_config__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_fileProvider__ = __webpack_require__(91);
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








var ProfileEditPage = (function () {
    function ProfileEditPage(config, formBuilder, actionSheetCtrl, camera, loadingCtrl, notificationProvider, navParams, userProvider, navCtrl, fileProvider) {
        this.config = config;
        this.formBuilder = formBuilder;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.notificationProvider = notificationProvider;
        this.navParams = navParams;
        this.userProvider = userProvider;
        this.navCtrl = navCtrl;
        this.fileProvider = fileProvider;
        this.defaultPage = 'profileEdit';
        this.image = '';
        this.user = this.navParams.get('user');
        this.image = this.user.profilePicture;
        this.profileEditForm = this.formBuilder.group({
            email: [this.user.email],
            fullName: [this.user.fullName]
        }, {
            validator: ProfileEditPage_1.EmailIsValid
        });
    }
    ProfileEditPage_1 = ProfileEditPage;
    ProfileEditPage.prototype.editProfile_Button = function () {
        var _this = this;
        var email = this.profileEditForm.get("email").value;
        var fullName = this.profileEditForm.get("fullName").value;
        if (this.user.email != email || this.user.fullName != fullName || this.user.profilePicture != this.image) {
            this.loading = this.loadingCtrl.create({
                content: 'Guardando usuario...'
            });
            this.loading.present();
            this.emailCheckDifferenceAndExistAlready(this.user.email, email).then(function (res) {
                if (res == false) {
                    _this.user.email = email;
                    _this.user.fullName = fullName;
                    if (_this.image != _this.user.profilePicture) {
                        _this.user.profilePicture = _this.image;
                        _this.uploadImage(_this.image).then(function (res) {
                            _this.image = res;
                            _this.user.profilePicture = res;
                            _this.userProvider.saveUser(_this.user, _this.user.accessToken).subscribe(function (res) {
                                _this.notificationProvider.presentTopToast("El usuario se ha guardado correctamente!");
                                _this.loading.dismiss();
                                _this.navCtrl.pop();
                            }, function (error) {
                                _this.notificationProvider.presentTopToast("Error a la hora de guardar el usuario");
                                _this.loading.dismiss();
                            });
                        });
                    }
                    else {
                        _this.userProvider.saveUser(_this.user, _this.user.accessToken).subscribe(function (res) {
                            _this.notificationProvider.presentTopToast("El usuario se ha guardado correctamente!");
                            _this.loading.dismiss();
                            _this.navCtrl.pop();
                        }, function (error) {
                            _this.loading.dismiss();
                            _this.notificationProvider.presentTopToast("Error al guardar el usuario");
                        });
                    }
                }
                else {
                    _this.loading.dismiss();
                    _this.notificationProvider.presentAlertError("Dicho correo ya está siendo utilizado");
                }
            });
        }
        else {
            this.navCtrl.pop();
        }
    };
    ProfileEditPage.prototype.editProfilePicture = function () {
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
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    ProfileEditPage.prototype.emailCheckDifferenceAndExistAlready = function (userMail, newMail) {
        var _this = this;
        return new Promise(function (resolve) {
            if (userMail != newMail) {
                _this.userProvider.existUserByEmail(newMail).subscribe(function (res) {
                    resolve(res.json());
                }, function (error) {
                    resolve(true);
                });
            }
            else {
                resolve(false);
            }
        });
    };
    ProfileEditPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Cargando...'
        });
        this.loading.present();
        this.fileProvider.takePicture(sourceType).then(function (res) {
            _this.image = res['imagePath'];
            _this.loading.dismiss();
        }, function (error) {
            _this.loading.dismiss();
            if (error != 'No Image Selected' && error.message != "User cancelled") {
                _this.notificationProvider.presentTopToast('Error en la selección de la imagen.');
            }
        });
    };
    ProfileEditPage.prototype.uploadImage = function (targetPath) {
        var _this = this;
        var date = new Date();
        var filename = this.user.id + "_" + date.getTime() + ".png";
        var url = this.config.uploadFilesUrl;
        var urlUpload = url + "/upload-avatar.php";
        var urlUploadedFiles = url + this.fileProvider.avatarsFolder + filename;
        return new Promise(function (resolve, reject) {
            _this.fileProvider.uploadFile(targetPath, filename, urlUpload).then(function (res) {
                if (res == true) {
                    resolve(urlUploadedFiles);
                }
                else {
                    _this.loading.dismiss();
                    _this.notificationProvider.presentAlertError('La imagen no ha sido cargada correctamente.');
                    reject();
                }
            }, function (error) {
                _this.loading.dismiss();
                _this.notificationProvider.presentAlertError('Error de conexión con el servidor de imágenes.');
                reject();
            });
        });
    };
    ProfileEditPage.EmailIsValid = function (control) {
        var email = control.controls.email; // to get value in input tag
        var EMAIL_REGEXP = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
        if (email.value != null && control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(email.value))) {
            email.setErrors({ EmailIsValid: true });
        }
        else {
            email.setErrors(null);
            return null;
        }
    };
    ProfileEditPage = ProfileEditPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profileEdit',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile_edit/profileEdit.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Editar perfil</ion-title>\n    </ion-navbar>\n    <ion-toolbar>\n        <ion-segment [(ngModel)]="defaultPage">\n            <ion-segment-button value="profileEdit">\n                <div class="segmentName">Usuario</div>\n            </ion-segment-button>\n            <ion-segment-button value="profileEditPassword">\n                <div class="segmentName">Contraseña</div>\n            </ion-segment-button>\n            <ion-segment-button value="profileEditOthers">\n                <div class="segmentName">Otros datos</div>\n            </ion-segment-button>\n        </ion-segment>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content>\n    <div [ngSwitch]="defaultPage" style="height: 97%">\n        <ion-list *ngSwitchCase="\'profileEdit\'" style="height: 100%;">\n            <ion-grid style="height: 100%">\n\n                <ion-row align-items-center text-center style="height: 100%">\n                    <ion-col>\n                        <form [formGroup]="profileEditForm" (ngSubmit)="editProfile_Button()">\n\n                            <ion-grid style="height: 150px;">\n                                <ion-row>\n                                    <ion-col col-5>\n                                        <ion-thumbnail item-left>\n                                            <img [src]="image" onError="this.src = \'assets/imgs/quieroReciclar.png\'">\n                                        </ion-thumbnail>\n                                    </ion-col>\n                                    <ion-col style="padding-top: 15px;">\n                                        <ion-row>\n                                            <ion-item style="padding-left: 0;">\n                                                <ion-input type="email" placeholder="Email" formControlName="email"></ion-input>\n                                            </ion-item>\n                                        </ion-row>\n                                        <ion-row>\n                                            <ion-item style="padding-left: 0;">\n                                                <ion-input type="text" placeholder="Nombre completo" formControlName="fullName" required></ion-input>\n                                            </ion-item>\n                                        </ion-row>\n\n                                    </ion-col>\n\n                                </ion-row>\n                                <hr class="style14" />\n                            </ion-grid>\n                            <button ion-button clear (tap)="editProfilePicture()">Seleccionar imagen de perfil</button>\n\n                            <ion-row>\n                                <ion-col class="signup-col">\n                                    <button ion-button class="submit-btn" full type="submit" [disabled]="!profileEditForm.valid">Modificar perfil</button>\n                                </ion-col>\n                            </ion-row>\n                        </form>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-list>\n        <ion-list *ngSwitchCase="\'profileEditPassword\'" style="height: 100%">\n            <page-profileEditPassword></page-profileEditPassword>\n        </ion-list>\n        <ion-list *ngSwitchCase="\'profileEditOthers\'" style="height: 100%">\n            <page-profileEditOthers></page-profileEditOthers>\n        </ion-list>\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile_edit/profileEdit.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_6__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__app_app_config__["c" /* ApplicationConfig */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_notifications__["a" /* NotificationProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__providers_api_userProvider__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_7__providers_fileProvider__["a" /* FileProvider */]])
    ], ProfileEditPage);
    return ProfileEditPage;
    var ProfileEditPage_1;
}());

//# sourceMappingURL=profileEdit.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_api_recycleItemsProvider__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_session__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(12);
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
    function HomePage(recycleItemsProvider, config, sessionProvider) {
        var _this = this;
        this.recycleItemsProvider = recycleItemsProvider;
        this.config = config;
        this.sessionProvider = sessionProvider;
        this.recycleItems = [];
        this.users = [];
        this.page = 0;
        this.perPage = 10;
        this.showLoadingMsg = true;
        this.errorLoadingContent = false;
        this.perPage = this.config.itemsPerPage;
        this.sessionProvider.getSession().then(function (user) {
            _this.user = user;
            _this.getLatestRecycleItems("infinite").then(function (res) {
                _this.showLoadingMsg = false;
                if (res == false) {
                    _this.errorLoadingContent = true;
                }
            });
        }, function (error) {
            _this.showLoadingMsg = false;
            if (error.status != 404) {
                _this.errorLoadingContent = true;
            }
        });
    }
    HomePage.prototype.getLatestRecycleItems = function (refreshType) {
        var _this = this;
        var status;
        return new Promise(function (resolve) {
            _this.recycleItemsProvider.getLatestRecycleItems(_this.page, _this.perPage).subscribe(function (res) {
                status = res.status;
                if (status === 200) {
                    var resJson = res.json();
                    _this.totalPages = resJson.recycleItemList.totalPages;
                    _this.totalElements = resJson.recycleItemList.totalElements;
                    /* TOP BAR USER LIST */
                    var tempUserList = resJson.userList;
                    if (refreshType == "refresh") {
                        tempUserList = tempUserList.reverse();
                    }
                    for (var i = 0; i < tempUserList.length; i++) {
                        if (refreshType == "refresh") {
                            if (_this.users.find(function (x) { return x.id == tempUserList[i].id; }) == null) {
                                _this.users.unshift(tempUserList[i]);
                            }
                        }
                        else {
                            if (_this.users.find(function (x) { return x.id == tempUserList[i].id; }) == null) {
                                _this.users.push(tempUserList[i]);
                            }
                        }
                    }
                    /* RECYCLEITEM LIST */
                    var tempRecycleList = _this.readRecycleItems(resJson.recycleItemList.content, resJson.userList);
                    if (refreshType == "refresh") {
                        tempRecycleList = tempRecycleList.reverse();
                    }
                    for (var j = 0; j < tempRecycleList.length; j++) {
                        if (refreshType == "refresh") {
                            if (_this.recycleItems.find(function (x) { return x.id == tempRecycleList[j].id; }) == null) {
                                _this.recycleItems.unshift(tempRecycleList[j]);
                            }
                        }
                        else {
                            _this.recycleItems.push(tempRecycleList[j]);
                        }
                    }
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }, function (error) {
                if (error.status == 404) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    HomePage.prototype.readRecycleItems = function (recycleItemList, userList) {
        var itemTypeItems = [];
        var _loop_1 = function (item) {
            if (!parseInt(recycleItemList[item].itemType)) {
                itemTypeItems.push(recycleItemList[item].itemType);
            }
            else {
                recycleItemList[item].itemType = itemTypeItems.filter(function (x) { return x.id == recycleItemList[item].itemType; })[0];
            }
            recycleItemList[item].recycleUser = userList.filter(function (x) { return x.id == recycleItemList[item].recycleUser; })[0];
        };
        for (var item in recycleItemList) {
            _loop_1(item);
        }
        return recycleItemList;
    };
    HomePage.prototype.doInfinite = function (infiniteScroll) {
        this.page += 1;
        var refreshType = "infinite";
        this.getLatestRecycleItems(refreshType).then(function (res) {
            infiniteScroll.complete();
        });
    };
    HomePage.prototype.doRefresh = function (refresher) {
        var temporalPage = this.page;
        this.page = 0;
        this.getLatestRecycleItems("refresh").then(function (res) {
            refresher.complete();
        });
        this.page = temporalPage;
    };
    HomePage.prototype.ionSelected = function () {
        this.content.scrollToTop();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Content */])
    ], HomePage.prototype, "content", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/home/home.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title style="text-align: center;">ReciclaUA</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n    <div *ngIf="recycleItems?.length> 0;">\n        <ion-toolbar>\n            <div class=" lastUsersTitle ">Últimos usuarios reciclando</div>\n            <div class="lastUsersBody">\n                <span *ngFor="let user of users " style="width: 100%; ">\n                    <img class="lastUsersAvatar " src="{{user.profilePicture}} " onError="this.src=\'assets/imgs/quieroReciclar.png\' " />\n                </span>\n            </div>\n        </ion-toolbar>\n    </div>\n\n    <ion-refresher (ionRefresh)="doRefresh($event) ">\n        <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n\n    <div *ngIf="recycleItems?.length> 0;else recycleItemsNotFound">\n        <div *ngFor="let recycleItem of recycleItems" style="width: 100%;">\n            <ion-card>\n                <ion-item class="recycleItemIonItem">\n                    <ion-avatar item-start>\n                        <img src="{{recycleItem.recycleUser.profilePicture}}" onError="this.src = \'assets/imgs/quieroReciclar.png\'">\n                    </ion-avatar>\n                    {{recycleItem.recycleUser.fullName}}\n                    <p>{{ recycleItem.createdDate | date: \'dd/MM/yyyy H:mm\'}}</p>\n                </ion-item>\n\n                <img src="{{recycleItem.image}}" onError="this.src = \'assets/imgs/quieroReciclar.png\'">\n\n                <ion-card-content>\n                    <p style="color: #222;">{{recycleItem.itemType.typeEs}}</p>\n                    <p class="recycleItemName" *ngIf="recycleItem.itemType.typeEs != recycleItem.name">\n                        {{recycleItem.name}}\n                    </p>\n                </ion-card-content>\n            </ion-card>\n        </div>\n\n        <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="page < totalPages">\n            <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Cargando más datos..."></ion-infinite-scroll-content>\n        </ion-infinite-scroll>\n    </div>\n</ion-content>\n\n<ng-template #recycleItemsNotFound>\n    <ion-grid style="height: 100% ">\n        <ion-row align-items-center text-center style="height: 100%">\n            <ion-col>\n                <div *ngIf="showLoadingMsg == true; else showLoadingResult">\n                    <h5>Cargando...</h5>\n                </div>\n                <ng-template #showLoadingResult>\n                    <div *ngIf="errorLoadingContent == true; else showNoRecycledItemsFound">\n                        <div>\n                            <p>Ha habido algún problema</p>\n                            <h5 style="font-weight: bold">Intentalo de nuevo en unos minutos</h5>\n                        </div>\n                    </div>\n                    <ng-template #showNoRecycledItemsFound>\n                        <div>\n                            <p>Todavía no has reciclado nada</p>\n                            <h5 style="font-weight: bold">¡A qué esperas!</h5>\n                        </div>\n                    </ng-template>\n                </ng-template>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ng-template>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/home/home.html"*/
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_api_recycleItemsProvider__["a" /* RecycleItemsProvider */],
            __WEBPACK_IMPORTED_MODULE_2__app_app_config__["c" /* ApplicationConfig */],
            __WEBPACK_IMPORTED_MODULE_3__providers_session__["a" /* SessionProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RankingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_userProvider__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RankingPage = (function () {
    function RankingPage(usersProvider) {
        var _this = this;
        this.usersProvider = usersProvider;
        this.users = [];
        this.showLoadingMsg = true;
        this.getTopRankedUsers().then(function (res) {
            _this.showLoadingMsg = false;
        });
    }
    RankingPage.prototype.getTopRankedUsers = function () {
        var _this = this;
        var status;
        return new Promise(function (resolve) {
            _this.usersProvider.getTopRankedUsers().subscribe(function (res) {
                status = res.status;
                if (status === 200) {
                    _this.users = res.json();
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }, function (error) {
                if (error.status == 404) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    RankingPage.prototype.doRefresh = function (refresher) {
        this.getTopRankedUsers().then(function (res) {
            refresher.complete();
        });
    };
    RankingPage.prototype.ionSelected = function () {
        this.content.scrollToTop();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], RankingPage.prototype, "content", void 0);
    RankingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ranking',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/ranking/ranking.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Ranking</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n    <ion-grid style="height: 100%">\n        <div *ngIf="users?.length > 0;else usersNotFound">\n            <ion-row justify-content-center align-items-center style="height: 100%">\n                <div *ngFor="let user of users" style="width: 100%;">\n                    <ion-item>\n                        <ion-avatar item-start>\n                            <img src="{{user.profilePicture}}" onError="this.src = \'assets/imgs/quieroReciclar.png\'">\n                        </ion-avatar>\n                        {{user.fullName}}\n\n                        <ion-badge item-end> {{user.points}}\n                            <span *ngIf="user.points > 1 || user.points == 0; else only1Point">puntos</span>\n                        </ion-badge>\n\n                    </ion-item>\n                </div>\n            </ion-row>\n        </div>\n    </ion-grid>\n</ion-content>\n\n<ng-template #usersNotFound>\n    <ion-row align-items-center text-center style="height: 100%">\n        <ion-col>\n            <div *ngIf="showLoadingMsg == true; else showLoadingResult">\n                <h5>Cargando...</h5>\n            </div>\n        </ion-col>\n    </ion-row>\n</ng-template>\n\n<ng-template #showLoadingResult>\n    <div>\n        <p>Ha habido algún problema</p>\n        <h5 style="font-weight: bold">Intentalo de nuevo en unos minutos</h5>\n    </div>\n</ng-template>\n\n<ng-template #only1Point>\n    punto\n</ng-template>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/ranking/ranking.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_api_userProvider__["a" /* UserProvider */]])
    ], RankingPage);
    return RankingPage;
}());

//# sourceMappingURL=ranking.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GamePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_questionProvider__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_session__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_notifications__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_api_userQuestionProvider__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_util_util__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var GamePage = (function () {
    function GamePage(questionProvider, sessionProvider, notificationProvider, alertCtrl, userQuestionProvider, loadingCtrl, events) {
        var _this = this;
        this.questionProvider = questionProvider;
        this.sessionProvider = sessionProvider;
        this.notificationProvider = notificationProvider;
        this.alertCtrl = alertCtrl;
        this.userQuestionProvider = userQuestionProvider;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.sessionProvider.getSession().then(function (user) {
            _this.user = user;
            _this.getQuestion().then(function (res) {
                _this.showLoadingMsg = false;
            });
        }, function (err) {
            _this.notificationProvider.presentTopToast('Error obteniendo los datos necesarios.');
        });
    }
    GamePage.prototype.getQuestion = function () {
        var _this = this;
        this.question = null;
        this.showLoadingMsg = true;
        this.oneDayLeftAlready = false;
        this.incorrectSurvey = false;
        this.lastQuestionDone = null;
        this.noQuestionFound = false;
        this.hoursLeft = 0;
        var status;
        return new Promise(function (resolve) {
            _this.questionProvider.getRandomQuestion(_this.user.id, _this.user.accessToken).subscribe(function (res) {
                status = res.status;
                if (status === 200) {
                    if (res.json().replies.length == 4) {
                        _this.question = res.json();
                        _this.question.replies = _this.shuffleReplies(_this.question);
                        resolve(true);
                    }
                    else {
                        _this.incorrectSurvey = true;
                        resolve(false);
                    }
                }
                else if (status === 206) {
                    _this.lastQuestionDone = res.json();
                    if (_this.lastQuestionDone.question != null) {
                        if (Object(__WEBPACK_IMPORTED_MODULE_6_ionic_angular_util_util__["j" /* isNumber */])(_this.lastQuestionDone.question.correctReply)) {
                            _this.lastQuestionDoneReply = _this.lastQuestionDone.userReply;
                        }
                        else {
                            _this.lastQuestionDoneReply = _this.lastQuestionDone.question.correctReply;
                        }
                    }
                    _this.hoursLeft = 24 - _this.lastQuestionDone.hours;
                    _this.oneDayLeftAlready = true;
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }, function (error) {
                if (error.status == 404) {
                    _this.noQuestionFound = true;
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    GamePage.prototype.shuffleReplies = function (question) {
        var arrayReplies = question.replies;
        arrayReplies.push(question.correctReply);
        arrayReplies = arrayReplies.filter(function (item) { return (!parseInt(item)); });
        var currentIndex = arrayReplies.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = arrayReplies[currentIndex];
            arrayReplies[currentIndex] = arrayReplies[randomIndex];
            arrayReplies[randomIndex] = temporaryValue;
        }
        return arrayReplies;
    };
    GamePage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.getQuestion().then(function (res) {
            _this.showLoadingMsg = false;
            refresher.complete();
        });
    };
    GamePage.prototype.ionSelected = function () {
        this.content.scrollToTop();
    };
    GamePage.prototype.saveUserReply = function (replyPicked) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Elegir respuesta',
            message: "Al elegir una respuesta no podrás volver atrás.",
            buttons: [
                {
                    text: 'Cancelar',
                    handler: function (data) {
                        return null;
                    }
                },
                {
                    text: 'Aceptar',
                    handler: function (data) {
                        _this.loading = _this.loadingCtrl.create({
                            content: 'Cargando...',
                            enableBackdropDismiss: true
                        });
                        _this.loading.present();
                        _this.userQuestionProvider.saveUserReply(_this.user.id, _this.question.id, _this.question.replies[replyPicked].id, _this.user.accessToken).subscribe(function (res) {
                            _this.lastQuestionDoneReply = res.json();
                            if (_this.lastQuestionDoneReply.id == _this.question.replies[replyPicked].id) {
                                _this.user.gamePoints = _this.user.gamePoints + _this.question.questionValue;
                                _this.sessionProvider.updateSession(_this.user);
                                _this.events.publish('update-user', _this.user);
                            }
                            _this.loading.dismiss();
                            _this.getQuestion().then(function (res) {
                                _this.showLoadingMsg = false;
                            });
                        }, function (error) {
                            _this.loading.dismiss();
                            if (error.status == 404) {
                                _this.notificationProvider.presentTopToast("Parece que ha habido un error, prueba más tarde");
                            }
                            else {
                                _this.notificationProvider.presentTopToast("La pregunta parece tener errores, prueba más tarde");
                            }
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], GamePage.prototype, "content", void 0);
    GamePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-game',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/game/game.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Adivina dónde se recicla</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n    <ion-grid style="height: 100%">\n        <div *ngIf="oneDayLeftAlready == false;else oneDayLeftTemplate" style="height: 100%">\n            <ion-row align-items-center text-center style="height: 100%">\n                <ion-col>\n                    <div *ngIf="question != null;else questionNotFound">\n                        <div class="questionTitle currentQuestion" align="center">\n                            {{question.name}}\n                        </div>\n                        <div style="margin-top: 50px;">\n\n                            <p>\n                                <button style="width: 300px;" (tap)="saveUserReply(0)" ion-button>{{question.replies[0].name}}</button>\n                            </p>\n                            <p>\n                                <button style="width: 300px;" (tap)="saveUserReply(1)" ion-button>{{question.replies[1].name}}</button>\n                            </p>\n                            <p>\n                                <button style="width: 300px;" (tap)="saveUserReply(2)" ion-button>{{question.replies[2].name}}</button>\n                            </p>\n                            <p>\n                                <button style="width: 300px;" (tap)="saveUserReply(3)" ion-button>{{question.replies[3].name}}</button>\n                            </p>\n\n                        </div>\n                    </div>\n                </ion-col>\n            </ion-row>\n        </div>\n    </ion-grid>\n</ion-content>\n\n<ng-template #questionNotFound>\n    <div *ngIf="showLoadingMsg == true; else showLoadingResult">\n        <h5>Cargando...</h5>\n    </div>\n</ng-template>\n\n<ng-template #oneDayLeftTemplate>\n    <div *ngIf="lastQuestionDone != null && lastQuestionDone.question != null; else lastQuestionNotFoundTemplate" class="lastQuestionBox">\n        <ion-row align-items-center text-center style="height: 50%">\n            <ion-col>\n                <p>¡Aún no ha pasado un día!</p>\n                <h5 style="font-weight: bold">Quedan {{hoursLeft}} horas</h5>\n            </ion-col>\n        </ion-row>\n        <ion-row text-center>\n            <ion-col>\n                Última pregunta\n                <div class="questionTitle" align="center">\n                    <p style="padding: 10px;">{{lastQuestionDone.question.name}}</p>\n                </div>\n                <div style="margin-top: 10px;">\n                    Tu respuesta\n                    <div class="questionTitle" align="center">\n                        <p style="padding: 10px;">{{lastQuestionDone.userReply.name}}</p>\n                    </div>\n                </div>\n                <div style="margin-top: 10px;height: 70px;">\n                    <div *ngIf="lastQuestionDone.userReply.id == lastQuestionDoneReply.id; else incorrectReplyTemplate" style="font-size: 18px;font-weight: bold;line-height: 30px;">\n                        ¡Felicidades, has acertado!\n                        <br>\n                        <ion-badge>puntuación: {{lastQuestionDone.question.questionValue}}</ion-badge>\n                    </div>\n                </div>\n\n            </ion-col>\n        </ion-row>\n    </div>\n</ng-template>\n\n<ng-template #lastQuestionNotFoundTemplate>\n    <ion-row align-items-center text-center style="height: 100%">\n        <ion-col>\n            <p>¡Aún no ha pasado un día!</p>\n            <h5 style="font-weight: bold">Quedan {{hoursLeft}} horas</h5>\n        </ion-col>\n    </ion-row>\n</ng-template>\n\n<ng-template #incorrectReplyTemplate>\n    La respuesta correcta es\n    <div class="questionTitle" align="center">\n        <p style="padding: 10px;">{{lastQuestionDoneReply.name}}</p>\n    </div>\n</ng-template>\n\n<ng-template #showLoadingResult>\n    <div *ngIf="oneDayLeftAlready == false">\n        <div *ngIf="incorrectSurvey == true; else checkQuestionTemplate">\n            <p>Esta encuesta es incorrecta</p>\n            <p style="font-weight: bold">Desliza hacia abajo para que te aparezca una nueva encuesta</p>\n        </div>\n    </div>\n</ng-template>\n\n<ng-template #checkQuestionTemplate>\n    <div *ngIf="noQuestionFound == true;else errorFound">\n        <p>¡Ups! No encuentro nada</p>\n        <h5 style="font-weight: bold">Has respondido todas las preguntas</h5>\n    </div>\n</ng-template>\n\n<ng-template #errorFound>\n    <div>\n        <p>Ha habido algún problema</p>\n        <h5 style="font-weight: bold">Intentalo de nuevo en unos minutos</h5>\n    </div>\n</ng-template>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/game/game.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_api_questionProvider__["a" /* QuestionProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_notifications__["a" /* NotificationProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_api_userQuestionProvider__["a" /* UserQuestionProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */]])
    ], GamePage);
    return GamePage;
}());

//# sourceMappingURL=game.js.map

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(13);
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



var QuestionProvider = (function () {
    function QuestionProvider(http, config) {
        this.http = http;
        this.config = config;
        this.requestJsonOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json'
            })
        });
    }
    QuestionProvider.prototype.getRandomQuestion = function (id, token) {
        this.requestJsonOptions.headers.set('X-Auth-Token', token);
        return this.http.get(this.config.apiEndpoint + '/private/questions/user/' + id + '/random', this.requestJsonOptions).timeout(this.config.defaultTimeoutTime);
    };
    QuestionProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_2__app_app_config__["c" /* ApplicationConfig */]])
    ], QuestionProvider);
    return QuestionProvider;
}());

//# sourceMappingURL=questionProvider.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserQuestionProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(13);
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



var UserQuestionProvider = (function () {
    function UserQuestionProvider(http, config) {
        this.http = http;
        this.config = config;
        this.requestJsonOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json'
            })
        });
    }
    UserQuestionProvider.prototype.saveUserReply = function (user_id, question_id, reply_id, token) {
        this.requestJsonOptions.headers.set('X-Auth-Token', token);
        return this.http.post(this.config.apiEndpoint + '/private/userQuestions/' + question_id + '/user/' + user_id + '/reply/' + reply_id, null, this.requestJsonOptions).timeout(this.config.defaultTimeoutTime);
    };
    UserQuestionProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_2__app_app_config__["c" /* ApplicationConfig */]])
    ], UserQuestionProvider);
    return UserQuestionProvider;
}());

//# sourceMappingURL=userQuestionProvider.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return recycleItemInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_session__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_api_recycleItemsProvider__ = __webpack_require__(90);
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
    function recycleItemInfoPage(navParams, sessionProvider, recycleItemsProvider) {
        this.navParams = navParams;
        this.sessionProvider = sessionProvider;
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
    recycleItemInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recycleItemInfo',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile_recycledItems/profile_recycledItems_info/recycleItemInfo.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Detalles del reciclaje</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div *ngIf="recycleItem != null;else recycleItemsNotFound">\n        <ion-card *ngIf="recycleItem" style="height: 100%;">\n            <ion-card-header>{{ recycleItem.name }}</ion-card-header>\n            <img [src]="recycleItem.image" onError="this.src = \'assets/imgs/quieroReciclar.png\'" style="max-height: 75%;" />\n            <ion-card-content>\n                <p>Tipo: {{ recycleItem.itemType.typeEs }}</p>\n                <p>Reciclado el: {{ recycleItem.createdDate | date: \'dd/MM/yyyy H:mm\'}}</p>\n            </ion-card-content>\n        </ion-card>\n    </div>\n</ion-content>\n\n<ng-template #recycleItemsNotFound>\n    <ion-row align-items-center text-center style="height: 100%">\n        <ion-col>\n            <div *ngIf="showLoadingMsg == true; else showLoadingResult">\n                <h5>Cargando...</h5>\n            </div>\n            <ng-template #showLoadingResult>\n                <div *ngIf="errorLoadingContent == true; else showNoRecycledItemFound">\n                    <div>\n                        <p>Ha habido algún problema</p>\n                        <h5 style="font-weight: bold">Intentalo de nuevo en unos minutos</h5>\n                    </div>\n                </div>\n                <ng-template #showNoRecycledItemFound>\n                    <div>\n                        <p>Todavía no has reciclado nada</p>\n                        <h5 style="font-weight: bold">¡A qué esperas!</h5>\n                    </div>\n                </ng-template>\n            </ng-template>\n        </ion-col>\n    </ion-row>\n</ng-template>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile_recycledItems/profile_recycledItems_info/recycleItemInfo.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_api_recycleItemsProvider__["a" /* RecycleItemsProvider */]])
    ], recycleItemInfoPage);
    return recycleItemInfoPage;
}());

//# sourceMappingURL=recycleItemInfo.js.map

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CollectiveProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(13);
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



var CollectiveProvider = (function () {
    function CollectiveProvider(http, config) {
        this.http = http;
        this.config = config;
        this.requestJsonOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json'
            })
        });
    }
    CollectiveProvider.prototype.getAllCollectives = function () {
        return this.http.get(this.config.apiEndpoint + '/collectives', this.requestJsonOptions).timeout(this.config.defaultTimeoutTime);
    };
    CollectiveProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_2__app_app_config__["c" /* ApplicationConfig */]])
    ], CollectiveProvider);
    return CollectiveProvider;
}());

//# sourceMappingURL=collectiveProvider.js.map

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(391);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(732);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_index__ = __webpack_require__(733);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_crop__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_config__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_file__ = __webpack_require__(740);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_transfer__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_file_path__ = __webpack_require__(741);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_camera__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_location_accuracy__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_google_maps__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers__ = __webpack_require__(742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_keyboard__ = __webpack_require__(383);
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
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/tabs/tabs.module#TabsModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_9__angular_http__["c" /* HttpModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_index__["a" /* APP_PAGES */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_19__providers__["a" /* APP_PROVIDERS */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__["a" /* Facebook */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicErrorHandler */] },
                { provide: __WEBPACK_IMPORTED_MODULE_11__app_config__["b" /* APP_CONFIG_TOKEN */], useValue: __WEBPACK_IMPORTED_MODULE_11__app_config__["a" /* APP_CONFIG */] },
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_transfer__["a" /* Transfer */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_file_path__["a" /* FilePath */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_google_maps__["a" /* GoogleMaps */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_crop__["a" /* Crop */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_keyboard__["a" /* Keyboard */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recycle_recycle__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_profile__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ranking_ranking__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__game_game__ = __webpack_require__(339);
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
    function TabsPage(events) {
        var _this = this;
        this.events = events;
        this.tabHomeRoot = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tabGameRoot = __WEBPACK_IMPORTED_MODULE_6__game_game__["a" /* GamePage */];
        this.tabRecycleRoot = __WEBPACK_IMPORTED_MODULE_1__recycle_recycle__["a" /* RecyclePage */];
        this.tabRankingRoot = __WEBPACK_IMPORTED_MODULE_5__ranking_ranking__["a" /* RankingPage */];
        this.tabProfileRoot = __WEBPACK_IMPORTED_MODULE_2__profile_profile__["a" /* ProfilePage */];
        this.tabProfileRootParams = { profileSegment: "profile" };
        this.events.subscribe('change-tab', function (tabName, profileSegment) {
            if (profileSegment === void 0) { profileSegment = ''; }
            if (profileSegment != '') {
                _this.tabProfileRootParams.profileSegment = profileSegment;
            }
            var tab = 0;
            switch (tabName) {
                case "home":
                    tab = 0;
                    break;
                case "game":
                    tab = 1;
                    break;
                case "recycle":
                    tab = 2;
                    break;
                case "ranking":
                    tab = 3;
                    break;
                case "profile":
                    tab = 4;
                    break;
            }
            _this.tabs.select(tab);
        });
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["o" /* Tabs */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["o" /* Tabs */])
    ], TabsPage.prototype, "tabs", void 0);
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/tabs/tabs.html"*/'<ion-tabs icon-only>\n    <ion-tab [root]="tabHomeRoot" tabTitle="Inicio" tabIcon="home"></ion-tab>\n    <ion-tab [root]="tabGameRoot" tabTitle="Jugar" tabIcon="md-game-controller-b"></ion-tab>\n    <ion-tab [root]="tabRecycleRoot" tabTitle="Reciclar!" tabIcon="reciclaUA-recyle"></ion-tab>\n    <ion-tab [root]="tabRankingRoot" tabTitle="Ranking" tabIcon="md-trophy"></ion-tab>\n    <ion-tab [root]="tabProfileRoot" [rootParams]="tabProfileRootParams" tabTitle="Perfil" tabIcon="contact"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* Events */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EncryptProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jssha__ = __webpack_require__(703);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jssha___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jssha__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EncryptProvider = (function () {
    function EncryptProvider() {
    }
    EncryptProvider.prototype.encryptPassword = function (password) {
        var shaObj = new __WEBPACK_IMPORTED_MODULE_1_jssha___default.a("SHA-256", "TEXT");
        shaObj.update(password);
        var hash = shaObj.getHash("HEX");
        return hash;
    };
    EncryptProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], EncryptProvider);
    return EncryptProvider;
}());

//# sourceMappingURL=encryptProvider.js.map

/***/ }),

/***/ 696:
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

/***/ 700:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LabelResponseWithImage; });
var LabelResponseWithImage = (function () {
    function LabelResponseWithImage(labelAnnotations, base64Image) {
        this.labelAnnotations = labelAnnotations;
        this.base64Image = base64Image;
    }
    return LabelResponseWithImage;
}());

//# sourceMappingURL=labelResponseWithImage.js.map

/***/ }),

/***/ 701:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LabelResponse; });
var LabelResponse = (function () {
    function LabelResponse(description, score) {
        this.description = description;
        this.score = score;
    }
    return LabelResponse;
}());

//# sourceMappingURL=labelResponse.js.map

/***/ }),

/***/ 702:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecycleItem; });
var RecycleItem = (function () {
    function RecycleItem() {
        this.id = null;
        this.name = '';
        this.image = null;
        this.createdDate = new Date();
    }
    return RecycleItem;
}());

//# sourceMappingURL=recycleItem.js.map

/***/ }),

/***/ 704:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyMail; });
var MyMail = (function () {
    function MyMail() {
    }
    return MyMail;
}());

//# sourceMappingURL=myMail.js.map

/***/ }),

/***/ 732:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_status_bar__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_session__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_platform_platform__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_keyboard__ = __webpack_require__(383);
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
    function MyApp(platform, statusBar, splashScreen, sessionProvider, keyboard) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.sessionProvider = sessionProvider;
        this.keyboard = keyboard;
        this.sessionProvider.getSession().then(function (res) {
            if (res == null) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__["a" /* TabsPage */];
            }
        });
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.keyboard.onKeyboardShow().subscribe(function () {
                document.body.classList.add('keyboard-is-open');
            });
            _this.keyboard.onKeyboardHide().subscribe(function () {
                document.body.classList.remove('keyboard-is-open');
            });
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular_platform_platform__["a" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_keyboard__["a" /* Keyboard */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 733:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_PAGES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__recycle_recycle__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__profile_profile__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__profile_profile_recycledItems_myRecycledItems__ = __webpack_require__(734);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__recycle_recycle_map_recycleMap__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__recycle_recycle_map_popover_map_popoverMap__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__profile_profile_recycledItems_profile_recycledItems_info_recycleItemInfo__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__login_normalLogin_normalLogin__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__login_normalRegister_normalRegister__ = __webpack_require__(735);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__profile_profile_edit_profileEdit__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__profile_profile_edit_profile_edit_password_profileEditPassword__ = __webpack_require__(737);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ranking_ranking__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__game_game__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__profile_profile_edit_profile_edit_others_profileEditOthers__ = __webpack_require__(738);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__login_normalLogin_recoverPasswordGenCode_recoverPasswordGenCode__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__login_normalLogin_recoverPasswordGenCode_recoverPassword_recoverPassword__ = __webpack_require__(739);


















var APP_PAGES = [
    __WEBPACK_IMPORTED_MODULE_0__recycle_recycle__["a" /* RecyclePage */],
    __WEBPACK_IMPORTED_MODULE_1__profile_profile__["a" /* ProfilePage */],
    __WEBPACK_IMPORTED_MODULE_8__profile_profile_recycledItems_profile_recycledItems_info_recycleItemInfo__["a" /* recycleItemInfoPage */],
    __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */],
    __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */],
    __WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */],
    __WEBPACK_IMPORTED_MODULE_5__profile_profile_recycledItems_myRecycledItems__["a" /* myRecycledItemsPage */],
    __WEBPACK_IMPORTED_MODULE_6__recycle_recycle_map_recycleMap__["a" /* MapPage */],
    __WEBPACK_IMPORTED_MODULE_7__recycle_recycle_map_popover_map_popoverMap__["a" /* PopoverMap */],
    __WEBPACK_IMPORTED_MODULE_9__login_normalLogin_normalLogin__["a" /* NormalLoginPage */],
    __WEBPACK_IMPORTED_MODULE_10__login_normalRegister_normalRegister__["a" /* NormalRegisterPage */],
    __WEBPACK_IMPORTED_MODULE_11__profile_profile_edit_profileEdit__["a" /* ProfileEditPage */],
    __WEBPACK_IMPORTED_MODULE_12__profile_profile_edit_profile_edit_password_profileEditPassword__["a" /* ProfileEditPasswordPage */],
    __WEBPACK_IMPORTED_MODULE_13__ranking_ranking__["a" /* RankingPage */],
    __WEBPACK_IMPORTED_MODULE_14__game_game__["a" /* GamePage */],
    __WEBPACK_IMPORTED_MODULE_15__profile_profile_edit_profile_edit_others_profileEditOthers__["a" /* ProfileEditOthersPage */],
    __WEBPACK_IMPORTED_MODULE_16__login_normalLogin_recoverPasswordGenCode_recoverPasswordGenCode__["a" /* RecoverPasswordGenCodePage */],
    __WEBPACK_IMPORTED_MODULE_17__login_normalLogin_recoverPasswordGenCode_recoverPassword_recoverPassword__["a" /* RecoverPasswordPage */]
];
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 734:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return myRecycledItemsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_config__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_session__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profile_recycledItems_info_recycleItemInfo__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_api_userProvider__ = __webpack_require__(27);
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
            if (error.status != 404) {
                _this.errorLoadingContent = true;
            }
        });
    }
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
                if (error.status == 404) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__profile_recycledItems_info_recycleItemInfo__["a" /* recycleItemInfoPage */], {
            recycleItemId: id
        });
    };
    myRecycledItemsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-myRecycledItems',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile_recycledItems/myRecycledItems.html"*/'<ion-grid style="height: 100%">\n\n    <div *ngIf="recycleItems?.length > 0;else recycleItemsNotFound">\n        <ion-row justify-content-center align-items-center style="height: 100%">\n            <ion-col>\n                <div *ngFor="let recycleItem of recycleItems">\n                    <ion-card (tap)="showRecycleItemInfo(recycleItem.id)">\n                        <ion-item class="recycleItemIonItem">\n                            <ion-avatar item-start>\n                                <img src="{{recycleItem.image}}" onError="this.src = \'assets/imgs/quieroReciclar.png\'">\n                            </ion-avatar>\n                            {{recycleItem.name}}\n                            <p>{{ recycleItem.itemType.typeEs }} - {{ recycleItem.createdDate | date: \'dd/MM/yyyy H:mm\'}}\n                            </p>\n                        </ion-item>\n                    </ion-card>\n                </div>\n                <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="page < totalPages">\n                    <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Cargando más datos..."></ion-infinite-scroll-content>\n                </ion-infinite-scroll>\n            </ion-col>\n        </ion-row>\n    </div>\n\n</ion-grid>\n\n<ng-template #recycleItemsNotFound>\n    <ion-row align-items-center text-center style="height: 100%">\n        <ion-col>\n            <div *ngIf="showLoadingMsg == true; else showLoadingResult">\n                <h5>Cargando...</h5>\n            </div>\n            <ng-template #showLoadingResult>\n                <div *ngIf="errorLoadingContent == true; else showNoRecycledItemsFound">\n                    <div>\n                        <p>Ha habido algún problema</p>\n                        <h5 style="font-weight: bold">Intentalo de nuevo en unos minutos</h5>\n                    </div>\n                </div>\n                <ng-template #showNoRecycledItemsFound>\n                    <div>\n                        <p>Todavía no has reciclado nada</p>\n                        <h5 style="font-weight: bold">¡A qué esperas!</h5>\n                    </div>\n                </ng-template>\n            </ng-template>\n        </ion-col>\n    </ion-row>\n</ng-template>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile_recycledItems/myRecycledItems.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__app_app_config__["c" /* ApplicationConfig */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_api_userProvider__["a" /* UserProvider */]])
    ], myRecycledItemsPage);
    return myRecycledItemsPage;
}());

//# sourceMappingURL=myRecycledItems.js.map

/***/ }),

/***/ 735:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NormalRegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_userProvider__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_notifications__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_user__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_uuid__ = __webpack_require__(736);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular2_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_config__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_session__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__tabs_tabs__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_encryptProvider__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__models_typeUser__ = __webpack_require__(93);
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












var NormalRegisterPage = (function () {
    function NormalRegisterPage(app, formBuilder, userProvider, notificationProvider, loadingCtrl, config, sessionProvider, encryptProvider) {
        this.app = app;
        this.formBuilder = formBuilder;
        this.userProvider = userProvider;
        this.notificationProvider = notificationProvider;
        this.loadingCtrl = loadingCtrl;
        this.config = config;
        this.sessionProvider = sessionProvider;
        this.encryptProvider = encryptProvider;
        this.onRegisterFinishEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.registerForm = this.formBuilder.group({
            email: [''],
            password: [''],
            password_repeat: [''],
        }, {
            validator: [NormalRegisterPage_1.MatchPassword, NormalRegisterPage_1.EmailIsValid]
        });
    }
    NormalRegisterPage_1 = NormalRegisterPage;
    NormalRegisterPage.prototype.ionViewDidLoad = function () {
    };
    NormalRegisterPage.prototype.register_Button = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Cargando...'
        });
        this.loading.present();
        var emailForm = this.registerForm.get("email");
        var passwordForm = this.registerForm.get("password");
        var password = this.encryptProvider.encryptPassword(passwordForm.value);
        var uuid = __WEBPACK_IMPORTED_MODULE_6_angular2_uuid__["UUID"].UUID();
        var user = new __WEBPACK_IMPORTED_MODULE_5__models_user__["a" /* User */]();
        user.email = emailForm.value;
        user.password = password;
        user.fullName = 'Mi nombre';
        user.accessToken = uuid.toString();
        user.type = __WEBPACK_IMPORTED_MODULE_11__models_typeUser__["a" /* TypeUser */].Normal;
        this.userProvider.createUser(user).subscribe(function (res) {
            _this.loading.dismiss();
            if (res.status == 201) {
                _this.notificationProvider.presentAlertOk("¡El usuario ha sido creado correctamente!");
                user = res.json();
                _this.sessionProvider.updateSession(user);
                _this.app.getRootNavs()[0].setRoot(__WEBPACK_IMPORTED_MODULE_9__tabs_tabs__["a" /* TabsPage */]);
            }
            else {
                _this.notificationProvider.presentAlertError('El usuario no ha podido ser creado.');
            }
        }, function (error) {
            _this.loading.dismiss();
            if (error.status == 409) {
                _this.notificationProvider.presentAlertError("Ya existe un usuario con dicho correo.");
            }
            else {
                _this.notificationProvider.presentAlertError(_this.config.defaultTimeoutMsg);
            }
        });
    };
    NormalRegisterPage.prototype.goToLogin_Button = function () {
        this.onRegisterFinishEvent.emit('login');
    };
    NormalRegisterPage.MatchPassword = function (control) {
        var password = control.controls.password; // to get value in input tag
        var password_repeat = control.controls.password_repeat; // to get value in input tag
        if (password.value != '' && password_repeat.value != '') {
            if (password.value != password_repeat.value) {
                password_repeat.setErrors({ MatchPassword: true });
            }
            else {
                password_repeat.setErrors(null);
                return null;
            }
        }
    };
    NormalRegisterPage.EmailIsValid = function (control) {
        var email = control.controls.email; // to get value in input tag
        var EMAIL_REGEXP = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
        if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(email.value))) {
            email.setErrors({ EmailIsValid: true });
        }
        else {
            return null;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], NormalRegisterPage.prototype, "onRegisterFinishEvent", void 0);
    NormalRegisterPage = NormalRegisterPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-normalRegister',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/login/normalRegister/normalRegister.html"*/'<ion-grid style="height: 100%">\n    <ion-row align-items-center text-center style="height: 100%">\n        <ion-col>\n            <form [formGroup]="registerForm" (ngSubmit)="register_Button()">\n                <ion-row>\n                    <ion-col>\n                        <ion-list inset>\n\n                            <ion-item>\n                                <ion-input type="email" placeholder="Email" formControlName="email" required></ion-input>\n                            </ion-item>\n                            <ion-item>\n                                <ion-input type="password" placeholder="Contraseña" formControlName="password" required></ion-input>\n                            </ion-item>\n                            <ion-item>\n                                <ion-input type="password" placeholder="Repetir contraseña" formControlName="password_repeat" color="{{ registerForm.controls.password_repeat.errors ? \'danger\' : \'primary\' }}"\n                                    required></ion-input>\n                            </ion-item>\n                            <div align="left" style="height: 16px;">\n                                <span style="color: #d80303;" *ngIf="registerForm.controls.password_repeat.errors?.MatchPassword">Las contraseñas deben coincidir</span>\n                            </div>\n                        </ion-list>\n                    </ion-col>\n                </ion-row>\n\n                <ion-row>\n                    <ion-col class="signup-col">\n                        <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.valid">Registrarse</button>\n                    </ion-col>\n                </ion-row>\n            </form>\n        </ion-col>\n    </ion-row>\n</ion-grid>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/login/normalRegister/normalRegister.html"*/
        }),
        __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_7__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2__providers_api_userProvider__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_notifications__["a" /* NotificationProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_7__app_app_config__["c" /* ApplicationConfig */],
            __WEBPACK_IMPORTED_MODULE_8__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_10__providers_encryptProvider__["a" /* EncryptProvider */]])
    ], NormalRegisterPage);
    return NormalRegisterPage;
    var NormalRegisterPage_1;
}());

//# sourceMappingURL=normalRegister.js.map

/***/ }),

/***/ 737:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileEditPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_api_userProvider__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_notifications__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_encryptProvider__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProfileEditPasswordPage = (function () {
    function ProfileEditPasswordPage(formBuilder, loadingCtrl, userProvider, navParams, navCtrl, encryptProvider, notificationProvider) {
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.userProvider = userProvider;
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.encryptProvider = encryptProvider;
        this.notificationProvider = notificationProvider;
        this.user = this.navParams.get('user');
        this.profileEditPasswordForm = this.formBuilder.group({
            prev_password: [''],
            password: [''],
            password_repeat: [''],
        }, {
            validator: ProfileEditPasswordPage_1.MatchPassword
        });
    }
    ProfileEditPasswordPage_1 = ProfileEditPasswordPage;
    ProfileEditPasswordPage.prototype.ionViewDidLoad = function () {
    };
    ProfileEditPasswordPage.prototype.editPassword_Button = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Guardando usuario...'
        });
        this.loading.present();
        var prev_password = this.profileEditPasswordForm.get("prev_password").value;
        prev_password = this.encryptProvider.encryptPassword(prev_password);
        if (this.user.password == null) {
            this.changePassword();
        }
        else {
            this.userProvider.login(this.user).subscribe(function (res) {
                _this.changePassword(prev_password);
            }, function (error) {
                if (error.status == 403) {
                    _this.loading.dismiss();
                    _this.notificationProvider.presentAlertError("La contraseña actual no es correcta.");
                }
                else {
                    _this.loading.dismiss();
                    _this.notificationProvider.presentTopToast("Error, no se ha podido guardar la contraseña.");
                }
            });
        }
    };
    ProfileEditPasswordPage.prototype.changePassword = function (prev_password) {
        var _this = this;
        if (prev_password === void 0) { prev_password = ""; }
        var password = this.profileEditPasswordForm.get("password").value;
        this.user.password = this.encryptProvider.encryptPassword(password);
        this.userProvider.saveUser(this.user, this.user.accessToken, prev_password).subscribe(function (res) {
            _this.notificationProvider.presentTopToast("La contraseña ha sido modificada correctamente!");
            _this.navCtrl.pop();
            _this.loading.dismiss();
        }, function (error) {
            _this.loading.dismiss();
            _this.notificationProvider.presentTopToast("Error, no se ha podido guardar la contraseña.");
        });
    };
    ProfileEditPasswordPage.MatchPassword = function (control) {
        var password = control.controls.password; // to get value in input tag
        var password_repeat = control.controls.password_repeat; // to get value in input tag
        if (password.value != '' && password_repeat.value != '') {
            if (password.value != password_repeat.value) {
                password_repeat.setErrors({ MatchPassword: true });
            }
            else {
                password_repeat.setErrors(null);
                return null;
            }
        }
    };
    ProfileEditPasswordPage = ProfileEditPasswordPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profileEditPassword',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile_edit/profile_edit_password/profileEditPassword.html"*/'<ion-grid style="height: 100%">\n    <ion-row align-items-center text-center style="height: 100%">\n        <ion-col>\n            <form [formGroup]="profileEditPasswordForm" (ngSubmit)="editPassword_Button()">\n                <ion-row>\n                    <ion-col>\n                        <ion-list inset>\n\n                            <ion-item *ngIf="user.password != null">\n                                <ion-input type="password" placeholder="Contraseña actual" formControlName="prev_password" required></ion-input>\n                            </ion-item>\n                            <ion-item>\n                                <ion-input type="password" placeholder="Nueva contraseña" formControlName="password" required></ion-input>\n                            </ion-item>\n                            <ion-item>\n                                <ion-input type="password" placeholder="Repetir contraseña" formControlName="password_repeat" color="{{ profileEditPasswordForm.controls.password_repeat.errors ? \'danger\' : \'primary\' }}"\n                                    required></ion-input>\n                            </ion-item>\n                            <div align="left" style="height: 16px;">\n                                <span style="color: #d80303;" *ngIf="profileEditPasswordForm.controls.password_repeat.errors?.MatchPassword">Las contraseñas deben coincidir</span>\n                            </div>\n                        </ion-list>\n                    </ion-col>\n                </ion-row>\n\n                <ion-row>\n                    <ion-col class="signup-col">\n                        <button ion-button class="submit-btn" full type="submit" [disabled]="!profileEditPasswordForm.valid">Modificar contraseña</button>\n                    </ion-col>\n                </ion-row>\n            </form>\n        </ion-col>\n    </ion-row>\n</ion-grid>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile_edit/profile_edit_password/profileEditPassword.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_api_userProvider__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_encryptProvider__["a" /* EncryptProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_notifications__["a" /* NotificationProvider */]])
    ], ProfileEditPasswordPage);
    return ProfileEditPasswordPage;
    var ProfileEditPasswordPage_1;
}());

//# sourceMappingURL=profileEditPassword.js.map

/***/ }),

/***/ 738:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileEditOthersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_api_userProvider__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_notifications__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_api_collectiveProvider__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_util_util__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProfileEditOthersPage = (function () {
    function ProfileEditOthersPage(formBuilder, loadingCtrl, userProvider, navParams, navCtrl, notificationProvider, collectiveProvider) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.userProvider = userProvider;
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.notificationProvider = notificationProvider;
        this.collectiveProvider = collectiveProvider;
        this.collectives = [];
        this.user = this.navParams.get('user');
        var birthDate = new Date().toISOString();
        if (this.user.birthdate != null) {
            birthDate = this.user.birthdate.toString();
        }
        this.profileEditOthersForm = this.formBuilder.group({
            collective: [this.user.collective.id],
            birthdate: [birthDate],
            school: [this.user.school],
            gender: [this.user.gender],
        }, {});
        this.collectiveProvider.getAllCollectives().subscribe(function (res) {
            _this.collectives = res.json();
        });
    }
    ProfileEditOthersPage.prototype.editPassword_Button = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Guardando usuario...'
        });
        this.loading.present();
        var collective = this.profileEditOthersForm.get("collective").value;
        var birthdate = this.profileEditOthersForm.get("birthdate").value;
        var gender = this.profileEditOthersForm.get("gender").value;
        var school = this.profileEditOthersForm.get("school").value;
        if (Object(__WEBPACK_IMPORTED_MODULE_6_ionic_angular_util_util__["j" /* isNumber */])(collective)) {
            this.user.collective = this.collectives.filter(function (e) { return e.id === collective; })[0];
        }
        if (gender != null && gender != '') {
            this.user.gender = gender;
        }
        this.user.school = school;
        if (birthdate != null && birthdate != '') {
            var date = new Date(birthdate);
            if (date != null) {
                this.user.birthdate = date.toISOString();
            }
        }
        this.userProvider.saveUser(this.user, this.user.accessToken).subscribe(function (res) {
            _this.notificationProvider.presentTopToast("El usuario ha sido modificado correctamente!");
            _this.navCtrl.pop();
            _this.loading.dismiss();
        }, function (error) {
            _this.loading.dismiss();
            _this.notificationProvider.presentTopToast("Error, no se ha podido guardar el usuario.");
        });
    };
    ProfileEditOthersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profileEditOthers',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile_edit/profile_edit_others/profileEditOthers.html"*/'<ion-grid style="height: 100%">\n    <ion-row align-items-center text-center style="height: 100%">\n        <ion-col>\n            <form [formGroup]="profileEditOthersForm" (ngSubmit)="editPassword_Button()">\n                <ion-row>\n                    <ion-col>\n                        <ion-list inset>\n                            <ion-item>\n                                <ion-label>Colectivo</ion-label>\n                                <ion-select formControlName="collective">\n                                    <ion-option *ngFor="let col of collectives" [value]="col.id">\n                                        {{col.name}}\n                                    </ion-option>\n                                </ion-select>\n                            </ion-item>\n                            <ion-item>\n                                <ion-label>Fecha de nacimiento</ion-label>\n                                <ion-datetime displayFormat="MM/DD/YYYY" formControlName="birthdate"></ion-datetime>\n                            </ion-item>\n                            <ion-item>\n                                <ion-input type="text" placeholder="Escuela / Facultad" formControlName="school"></ion-input>\n                            </ion-item>\n                            <ion-item>\n                                <ion-label>Género</ion-label>\n                                <ion-select formControlName="gender">\n                                    <ion-option value="Masculino">Masculino</ion-option>\n                                    <ion-option value="Femenino">Femenino</ion-option>\n                                    <ion-option value="NSNC">Otro</ion-option>\n                                </ion-select>\n                            </ion-item>\n                        </ion-list>\n                    </ion-col>\n                </ion-row>\n\n                <ion-row>\n                    <ion-col class="signup-col">\n                        <button ion-button class="submit-btn" full type="submit" [disabled]="!profileEditOthersForm.valid">Modificar datos</button>\n                    </ion-col>\n                </ion-row>\n            </form>\n        </ion-col>\n    </ion-row>\n</ion-grid>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/profile/profile_edit/profile_edit_others/profileEditOthers.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_api_userProvider__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_notifications__["a" /* NotificationProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_api_collectiveProvider__["a" /* CollectiveProvider */]])
    ], ProfileEditOthersPage);
    return ProfileEditOthersPage;
}());

//# sourceMappingURL=profileEditOthers.js.map

/***/ }),

/***/ 739:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecoverPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_api_userProvider__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_notifications__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_config__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_session__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_encryptProvider__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_user__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__tabs_tabs__ = __webpack_require__(50);
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










var RecoverPasswordPage = (function () {
    function RecoverPasswordPage(app, formBuilder, userProvider, notificationProvider, loadingCtrl, config, sessionProvider, encryptProvider) {
        this.app = app;
        this.formBuilder = formBuilder;
        this.userProvider = userProvider;
        this.notificationProvider = notificationProvider;
        this.loadingCtrl = loadingCtrl;
        this.config = config;
        this.sessionProvider = sessionProvider;
        this.encryptProvider = encryptProvider;
        this.onRegisterFinishEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.registerForm = this.formBuilder.group({
            email: [''],
            code: [''],
            password: [''],
            password_repeat: [''],
        }, {
            validator: [RecoverPasswordPage_1.MatchPassword, RecoverPasswordPage_1.EmailIsValid]
        });
    }
    RecoverPasswordPage_1 = RecoverPasswordPage;
    RecoverPasswordPage.prototype.ionViewDidLoad = function () {
    };
    RecoverPasswordPage.prototype.recoverAccount_Button = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Cargando...'
        });
        this.loading.present();
        var emailForm = this.registerForm.get("email");
        var codeForm = this.registerForm.get("code");
        var passwordForm = this.registerForm.get("password");
        var password = this.encryptProvider.encryptPassword(passwordForm.value);
        var user = new __WEBPACK_IMPORTED_MODULE_8__models_user__["a" /* User */]();
        user.email = emailForm.value;
        user.password = password;
        user.resetPwdCode = codeForm.value;
        this.userProvider.recoverUser(user).subscribe(function (res) {
            _this.loading.dismiss();
            _this.notificationProvider.presentAlertOk("Los datos son correctos!");
            user = res.json();
            _this.sessionProvider.updateSession(user);
            _this.app.getRootNavs()[0].setRoot(__WEBPACK_IMPORTED_MODULE_9__tabs_tabs__["a" /* TabsPage */]);
        }, function (error) {
            _this.loading.dismiss();
            var errorMsg = _this.config.defaultTimeoutMsg;
            switch (error.status) {
                case 401:
                    errorMsg = "El código y/o el correo no son correctos";
                    break;
                case 410:
                    errorMsg = "El código introducido ya no es válido, debes crear uno nuevo.";
                    break;
                case 404:
                    errorMsg = "Dicho usuario no existe";
                    break;
            }
            _this.notificationProvider.presentAlertError(errorMsg);
        });
    };
    RecoverPasswordPage.prototype.goToLogin_Button = function () {
        this.onRegisterFinishEvent.emit('login');
    };
    RecoverPasswordPage.MatchPassword = function (control) {
        var password = control.controls.password; // to get value in input tag
        var password_repeat = control.controls.password_repeat; // to get value in input tag
        if (password.value != '' && password_repeat.value != '') {
            if (password.value != password_repeat.value) {
                password_repeat.setErrors({ MatchPassword: true });
            }
            else {
                password_repeat.setErrors(null);
                return null;
            }
        }
    };
    RecoverPasswordPage.EmailIsValid = function (control) {
        var email = control.controls.email; // to get value in input tag
        var EMAIL_REGEXP = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
        if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(email.value))) {
            email.setErrors({ EmailIsValid: true });
        }
        else {
            return null;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], RecoverPasswordPage.prototype, "onRegisterFinishEvent", void 0);
    RecoverPasswordPage = RecoverPasswordPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recoverPassword',template:/*ion-inline-start:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/login/normalLogin/recoverPasswordGenCode/recoverPassword/recoverPassword.html"*/'<ion-grid style="height: 100%">\n    <ion-row align-items-center text-center style="height: 100%">\n        <ion-col>\n            <form [formGroup]="registerForm" (ngSubmit)="recoverAccount_Button()">\n                <ion-row>\n                    <ion-col>\n                        <ion-list inset>\n\n                            <ion-item>\n                                <ion-input type="email" placeholder="Email" formControlName="email" required></ion-input>\n                            </ion-item>\n                            <ion-item>\n                                <ion-input type="text" placeholder="Código" formControlName="code" required></ion-input>\n                            </ion-item>\n                            <ion-item>\n                                <ion-input type="password" placeholder="Nueva contraseña" formControlName="password" required></ion-input>\n                            </ion-item>\n                            <ion-item>\n                                <ion-input type="password" placeholder="Repetir contraseña" formControlName="password_repeat" color="{{ registerForm.controls.password_repeat.errors ? \'danger\' : \'primary\' }}"\n                                    required></ion-input>\n                            </ion-item>\n                            <div align="left" style="height: 16px;">\n                                <span style="color: #d80303;" *ngIf="registerForm.controls.password_repeat.errors?.MatchPassword">Las contraseñas deben coincidir</span>\n                            </div>\n                        </ion-list>\n                    </ion-col>\n                </ion-row>\n\n                <ion-row>\n                    <ion-col class="signup-col">\n                        <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.valid">Registrarse</button>\n                    </ion-col>\n                </ion-row>\n            </form>\n        </ion-col>\n    </ion-row>\n</ion-grid>'/*ion-inline-end:"/Users/albertoricogarcia/Documents/workspace/reciclaWeb/reciclaClient/src/pages/login/normalLogin/recoverPasswordGenCode/recoverPassword/recoverPassword.html"*/
        }),
        __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_5__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__providers_api_userProvider__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_notifications__["a" /* NotificationProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__app_app_config__["c" /* ApplicationConfig */],
            __WEBPACK_IMPORTED_MODULE_6__providers_session__["a" /* SessionProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_encryptProvider__["a" /* EncryptProvider */]])
    ], RecoverPasswordPage);
    return RecoverPasswordPage;
    var RecoverPasswordPage_1;
}());

//# sourceMappingURL=recoverPassword.js.map

/***/ }),

/***/ 742:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_PROVIDERS; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__session__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notifications__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__google__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_userProvider__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_recycleItemsProvider__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__encryptProvider__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__instagramProvider__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__api_itemTypeProvider__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__api_storagesProvider__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__api_questionProvider__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__api_userQuestionProvider__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__api_collectiveProvider__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__api_tipProvider__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__fileProvider__ = __webpack_require__(91);















var APP_PROVIDERS = [
    __WEBPACK_IMPORTED_MODULE_0__session__["a" /* SessionProvider */],
    __WEBPACK_IMPORTED_MODULE_1__notifications__["a" /* NotificationProvider */],
    __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* UtilsProvider */],
    __WEBPACK_IMPORTED_MODULE_3__google__["a" /* GoogleCloudServiceProvider */],
    __WEBPACK_IMPORTED_MODULE_4__api_userProvider__["a" /* UserProvider */],
    __WEBPACK_IMPORTED_MODULE_5__api_recycleItemsProvider__["a" /* RecycleItemsProvider */],
    __WEBPACK_IMPORTED_MODULE_6__encryptProvider__["a" /* EncryptProvider */],
    __WEBPACK_IMPORTED_MODULE_7__instagramProvider__["a" /* InstagramProvider */],
    __WEBPACK_IMPORTED_MODULE_9__api_storagesProvider__["a" /* StoragesProvider */],
    __WEBPACK_IMPORTED_MODULE_8__api_itemTypeProvider__["a" /* ItemTypeProvider */],
    __WEBPACK_IMPORTED_MODULE_10__api_questionProvider__["a" /* QuestionProvider */],
    __WEBPACK_IMPORTED_MODULE_11__api_userQuestionProvider__["a" /* UserQuestionProvider */],
    __WEBPACK_IMPORTED_MODULE_12__api_collectiveProvider__["a" /* CollectiveProvider */],
    __WEBPACK_IMPORTED_MODULE_13__api_tipProvider__["a" /* TipProvider */],
    __WEBPACK_IMPORTED_MODULE_14__fileProvider__["a" /* FileProvider */]
];
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecycleItemsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(13);
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
    RecycleItemsProvider.prototype.saveRecycleItem = function (recycleItem, token) {
        recycleItem.itemType = recycleItem.itemType.id;
        this.requestJsonOptions.headers.set('X-Auth-Token', token);
        return this.http.post(this.config.apiEndpoint + "/private/recycleItems", JSON.stringify(recycleItem), this.requestJsonOptions).timeout(this.config.defaultTimeoutTime);
    };
    RecycleItemsProvider.prototype.getRecycleItemById = function (id, token) {
        this.requestJsonOptions.headers.set('X-Auth-Token', token);
        return this.http.get(this.config.apiEndpoint + "/private/recycleItems/" + id, this.requestJsonOptions).timeout(this.config.defaultTimeoutTime);
    };
    RecycleItemsProvider.prototype.getLatestRecycleItems = function (page, perPage) {
        return this.http.get(this.config.apiEndpoint + "/recycleItems/latest?page=" + page + "&perPage=" + perPage).timeout(this.config.defaultTimeoutTime);
    };
    RecycleItemsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_2__app_app_config__["c" /* ApplicationConfig */]])
    ], RecycleItemsProvider);
    return RecycleItemsProvider;
}());

//# sourceMappingURL=recycleItemsProvider.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_crop__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_transfer__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_config__ = __webpack_require__(13);
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







var FileProvider = (function () {
    function FileProvider(config, camera, platform, crop, transfer) {
        this.config = config;
        this.camera = camera;
        this.platform = platform;
        this.crop = crop;
        this.transfer = transfer;
        this.recycleItemImagesFolder = "/uploads/";
        this.avatarsFolder = "/uploads/avatars/";
    }
    FileProvider.prototype.toBase64 = function (url) {
        return new Promise(function (resolve) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function () {
                var reader = new FileReader();
                reader.onloadend = function () {
                    resolve(reader.result);
                };
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.send();
        });
    };
    FileProvider.prototype.takePicture = function (sourceType) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var options = {
                quality: 100,
                sourceType: sourceType,
                saveToPhotoAlbum: false,
                correctOrientation: true,
                targetWidth: 900,
                targetHeight: 900,
                encodingType: _this.camera.EncodingType.PNG,
                mediaType: _this.camera.MediaType.PICTURE,
                destinationType: _this.camera.DestinationType.FILE_URI // Return image file URI
            };
            // Get the data of an image 
            _this.camera.getPicture(options).then(function (imageUri) {
                if (_this.platform.is('android')) {
                    imageUri = 'file://' + imageUri;
                }
                _this.crop.crop(imageUri, { quality: 100, targetWidth: 650, targetHeight: 650 }).then(function (imagePath) {
                    _this.toBase64(imagePath).then(function (base64Image) {
                        base64Image = base64Image.substring(base64Image.indexOf(',') + 1);
                        var resArray = [];
                        resArray['base64Image'] = base64Image;
                        resArray['imagePath'] = imagePath;
                        resolve(resArray);
                    });
                }, function (error) {
                    reject(error);
                });
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    FileProvider.prototype.uploadFile = function (imagePath, fileName, urlUploadScript) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var options = {
                fileKey: "file",
                fileName: fileName,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                params: { 'fileName': fileName }
            };
            var fileTransfer = _this.transfer.create();
            _this.uploadFileWithTimeout(fileTransfer, imagePath, urlUploadScript, options).then(function (res) {
                if (res == true) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    FileProvider.prototype.uploadFileWithTimeout = function (fileTransfer, targetPath, urlUpload, options) {
        return this.timeoutPromise(this.config.defaultTimeoutTime * 2, fileTransfer.upload(targetPath, urlUpload, options).then(function (data) {
            return true;
        }, function (error) {
            return false;
        }));
    };
    FileProvider.prototype.timeoutPromise = function (timeout, promise) {
        var wrapPromise = new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject(new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["TimeoutError"]());
            }, timeout);
        });
        return Promise.race([promise, wrapPromise]);
    };
    FileProvider.prototype.convertToDataURLviaCanvas = function (url, outputFormat) {
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function () {
                var canvas = document.createElement('CANVAS'), ctx = canvas.getContext('2d'), dataURL;
                canvas.height = img.height;
                canvas.width = img.width;
                ctx.drawImage(img, 0, 0);
                dataURL = canvas.toDataURL(outputFormat);
                resolve(dataURL);
                canvas = null;
            };
            img.src = url;
        });
    };
    FileProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_6__app_app_config__["b" /* APP_CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__app_app_config__["c" /* ApplicationConfig */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_crop__["a" /* Crop */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_transfer__["a" /* Transfer */]])
    ], FileProvider);
    return FileProvider;
}());

//# sourceMappingURL=fileProvider.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__typeUser__ = __webpack_require__(93);

var User = (function () {
    function User() {
        var currentDate = new Date();
        this.id = -1;
        this.email = null;
        this.password = null;
        this.username = null;
        this.fullName = null;
        this.profilePicture = null;
        this.accessToken = null;
        this.recycleItems = [];
        this.createdDate = currentDate;
        this.lastPosition = null;
        this.type = __WEBPACK_IMPORTED_MODULE_0__typeUser__["a" /* TypeUser */].Normal;
        this.points = 0;
        this.gamePoints = 0;
        this.lastGameDate = new Date(currentDate.getTime() - (1000 * 60 * 60 * 24));
        this.questionsDone = [];
        this.enabled = true;
        this.collective = null; /* Instantiated on backend */
        this.gender = "NSNC";
        this.school = null;
        this.birthdate = new Date();
        this.resetPwdCode = null;
        this.resetPwdCodeDate = null; /* Default null */
    }
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TypeUser; });
var TypeUser;
(function (TypeUser) {
    TypeUser["Normal"] = "Normal";
    TypeUser["Facebook"] = "Facebook";
    TypeUser["Instagram"] = "Instagram";
})(TypeUser || (TypeUser = {}));
//# sourceMappingURL=typeUser.js.map

/***/ })

},[386]);
//# sourceMappingURL=main.js.map