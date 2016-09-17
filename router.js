function route(handle, pathname, res) {
    console.log('route request of ' + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](res);
    } else {
        console.log('no request handler found for ' + pathname);
    }
}
 
exports.route = route;

