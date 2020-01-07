import * as d3 from 'd3'

const fontSizeKeywords = 1.2

export let s = {

    distance: 40,
    densityData: [],
    zoomState: null,
    zoomExtent: [1, 8],
    screen: {},

    // Yellow d3.rgb(251, 253, 166)

    colors: {
        backgroundLeft: d3.rgb(255, 144, 104),
        backgroundRight: d3.rgb(253, 116, 108),
        // contours: d3.rgb(251, 253, 166), // Lemon
        contours: d3.rgb(251, 158, 129), // Pompelmus
        keywords: d3.rgb(100, 79, 39),
        nodes: d3.rgb(39, 72, 100), // Blue
    },

    style: {
        fontNodes: `bold 2.5pt Helvetica`
    },

    setVariables: () => {

        s.linkExtent = [
            s.links.reduce((min, link) => {
                const tokens = Object.entries(link.tokens)
                for (const [key, value] of tokens) {
                    return min < value ? min : value
                }
            }, Infinity),
            s.links.reduce((min, link) => {
                const tokens = Object.entries(link.tokens)
                for (const [key, value] of tokens) {
                    return min > value ? min : value
                }
            }, 0)
        ]

        s.keywordScale = d3.scaleLinear()
            .domain(s.linkExtent)
            .range([s.zoomExtent[1] + 1, s.zoomExtent[0] - 5])

        s.fontScale = d3.scaleLinear()
            .domain(s.linkExtent)
            .range([s.zoomExtent[0], s.zoomExtent[1] -10])

        // Good results
        // s.keywordScale = d3.scaleLinear()
        //     .domain(s.linkExtent)
        //     .range([s.zoomExtent[1] + 1, s.zoomExtent[0] - 20])

        s.geoPath = d3.geoPath().context(s.context)

    },

    setScreen: () => {

        const body = document.querySelector('body')

        // Screen density

        if ('devicePixelRatio' in window && window.devicePixelRatio > 1) {
            s.screen.density = window.devicePixelRatio
            console.log('screen density:', s.screen.density)
        } else s.screen.density = 1


        s.screen.width = body.clientWidth * s.screen.density
        s.screen.height = body.clientHeight * s.screen.density

        // Visualization canvas

        s.canvas = d3.select('#visualization')

        s.context = document.querySelector('#visualization').getContext('2d')
        s.context.scale(s.screen.density, s.screen.density)

        s.body = document.querySelector('body')

        s.backgroud = d3.select('#background')

        s.bgContext = document.querySelector('#background').getContext('2d', { alpha: false })

        s.gradient = s.bgContext.createLinearGradient(0, 0, s.screen.width / 2, 0)

    },

    // setMatches: (matches) => {
    //     s.matches = matches;
    // },

}