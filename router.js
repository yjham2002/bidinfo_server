function route(handle, pathname) {
    console.log('route request of ' + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname]();
    } else {
        console.log('no request handler found for ' + pathname);
    }
}
 
exports.route = route;

