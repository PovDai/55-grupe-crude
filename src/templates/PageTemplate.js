export class PageTemplate {
    constructor(req) {
        this.req = req;
        this.pageType = 'default';
        this.pageJS = '';
    }

    head() {
        return `
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Express example</title>
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="Coming soon" />
                <link rel="manifest" href="/favicon/site.webmanifest" />
                <link rel="stylesheet" href="/css/main.css">
            </head>`;
    }

    header() {
        return `
            <header class="container main-header">
                <div class="row">
                    <div class="col-12 header-content">
                        <a href="/">
                            <img class="logo" src="/img/logo.webp" alt="Logo">
                        </a>
                        ${this.headerMenu(headerMenuData)}
                        <i class="fa fa-bars hamburger"></i>
                    </div>
                </div>
            </header>`;
    }


    headerMenu(data) {
        let HTML = '';

        for (const link of data) {
            if (link.subMenu) {
                let subMenuHTML = '';

                for (const subLink of link.subMenu) {
                    subMenuHTML += `<a class="link" href="${subLink.href}">${subLink.text}</a>`;
                }

                HTML += `
                <div class="dropdown">
                    <a class="link" href="${link.href}">${link.text}<i class="fa fa-angle-down"></i></a>
                    <div class="dropdown-content">${subMenuHTML}</div>
                </div>`;
            } else {
                HTML += `<a class="link" href="${link.href}">${link.text}</a>`;
            }
        }

        return `<nav class="main-nav">${HTML}</nav>`;
    }

    headerAuth() {
        return `
            <header class="container main-header">
                <div class="row">
                    <div class="col-12 header-content">
                        <a href="/">
                            <img class="logo" src="/img/logo.webp" alt="Logo">
                        </a>
                        <nav class="main-nav">
                            <a class="link" href="/register">Register</a>
                            <a class="link" href="/login">Login</a>
                        </nav>
                        <i class="fa fa-bars hamburger"></i>
                    </div>
                </div>
            </header>`;
    }

    footer() {
        return `
            <footer class="container bg-dark">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-4">
                        <img class="logo" src="/img/logo.webp" alt="Logo">
                        <p>Our goal is to demystify the process, address your concerns, and empower you with the knowledge to embark.</p>
                        <div>
                            <a href="#" target="_blank">SOC</a>
                            <a href="#" target="_blank">SOC</a>
                            <a href="#" target="_blank">SOC</a>
                            <a href="#" target="_blank">SOC</a>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3">
                        <p>Electricity service</p>
                        <a href="#">Link</a>
                        <a href="#">Link</a>
                        <a href="#">Link</a>
                        <a href="#">Link</a>
                        <a href="#">Link</a>
                    </div>
                    <div class="col-12 col-md-6 col-lg-2">
                        <p>Quick links</p>
                        <a href="#">Link</a>
                        <a href="#">Link</a>
                        <a href="#">Link</a>
                        <a href="#">Link</a>
                        <a href="#">Link</a>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3">
                        <p>Contact us</p>
                        <a href="#">Link</a>
                        <a href="#">Link</a>
                        <a href="#">Link</a>
                    </div>
                </div>
                <div class="row">
                    <p class="col-12">&copy; Copyright 2024 - Current. All Right Reserved</p>
                </div>
            </footer>`;
    }

    footerAuth() {
        return `
            <footer class="container bg-dark">
                <div class="row">
                    <p class="col-12">Pagaminta Lietuvoje &copy; 2025</p>
                </div>
            </footer>`;
    }

    script() {
        if (!this.pageJS) {
            return '';
        }

        return `<script src="/js/${this.pageJS}.js" type="module"></script>`;
    }

    aside() {
        return `<aside>SONINIS MENU</aside>`;
    }

    main() {
        return 'CONTENT...';
    }

    render() {
        stats.visitsCount++;

        return `
            <!DOCTYPE html>
            <html lang="en">
            ${this.head()}
            <body>
                ${this.pageType === 'default' ? this.header() : this.headerAuth()}
                ${this.isAsideVisible ? this.aside() : ''}
                <main>${this.main()}</main>
                ${this.pageType === 'default' ? this.footer() : this.footerAuth()}
                ${this.script()}
            </body>
            </html>`;
    }
}