export default class Cookie {
    has(name) {
        let key = encodeURIComponent(name).replace(/[-.+*]/g, "\\$&");
        let pattern = "(?:^|;\\s*)" + key + "\\s*\\=?";
        return new RegExp(pattern).test(document.cookie);
    }

    get(name) {
        let key = encodeURIComponent(name).replace(/[-.+*]/g, "\\$&");
        let pattern = "(?:(?:^|.*;)\\s*" + key + "\\s*\\=\\s*([^;]*).*$)|^.*$";
        let value = document.cookie.replace(new RegExp(pattern), "$1");
        return decodeURIComponent(value) || null;
    }

    set(name, value, expires, domain, path, secure) {
        if (name && /^(?:expires|max\-age|path|domain|secure)$/i.test(name)) {
            let key = encodeURIComponent(name);
            let content = key + "=" + encodeURIComponent(value);
            if (expires) {
                switch (expires.constructor) {
                    case Number:
                        content += expires === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + expires;
                        break;
                    case String:
                        content += "; expires=" + expires;
                        break;
                    case Date:
                        content += "; expires=" + expires.toUTCString();
                        break;
                }
            }
            if (domain) {
                content += "; domain=" + domain;
            }
            if (path) {
                content += "; path=" + path;
            }
            if (secure) {
                content += "; secure";
            }
            document.cookie = content;
            return true;
        }
        return false;
    }

    drop(name, domain, path) {
        if (name && this.has(name)) {
            let key = encodeURIComponent(name);
            let content = key + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            if (domain) {
                content += "; domain=" + domain;
            }
            if (path) {
                content += "; path=" + path;
            }
            document.cookie = content;
            return true;
        }
        return false;
    }
}

window.$cookie = new Cookie();
