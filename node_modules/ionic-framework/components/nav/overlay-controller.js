var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var view_controller_1 = require('../view-controller');
var OverlayController = (function (_super) {
    __extends(OverlayController, _super);
    function OverlayController(navCtrl, componentType, opts) {
        if (opts === void 0) { opts = {}; }
        _super.call(this, null, AlertCmp, opts);
        this.data.inputs = this.data.inputs || [];
        var buttons = this.data.buttons || [];
        this.data.buttons = [];
        for (var _i = 0; _i < buttons.length; _i++) {
            var button = buttons[_i];
            this.addButton(button);
        }
        this.enterAnimationKey = 'alertEnter';
        this.leaveAnimationKey = 'alertLeave';
    }
    OverlayController.prototype.setTitle = function (title) {
        this.data.title = title;
    };
    OverlayController.prototype.setSubTitle = function (subTitle) {
        this.data.subTitle = subTitle;
    };
    OverlayController.prototype.setBody = function (body) {
        this.data.body = body;
    };
    OverlayController.prototype.addInput = function (input) {
        input.value = isDefined(input.value) ? input.value : '';
        this.data.inputs.push(input);
    };
    OverlayController.prototype.addButton = function (button) {
        if (typeof button === 'string') {
            button = {
                text: button
            };
        }
        this.data.buttons.push(button);
    };
    OverlayController.prototype.close = function () {
        var index = this._nav.indexOf(this);
        this._nav.remove(index, { animateFirst: true });
    };
    OverlayController.prototype.onClose = function (handler) {
        this.data.onClose = handler;
    };
    return OverlayController;
})(view_controller_1.ViewController);
exports.OverlayController = OverlayController;