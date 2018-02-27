var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from "@angular/core";
var SearchPipe = /** @class */ (function () {
    function SearchPipe() {
    }
    SearchPipe.prototype.transform = function (value, searchChars) {
        console.log("HERE");
        return value.filter(function (item) {
            return item.name.toUpperCase().includes(searchChars.toUpperCase()) ||
                item.email.toUpperCase().includes(searchChars.toUpperCase()) ||
                item.phoneNumber.includes(searchChars);
        });
    };
    SearchPipe = __decorate([
        Pipe({
            name: "search"
        })
    ], SearchPipe);
    return SearchPipe;
}());
export { SearchPipe };
//# sourceMappingURL=search.pipe.js.map