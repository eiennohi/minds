var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var api_1 = require('src/services/api');
var material_1 = require('src/directives/material');
var infinite_scroll_1 = require('../../directives/infinite-scroll');
var activity_1 = require('./activity');
var Newsfeed = (function () {
    function Newsfeed(client) {
        this.client = client;
        this.newsfeed = [];
        this.offset = "";
        this.inProgress = false;
        this.moreData = true;
        this.postMeta = {
            title: "",
            description: "",
            thumbnail: "",
            url: "",
            active: false
        };
        this.load();
    }
    Newsfeed.prototype.load = function (refresh) {
        if (refresh === void 0) { refresh = false; }
        var self = this;
        if (this.inProgress) {
            return false;
        }
        if (refresh) {
            this.offset = "";
        }
        this.inProgress = true;
        this.client.get('api/v1/newsfeed', { limit: 12, offset: this.offset }, { cache: true })
            .then(function (data) {
            if (!data.activity) {
                self.moreData = false;
                self.inProgress = false;
                return false;
            }
            if (self.newsfeed && !refresh) {
                for (var _i = 0, _a = data.activity; _i < _a.length; _i++) {
                    var activity = _a[_i];
                    self.newsfeed.push(activity);
                }
            }
            else {
                self.newsfeed = data.activity;
            }
            self.offset = data['load-next'];
            self.inProgress = false;
        })
            .catch(function (e) {
            console.log(e);
        });
    };
    Newsfeed.prototype.post = function () {
        var self = this;
        this.client.post('api/v1/newsfeed', this.postMeta)
            .then(function (data) {
            self.load(true);
            console.log(data);
            self.postMeta = {
                message: "",
                title: "",
                description: "",
                thumbnail: "",
                url: "",
                active: false
            };
        })
            .catch(function (e) {
            console.log(e);
        });
    };
    Newsfeed.prototype.getPostPreview = function (message) {
        var _this = this;
        var self = this;
        var match = message.value.match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig);
        if (!match)
            return;
        var url;
        if (match instanceof Array) {
            url = match[0];
        }
        else {
            url = match;
        }
        if (!url.length)
            return;
        url = url.replace("http://", '');
        url = url.replace("https://", '');
        console.log('found url was ' + url);
        self.postMeta.active = true;
        if (this.timeout)
            clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            _this.client.get('api/v1/newsfeed/preview', { url: url })
                .then(function (data) {
                console.log(data);
                self.postMeta.title = data.meta.title;
                self.postMeta.url = data.meta.canonical;
                self.postMeta.description = data.meta.description;
                for (var _i = 0, _a = data.links; _i < _a.length; _i++) {
                    var link = _a[_i];
                    if (link.rel.indexOf('thumbnail') > -1) {
                        self.postMeta.thumbnail = link.href;
                    }
                }
            });
        }, 600);
    };
    Newsfeed.prototype.toDate = function (timestamp) {
        return new Date(timestamp * 1000);
    };
    Newsfeed = __decorate([
        angular2_1.Component({
            selector: 'minds-newsfeed',
            viewBindings: [api_1.Client]
        }),
        angular2_1.View({
            templateUrl: 'templates/newsfeed/list.html',
            directives: [activity_1.Activity, angular2_1.NgFor, angular2_1.NgIf, material_1.Material, angular2_1.FORM_DIRECTIVES, infinite_scroll_1.InfiniteScroll]
        }), 
        __metadata('design:paramtypes', [api_1.Client])
    ], Newsfeed);
    return Newsfeed;
})();
exports.Newsfeed = Newsfeed;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb250cm9sbGVycy9uZXdzZmVlZC9uZXdzZmVlZC50cyJdLCJuYW1lcyI6WyJOZXdzZmVlZCIsIk5ld3NmZWVkLmNvbnN0cnVjdG9yIiwiTmV3c2ZlZWQubG9hZCIsIk5ld3NmZWVkLnBvc3QiLCJOZXdzZmVlZC5nZXRQb3N0UHJldmlldyIsIk5ld3NmZWVkLnRvRGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx5QkFBNkQsbUJBQW1CLENBQUMsQ0FBQTtBQUNqRixvQkFBdUIsa0JBQWtCLENBQUMsQ0FBQTtBQUMxQyx5QkFBeUIseUJBQXlCLENBQUMsQ0FBQTtBQUNuRCxnQ0FBK0Isa0NBQWtDLENBQUMsQ0FBQTtBQUNsRSx5QkFBeUIsWUFBWSxDQUFDLENBQUE7QUFFdEM7SUF3QkNBLGtCQUFtQkEsTUFBY0E7UUFBZEMsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBUUE7UUFiakNBLGFBQVFBLEdBQW1CQSxFQUFFQSxDQUFDQTtRQUM5QkEsV0FBTUEsR0FBWUEsRUFBRUEsQ0FBQ0E7UUFDcEJBLGVBQVVBLEdBQWFBLEtBQUtBLENBQUNBO1FBQzdCQSxhQUFRQSxHQUFhQSxJQUFJQSxDQUFDQTtRQUUxQkEsYUFBUUEsR0FBR0E7WUFDVEEsS0FBS0EsRUFBRUEsRUFBRUE7WUFDVEEsV0FBV0EsRUFBRUEsRUFBRUE7WUFDZkEsU0FBU0EsRUFBRUEsRUFBRUE7WUFDYkEsR0FBR0EsRUFBRUEsRUFBRUE7WUFDUEEsTUFBTUEsRUFBRUEsS0FBS0E7U0FDZEEsQ0FBQUE7UUFHREEsSUFBSUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7SUFDYkEsQ0FBQ0E7SUFLREQsdUJBQUlBLEdBQUpBLFVBQUtBLE9BQXlCQTtRQUF6QkUsdUJBQXlCQSxHQUF6QkEsZUFBeUJBO1FBQzdCQSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUNkQSxFQUFFQSxDQUFBQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFBQSxDQUFDQTtZQUVsQkEs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LEVBQUVBLENBQUVBLFlBQU1BLENBQUVBO1NBQ3pCQSxDQUFDQTtRQUNEQSxlQUFJQSxDQUFDQTtZQUNKQSxXQUFXQSxFQUFFQSw4QkFBOEJBO1lBQzNDQSxVQUFVQSxFQUFFQSxDQUFFQSxtQkFBUUEsRUFBRUEsZ0JBQUtBLEVBQUVBLGVBQUlBLEVBQUVBLG1CQUFRQSxFQUFFQSwwQkFBZUEsRUFBRUEsZ0NBQWNBLENBQUVBO1NBQ2pGQSxDQUFDQTs7aUJBc0lEQTtJQUFEQSxlQUFDQTtBQUFEQSxDQTdJQSxBQTZJQ0EsSUFBQTtBQXBJWSxnQkFBUSxXQW9JcEIsQ0FBQSIsImZpbGUiOiJzcmMvY29udHJvbGxlcnMvbmV3c2ZlZWQvbmV3c2ZlZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXcsIE5nRm9yLCBOZ0lmLCBGT1JNX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL2FuZ3VsYXIyJztcbmltcG9ydCB7IENsaWVudCB9IGZyb20gJ3NyYy9zZXJ2aWNlcy9hcGknO1xuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tICdzcmMvZGlyZWN0aXZlcy9tYXRlcmlhbCc7XG5pbXBvcnQgeyBJbmZpbml0ZVNjcm9sbCB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvaW5maW5pdGUtc2Nyb2xsJztcbmltcG9ydCB7IEFjdGl2aXR5IH0gZnJvbSAnLi9hY3Rpdml0eSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21pbmRzLW5ld3NmZWVkJyxcbiAgdmlld0JpbmRpbmdzOiBbIENsaWVudCBdXG59KVxuQFZpZXcoe1xuICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9uZXdzZmVlZC9saXN0Lmh0bWwnLFxuICBkaXJlY3RpdmVzOiBbIEFjdGl2aXR5LCBOZ0ZvciwgTmdJZiwgTWF0ZXJpYWwsIEZPUk1fRElSRUNUSVZFUywgSW5maW5pdGVTY3JvbGwgXVxufSlcblxuZXhwb3J0IGNsYXNzIE5ld3NmZWVkIHtcblxuXHRuZXdzZmVlZCA6IEFycmF5PE9iamVjdD4gPSBbXTtcblx0b2Zmc2V0IDogc3RyaW5nID0gXCJcIjtcbiAgaW5Qcm9ncmVzcyA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgbW9yZURhdGEgOiBib29sZWFuID0gdHJ1ZTtcblxuICBwb3N0TWV0YSA9IHtcbiAgICB0aXRsZTogXCJcIixcbiAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICB0aHVtYm5haWw6IFwiXCIsXG4gICAgdXJsOiBcIlwiLFxuICAgIGFjdGl2ZTogZmFsc2VcbiAgfVxuXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBjbGllbnQ6IENsaWVudCl7XG5cdFx0dGhpcy5sb2FkKCk7XG5cdH1cblxuXHQvKipcblx0ICogTG9hZCBuZXdzZmVlZFxuXHQgKi9cblx0bG9hZChyZWZyZXNoIDogYm9vbGVhbiA9IGZhbHNlKXtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG4gICAgaWYodGhpcy5pblByb2dyZXNzKXtcbiAgICAgIC8vY29uc29sZS5sb2coJ2FscmVhZHkgbG9hZGluZyBtb3JlLi4nKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZihyZWZyZXNoKXtcbiAgICAgIHRoaXMub2Zmc2V0ID0gXCJcIjtcbiAgICB9XG5cbiAgICB0aGlzLmluUHJvZ3Jlc3MgPSB0cnVlO1xuXG5cdFx0dGhpcy5jbGllbnQuZ2V0KCdhcGkvdjEvbmV3c2ZlZWQnLCB7bGltaXQ6MTIsIG9mZnNldDogdGhpcy5vZmZzZXR9LCB7Y2FjaGU6IHRydWV9KVxuXHRcdFx0XHQudGhlbigoZGF0YSA6IE1pbmRzQWN0aXZpdHlPYmplY3QpID0+IHtcblx0XHRcdFx0XHRpZighZGF0YS5hY3Rpdml0eSl7XG4gICAgICAgICAgICBzZWxmLm1vcmVEYXRhID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLmluUHJvZ3Jlc3MgPSBmYWxzZTtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG4gICAgICAgICAgaWYoc2VsZi5uZXdzZmVlZCAmJiAhcmVmcmVzaCl7XG4gICAgICAgICAgICBmb3IobGV0IGFjdGl2aXR5IG9mIGRhdGEuYWN0aXZpdHkpXG4gICAgICAgICAgICAgIHNlbGYubmV3c2ZlZWQucHVzaChhY3Rpdml0eSk7XG4gICAgICAgICAgfSBlbHNlIHtcblx0XHRcdFx0XHQgICAgIHNlbGYubmV3c2ZlZWQgPSBkYXRhLmFjdGl2aXR5O1xuICAgICAgICAgIH1cblx0XHRcdFx0XHRzZWxmLm9mZnNldCA9IGRhdGFbJ2xvYWQtbmV4dCddO1xuICAgICAgICAgIHNlbGYuaW5Qcm9ncmVzcyA9IGZhbHNlO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coZSk7XG5cdFx0XHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBvc3QgdG8gdGhlIG5ld3NmZWVkXG5cdCAqL1xuXHRwb3N0KCl7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHRoaXMuY2xpZW50LnBvc3QoJ2FwaS92MS9uZXdzZmVlZCcsIHRoaXMucG9zdE1ldGEpXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uKGRhdGEpe1xuXHRcdFx0XHRcdHNlbGYubG9hZCh0cnVlKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAvL3Jlc2V0XG4gICAgICAgICAgc2VsZi5wb3N0TWV0YSA9IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiXCIsXG4gICAgICAgICAgICB0aXRsZTogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAgICAgdGh1bWJuYWlsOiBcIlwiLFxuICAgICAgICAgICAgdXJsOiBcIlwiLFxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZVxuICAgICAgICAgIH1cblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGUpO1xuXHRcdFx0XHR9KTtcblx0fVxuXG4gIC8qKlxuICAgKiBHZXQgcmljaCBlbWJlZCBkYXRhXG4gICAqL1xuICB0aW1lb3V0O1xuICBnZXRQb3N0UHJldmlldyhtZXNzYWdlKXtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgbWF0Y2ggPSBtZXNzYWdlLnZhbHVlLm1hdGNoKC8oXFxiKGh0dHBzP3xmdHB8ZmlsZSk6XFwvXFwvWy1BLVowLTkrJkAjXFwvJT89fl98ITosLjtdKlstQS1aMC05KyZAI1xcLyU9fl98XSkvaWcpO1xuXHRcdGlmICghbWF0Y2gpIHJldHVybjtcbiAgICB2YXIgdXJsO1xuXG5cdFx0aWYgKCBtYXRjaCBpbnN0YW5jZW9mIEFycmF5KSB7XG5cdFx0XHR1cmwgPSBtYXRjaFswXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dXJsID0gbWF0Y2g7XG5cdFx0fVxuXG5cdFx0aWYgKCF1cmwubGVuZ3RoKSByZXR1cm47XG5cblx0XHR1cmwgPSB1cmwucmVwbGFjZShcImh0dHA6Ly9cIiwgJycpO1xuXHRcdHVybCA9IHVybC5yZXBsYWNlKFwiaHR0cHM6Ly9cIiwgJycpO1xuICAgIGNvbnNvbGUubG9nKCdmb3VuZCB1cmwgd2FzICcgKyB1cmwpXG5cbiAgICBzZWxmLnBvc3RNZXRhLmFjdGl2ZSA9IHRydWU7XG5cbiAgICBpZih0aGlzLnRpbWVvdXQpXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcblxuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCk9PntcbiAgICAgIHRoaXMuY2xpZW50LmdldCgnYXBpL3YxL25ld3NmZWVkL3ByZXZpZXcnLCB7dXJsOiB1cmx9KVxuICAgICAgICAudGhlbigoZGF0YSA6IGFueSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgIHNlbGYucG9zdE1ldGEudGl0bGUgPSBkYXRhLm1ldGEudGl0bGU7XG4gICAgICAgICAgc2VsZi5wb3N0TWV0YS51cmwgPSBkYXRhLm1ldGEuY2Fub25pY2FsO1xuICAgICAgICAgIHNlbGYucG9zdE1ldGEuZGVzY3JpcHRpb24gPSBkYXRhLm1ldGEuZGVzY3JpcHRpb247XG4gICAgICAgICAgZm9yICh2YXIgbGluayBvZiBkYXRhLmxpbmtzKSB7XG4gICAgICAgICAgICAgIGlmIChsaW5rLnJlbC5pbmRleE9mKCd0aHVtYm5haWwnKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXRhLnRodW1ibmFpbCA9IGxpbmsuaHJlZjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSwgNjAwKTtcbiAgfVxuXG5cblxuXHQvKipcblx0ICogQSB0ZW1wb3JhcnkgaGFjaywgYmVjYXVzZSBwaXBlcyBkb24ndCBzZWVtIHRvIHdvcmtcblx0ICovXG5cdHRvRGF0ZSh0aW1lc3RhbXApe1xuXHRcdHJldHVybiBuZXcgRGF0ZSh0aW1lc3RhbXAqMTAwMCk7XG5cdH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==