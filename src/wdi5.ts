import { Logger } from "./lib/Logger"
export class wdi5 {
    static getLogger(sPrefix = "wdi5") {
        return Logger.getInstance(sPrefix)
    }

    /**
     * navigate to a route/view of a UI5 app - by router object
     *
     * @param routerOption a UI5 router object, e.g. {
        sComponentId,
        sName,
        oParameters,
        oComponentTargetInfo,
        bReplace
    }
     * @param browserInstance the currently remote controlled browser
     */
    static async goTo(routerOption: any, browserInstance?: WebdriverIO.Browser)
    /**
     * navigate to a route/view of a UI5 app - by router object
     *
     * @param withSHash a UI5 router object, e.g. {sHash:"#/accounts/create"}
     * @param browserInstance the currently remote controlled browser
     */
    static async goTo(withSHash: any, browserInstance?: WebdriverIO.Browser)
    /**
     * navigate to a route/view of a UI5 app - by string hash
     *
     * @hash hash hash-part of the URL, e.g. "#/accounts/create"
     * @param browserInstance the currently remote controlled browser
     */
    static async goTo(hash: string, browserInstance?: WebdriverIO.Browser)
    /**
     * @deprecated please supply only a single parameter to .goTo() and optionally a browser instance
     */
    static async goTo(param: any, oRoute: any, browserInstance?: WebdriverIO.Browser)
    static async goTo(byWhat, oRoute: any, browserInstance: WebdriverIO.Browser = browser) {
        if (oRoute) {
            Logger.getInstance().warn(
                "deprecated signature: please use single parameter as nav target: wdi5.goTo(target)"
            )
            byWhat = oRoute
        }
        if (typeof byWhat === "string") {
            Logger.getInstance().log(`Navigating via string hash: ${byWhat}`)
            await browserInstance.goTo(byWhat)
        } else if (typeof byWhat === "object" && byWhat.sHash) {
            Logger.getInstance().log(`Navigating via object w/ property sHash: ${JSON.stringify(byWhat)}`)
            await browserInstance.goTo(byWhat)
        } else if (typeof byWhat === "object") {
            Logger.getInstance().log(`Navigating via UI5 router object: ${JSON.stringify(byWhat)}`)
            await browserInstance.goTo({ oRoute: byWhat })
        } else {
            Logger.getInstance().log(`Navigating via generic object: ${JSON.stringify(byWhat)}`)
            await browserInstance.goTo({ byWhat })
        }
    }
}
