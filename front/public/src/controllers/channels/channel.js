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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var api_1 = require('src/services/api');
var material_1 = require('src/directives/material');
var session_1 = require('../../services/session');
var infinite_scroll_1 = require('../../directives/infinite-scroll');
var autogrow_1 = require('../../directives/autogrow');
var activity_1 = require('src/controllers/newsfeed/activity');
var Channel = (function () {
    function Channel(client, router, params) {
        this.client = client;
        this.router = router;
        this.params = params;
        this.session = session_1.SessionFactory.build();
        this.feed = [];
        this.offset = "";
        this.moreData = true;
        this.inProgress = false;
        this.editing = "";
        this.error = "";
        this.username = params.params['username'];
        this.load();
    }
    Channel.prototype.load = function () {
        var self = this;
        this.client.get('api/v1/channel/' + this.username, {})
            .then(function (data) {
            if (data.status != "success") {
                self.error = data.message;
                return false;
            }
            self.user = data.channel;
            self.loadFeed(true);
        })
            .catch(function (e) {
            console.log('couldnt load channel', e);
        });
    };
    Channel.prototype.loadFeed = function (refresh) {
        if (refresh === void 0) { refresh = false; }
        var self = this;
        if (this.inProgress) {
            return false;
        }
        if (refresh) {
            this.offset = "";
        }
        this.inProgress = true;
        this.client.get('api/v1/newsfeed/personal/' + this.user.guid, { limit: 12, offset: this.offset }, { cache: true })
            .then(function (data) {
            if (!data.activity) {
                self.moreData = false;
                self.inProgress = false;
                return false;
            }
            if (self.feed && !refresh) {
                for (var _i = 0, _a = data.activity; _i < _a.length; _i++) {
                    var activity = _a[_i];
                    self.feed.push(activity);
                }
            }
            else {
                self.feed = data.activity;
            }
            self.offset = data['load-next'];
            self.inProgress = false;
        })
            .catch(function (e) {
            console.log(e);
        });
    };
    Channel.prototype.isOwner = function () {
        return this.session.getLoggedInUser().guid == this.user.guid;
    };
    Channel.prototype.toggleEditing = function (section) {
        if (this.editing == section)
            this.editing = "";
        else
            this.editing = section;
    };
    Channel.prototype.updateField = function (field) {
        if (!field)
            return false;
        var self = this;
        var data = {};
        data[field] = this.user[field];
        this.client.post('api/v1/channel/info', data)
            .then(function (data) {
            if (data.status != "success") {
                alert('error saving');
                return false;
            }
            self.editing = "";
        });
    };
    Channel = __decorate([
        angular2_1.Component({
            selector: 'minds-channel',
            viewBindings: [api_1.Client]
        }),
        angular2_1.View({
            templateUrl: 'templates/channels/channel.html',
            directives: [angular2_1.NgFor, angular2_1.NgIf, material_1.Material, angular2_1.FORM_DIRECTIVES, infinite_scroll_1.InfiniteScroll, activity_1.Activity, autogrow_1.AutoGrow]
        }),
        __param(1, angular2_1.Inject(router_1.Router)),
        __param(2, angular2_1.Inject(router_1.RouteParams)), 
        __metadata('design:paramtypes', [api_1.Client, router_1.Router, router_1.RouteParams])
    ], Channel);
    return Channel;
})();
exports.Channel = Channel;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb250cm9sbGVycy9jaGFubmVscy9jaGFubmVsLnRzIl0sIm5hbWVzIjpbIkNoYW5uZWwiLCJDaGFubmVsLmNvbnN0cnVjdG9yIiwiQ2hhbm5lbC5sb2FkIiwiQ2hhbm5lbC5sb2FkRmVlZCIsIkNoYW5uZWwuaXNPd25lciIsIkNoYW5uZWwudG9nZ2xlRWRpdGluZyIsIkNoYW5uZWwudXBkYXRlRmllbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUJBQXFFLG1CQUFtQixDQUFDLENBQUE7QUFDekYsdUJBQW9DLGlCQUFpQixDQUFDLENBQUE7QUFDdEQsb0JBQXVCLGtCQUFrQixDQUFDLENBQUE7QUFDMUMseUJBQXlCLHlCQUF5QixDQUFDLENBQUE7QUFDbkQsd0JBQStCLHdCQUF3QixDQUFDLENBQUE7QUFDeEQsZ0NBQStCLGtDQUFrQyxDQUFDLENBQUE7QUFDbEUseUJBQXlCLDJCQUEyQixDQUFDLENBQUE7QUFDckQseUJBQXlCLG1DQUFtQyxDQUFDLENBQUE7QUFFN0Q7SUFvQkVBLGlCQUFtQkEsTUFBY0EsRUFDUkEsTUFBY0EsRUFDVEEsTUFBbUJBO1FBRjlCQyxXQUFNQSxHQUFOQSxNQUFNQSxDQUFRQTtRQUNSQSxXQUFNQSxHQUFOQSxNQUFNQSxDQUFRQTtRQUNUQSxXQUFNQSxHQUFOQSxNQUFNQSxDQUFhQTtRQVpqREEsWUFBT0EsR0FBR0Esd0JBQWNBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO1FBR2pDQSxTQUFJQSxHQUFtQkEsRUFBRUEsQ0FBQ0E7UUFDMUJBLFdBQU1BLEdBQVlBLEVBQUVBLENBQUNBO1FBQ3JCQSxhQUFRQSxHQUFhQSxJQUFJQSxDQUFDQTtRQUMxQkEsZUFBVUEsR0FBYUEsS0FBS0EsQ0FBQ0E7UUFDN0JBLFlBQU9BLEdBQVlBLEVBQUVBLENBQUNBO1FBQ3RCQSxVQUFLQSxHQUFXQSxFQUFFQSxDQUFDQTtRQU1mQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFD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QkEsRUFBRUEsSUFBSUEsQ0FBQ0E7YUFDbENBLElBQUlBLENBQUNBLFVBQUNBLElBQVVBO1lBQ2ZBLEVBQUVBLENBQUFBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLElBQUlBLFNBQVNBLENBQUNBLENBQUFBLENBQUNBO2dCQUMzQkEsS0FBS0EsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RCQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUNmQSxDQUFDQTtZQUNEQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxFQUFFQSxDQUFDQTtRQUNsQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDakJBLENBQUNBO0lBeEdITjtRQUFDQSxvQkFBU0EsQ0FBQ0E7WUFDVEEsUUFBUUEsRUFBRUEsZUFBZUE7WUFDekJBLFlBQVlBLEVBQUVBLENBQUVBLFlBQU1BLENBQUVBO1NBQ3pCQSxDQUFDQTtRQUNEQSxlQUFJQSxDQUFDQTtZQUNKQSxXQUFXQSxFQUFFQSxpQ0FBaUNBO1lBQzlDQSxVQUFVQSxFQUFFQSxDQUFFQSxnQkFBS0EsRUFBRUEsZUFBSUEsRUFBRUEsbUJBQVFBLEVBQUVBLDBCQUFlQSxFQUFFQSxnQ0FBY0EsRUFBRUEsbUJBQVFBLEVBQUVBLG1CQUFRQSxDQUFFQTtTQUMzRkEsQ0FBQ0E7UUFjRUEsV0FBQ0EsaUJBQU1BLENBQUNBLGVBQU1BLENBQUNBLENBQUFBO1FBQ2ZBLFdBQUNBLGlCQUFNQSxDQUFDQSxvQkFBV0EsQ0FBQ0EsQ0FBQUE7O2dCQW9GdkJBO0lBQURBLGNBQUNBO0FBQURBLENBMUdBLEFBMEdDQSxJQUFBO0FBakdZLGVBQU8sVUFpR25CLENBQUEiLCJmaWxlIjoic3JjL2NvbnRyb2xsZXJzL2NoYW5uZWxzL2NoYW5uZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXcsIE5nRm9yLCBOZ0lmLCBJbmplY3QsIEZPUk1fRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvYW5ndWxhcjInO1xuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZVBhcmFtcyB9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlcic7XG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tICdzcmMvc2VydmljZXMvYXBpJztcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSAnc3JjL2RpcmVjdGl2ZXMvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgU2Vzc2lvbkZhY3RvcnkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9zZXNzaW9uJztcbmltcG9ydCB7IEluZmluaXRlU2Nyb2xsIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9pbmZpbml0ZS1zY3JvbGwnO1xuaW1wb3J0IHsgQXV0b0dyb3cgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2F1dG9ncm93JztcbmltcG9ydCB7IEFjdGl2aXR5IH0gZnJvbSAnc3JjL2NvbnRyb2xsZXJzL25ld3NmZWVkL2FjdGl2aXR5JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWluZHMtY2hhbm5lbCcsXG4gIHZpZXdCaW5kaW5nczogWyBDbGllbnQgXVxufSlcbkBWaWV3KHtcbiAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvY2hhbm5lbHMvY2hhbm5lbC5odG1sJyxcbiAgZGlyZWN0aXZlczogWyBOZ0ZvciwgTmdJZiwgTWF0ZXJpYWwsIEZPUk1fRElSRUNUSVZFUywgSW5maW5pdGVTY3JvbGwsIEFjdGl2aXR5LCBBdXRvR3JvdyBdXG59KVxuXG5leHBvcnQgY2xhc3MgQ2hhbm5lbCB7XG4gIHNlc3Npb24gPSBTZXNzaW9uRmFjdG9yeS5idWlsZCgpO1xuICB1c2VybmFtZSA6IHN0cmluZztcbiAgdXNlciA6IE9iamVjdDtcbiAgZmVlZCA6IEFycmF5PE9iamVjdD4gPSBbXTtcbiAgb2Zmc2V0IDogc3RyaW5nID0gXCJcIjtcbiAgbW9yZURhdGEgOiBib29sZWFuID0gdHJ1ZTtcbiAgaW5Qcm9ncmVzcyA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZWRpdGluZyA6IHN0cmluZyA9IFwiXCI7XG4gIGVycm9yOiBzdHJpbmcgPSBcIlwiO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjbGllbnQ6IENsaWVudCxcbiAgICBASW5qZWN0KFJvdXRlcikgcHVibGljIHJvdXRlcjogUm91dGVyLFxuICAgIEBJbmplY3QoUm91dGVQYXJhbXMpIHB1YmxpYyBwYXJhbXM6IFJvdXRlUGFyYW1zXG4gICAgKXtcbiAgICAgIHRoaXMudXNlcm5hbWUgPSBwYXJhbXMucGFyYW1zWyd1c2VybmFtZSddO1xuICAgICAgdGhpcy5sb2FkKCk7XG4gIH1cblxuICBsb2FkKCl7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuY2xpZW50LmdldCgnYXBpL3YxL2NoYW5uZWwvJyArIHRoaXMudXNlcm5hbWUsIHt9KVxuICAgICAgICAgICAgICAudGhlbigoZGF0YSA6IEFycmF5PGFueT4pID0+IHtcbiAgICAgICAgICAgICAgICBpZihkYXRhLnN0YXR1cyAhPSBcInN1Y2Nlc3NcIil7XG4gICAgICAgICAgICAgICAgICBzZWxmLmVycm9yID0gZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLnVzZXIgPSBkYXRhLmNoYW5uZWw7XG4gICAgICAgICAgICAgICAgc2VsZi5sb2FkRmVlZCh0cnVlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY291bGRudCBsb2FkIGNoYW5uZWwnLCBlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIGxvYWRGZWVkKHJlZnJlc2ggOiBib29sZWFuID0gZmFsc2Upe1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBpZih0aGlzLmluUHJvZ3Jlc3Mpe1xuICAgICAgLy9jb25zb2xlLmxvZygnYWxyZWFkeSBsb2FkaW5nIG1vcmUuLicpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmKHJlZnJlc2gpe1xuICAgICAgdGhpcy5vZmZzZXQgPSBcIlwiO1xuICAgIH1cblxuICAgIHRoaXMuaW5Qcm9ncmVzcyA9IHRydWU7XG5cbiAgICB0aGlzLmNsaWVudC5nZXQoJ2FwaS92MS9uZXdzZmVlZC9wZXJzb25hbC8nICsgdGhpcy51c2VyLmd1aWQsIHtsaW1pdDoxMiwgb2Zmc2V0OiB0aGlzLm9mZnNldH0sIHtjYWNoZTogdHJ1ZX0pXG4gICAgICAgIC50aGVuKChkYXRhIDogTWluZHNBY3Rpdml0eU9iamVjdCkgPT4ge1xuICAgICAgICAgIGlmKCFkYXRhLmFjdGl2aXR5KXtcbiAgICAgICAgICAgIHNlbGYubW9yZURhdGEgPSBmYWxzZTtcbiAgICAgICAgICAgIHNlbGYuaW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihzZWxmLmZlZWQgJiYgIXJlZnJlc2gpe1xuICAgICAgICAgICAgZm9yKGxldCBhY3Rpdml0eSBvZiBkYXRhLmFjdGl2aXR5KVxuICAgICAgICAgICAgICBzZWxmLmZlZWQucHVzaChhY3Rpdml0eSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgIHNlbGYuZmVlZCA9IGRhdGEuYWN0aXZpdHk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNlbGYub2Zmc2V0ID0gZGF0YVsnbG9hZC1uZXh0J107XG4gICAgICAgICAgc2VsZi5pblByb2dyZXNzID0gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbihlKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfSk7XG4gIH1cblxuICBpc093bmVyKCl7XG4gICAgcmV0dXJuIHRoaXMuc2Vzc2lvbi5nZXRMb2dnZWRJblVzZXIoKS5ndWlkID09IHRoaXMudXNlci5ndWlkO1xuICB9XG5cbiAgdG9nZ2xlRWRpdGluZyhzZWN0aW9uIDogc3RyaW5nKXtcbiAgICBpZih0aGlzLmVkaXRpbmcgPT0gc2VjdGlvbilcbiAgICAgIHRoaXMuZWRpdGluZyA9IFwiXCI7XG4gICAgZWxzZVxuICAgICAgdGhpcy5lZGl0aW5nID0gc2VjdGlvbjtcbiAgfVxuXG4gIHVwZGF0ZUZpZWxkKGZpZWxkIDogc3RyaW5nKXtcbiAgICBpZighZmllbGQpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgbGV0IGRhdGEgPSB7fTtcbiAgICBkYXRhW2ZpZWxkXSA9IHRoaXMudXNlcltmaWVsZF07XG4gICAgdGhpcy5jbGllbnQucG9zdCgnYXBpL3YxL2NoYW5uZWwvaW5mbycsIGRhdGEpXG4gICAgICAgICAgICAgIC50aGVuKChkYXRhIDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZGF0YS5zdGF0dXMgIT0gXCJzdWNjZXNzXCIpe1xuICAgICAgICAgICAgICAgICAgYWxlcnQoJ2Vycm9yIHNhdmluZycpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLmVkaXRpbmcgPSBcIlwiO1xuICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==