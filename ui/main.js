import { App, Component, useState, xml, useEffect } from "@odoo/owl";
import 'bulma/css/bulma.css'


class DispayBox extends Component {
    static template = xml`<div class="box"><t t-esc="props.timerContent"/></div>`
}

class GridCell extends Component {
    static template = xml`<div class="cell"><DispayBox content="props.content" timerContent="props.timerContent"/></div>`
    static components = {DispayBox}
}

class MainComponent extends Component {
    timeData = useState({value: 0})

    setup() {
        useEffect(() => {
            const timer = setInterval(() => {
              this.timeData.value += 1
            }, 1000)
        
            return () => clearInterval(timer)
          }, 
          () => [])
    }



    static template = xml`<div class="fixed-grid has-2-cols">
                            <div class="grid">
                                <t t-foreach="[1,2,3,4]" t-as="i" t-key="i">
                                    <GridCell content="i" timerContent="timeData.value"/>
                                </t>
                            </div>
                        </div>`
    static components = {GridCell}
}

const app = new App(MainComponent)
app.mount(document.body)

