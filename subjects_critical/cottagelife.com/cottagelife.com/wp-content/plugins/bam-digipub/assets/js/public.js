(function ($) {
    /**
     * Set target to '_blank' on all external links
     */
    $(document.links).filter(function () {
        return this.hostname != window.location.hostname;
    }).attr('target', '_blank');
})(jQuery);
