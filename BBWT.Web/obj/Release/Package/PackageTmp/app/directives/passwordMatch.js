var Directives;
(function (Directives) {
    var Match = (function () {
        function Match() {
            var directive = {
                require: "ngModel",
                link: function (scope, elem, attrs, ctrl) {
                    var otherInput = elem.inheritedData("$formController")[attrs['match']];
                    ctrl.$parsers.push(function (value) {
                        if (value === otherInput.$viewValue) {
                            ctrl.$setValidity("match", true);
                            return value;
                        }
                        ctrl.$setValidity("match", false);
                        return undefined;
                    });
                    otherInput.$parsers.push(function (value) {
                        ctrl.$setValidity("match", value === ctrl.$viewValue);
                        return value;
                    });
                }
            };
            return directive;
        }
        return Match;
    })();
    Directives.Match = Match;
})(Directives || (Directives = {}));
angular.module('Directives', []).directive('match', function () {
    return new Directives.Match();
});
//# sourceMappingURL=passwordMatch.js.map