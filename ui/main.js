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
        <section class="hero is-success is-halfheight">
            <div class="hero-body">
                    <t t-slot="default"/>         
            </div>
        </section>
    `
}

class MainComponent extends Component {
    timeData = useState({value: 0})
    ga = new GeneticAlgorithm() 
    state = useState({bestFit: this.ga.bestFitStr(), interation: this.ga.itteration, population: this.ga.populationStr()})
    runNext = useState({step: 0})

    setup() {
        this.ga.setup()
        useEffect(() => {
            const timer = setInterval(() => {
                if (this.ga.end === false) {
                    this.ga.runStep()
                    this.state.bestFit = this.ga.bestFitStr(), 
                    this.state.interation = this.ga.itteration
                    this.state.population = this.ga.populationStr()
                    // console.log(this.ga)
                    console.log(this.state)
                }
            }, 30)
        
            return () => clearInterval(timer)
          }, 
        () => [])
        onPatched(() => {
            console.log("I patched")
            this.runNext.step += 1
        });
    }

    static template = xml`
                        <div class="fixed-grid has-2-cols">
                            <div class="grid">
                                <GridCell>
                                    <ScreenSection>
                                        <h1 t-esc="state.bestFit"/>
                                    </ScreenSection>
                                </GridCell>
                                <GridCell>
                                    <ScreenSection>
                                        <div class="fixed-grid has-6-cols">
                                            <div class="grid">

                                            </div>
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

