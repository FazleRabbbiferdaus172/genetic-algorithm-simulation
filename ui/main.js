import { App, Component, useState, xml, useEffect, onPatched, onRendered } from "@odoo/owl";
import 'bulma/css/bulma.css'
import { GeneticAlgorithm } from "../genetic_algorithm/main.mjs";


class DisplayBox extends Component {
    static template = xml`<div class="box"><t t-esc="props.timerContent"/></div>`
}

class GridCell extends Component {
    static template = xml`<div class="cell"><t t-slot="default"/></div>`
}

class ScreenSection extends Component {
    static template = xml`
        <section class="hero is-fullheight is-success" style="max-height: 50vh; overflow: auto">
            <div class="hero-body">
                    <t t-slot="default"/>         
            </div>
        </section>
    `
}

class MainComponent extends Component {
    timeData = useState({value: 0})
    ga = new GeneticAlgorithm() 
    state = useState({"itterations": [{bestFit: this.ga.bestFitStr(), interation: this.ga.itteration, population: this.ga.populationStr()}]})
    runNext = useState({step: 0})
    re = useState({step: 0})

    setup() {
        this.ga.setup()

        useEffect(() => {
            let result = []
            while (this.ga.end===false){
                    this.ga.runStep()
                    // this.state.bestFit = this.ga.bestFitStr(), 
                    // this.state.interation = this.ga.itteration
                    // this.state.population = this.ga.populationStr()
                    result.push({bestFit: this.ga.bestFitStr(), interation: this.ga.itteration, population: this.ga.populationStr()})
            }
            this.state.itterations = result
          }, () => [this.runNext, this.re])

        onPatched(() => {
            if (this.runNext.step < this.state.itterations.length - 1){            
                this.runNext.step += 1
            }
            this.re.step += 1
        })
    }

    static template = xml`
                        <div class="fixed-grid has-2-cols">
                            <div class="grid">
                                <GridCell>
                                    <ScreenSection>
                                        <h1 t-esc="state.itterations[runNext.step].bestFit"/>
                                    </ScreenSection>
                                </GridCell>
                                <GridCell>
                                    <ScreenSection>

                                            <div class="grid is-col-min-30">
                                                <t t-foreach="state.itterations[runNext.step].population" t-as="p" t-key="p">
                                                    <GridCell>
                                                        <t t-esc="p"/>
                                                    </GridCell>
                                                </t>
                                                <GridCell>
                                                    <p>...</p>
                                                </GridCell>
                                                <GridCell>
                                                    <p>...</p>
                                                </GridCell>
                                                <GridCell>
                                                    <p>...</p>
                                                </GridCell>
                                            </div>

                                    </ScreenSection>
                                </GridCell>
                            </div>
                        </div>
                        `

    static components = {ScreenSection, GridCell, DisplayBox}
}

const app = new App(MainComponent)
app.mount(document.body)

