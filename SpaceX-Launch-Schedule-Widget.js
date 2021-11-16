const url = "https://ll.thespacedevs.com/2.0.0/launch/upcoming/?mode=list&search=SpaceX"
const req = new Request(url)
let api = await req.loadJSON()
var rocket = api.results[0].name
var date = new Date(api.results[0].net).toLocaleString()
var location = api.results[0].location
const widget = await createWidget()
Script.setWidget(widget)
Script.complete()
async function createWidget() {
  let widget = new ListWidget()
  widget.backgroundcolor = Color.black()
  widget.spacing = 8
  addItem(widget, rocket, null, false)
  addItem(widget, date, "calendar", false)
  addItem(widget, location, "mappin.and.ellipse", false)
  addItem(widget, date, "timer", true)
  return widget
}

function addItem(widget, text, symbol, timer) {
  let item = widget.addStack()
  if (symbol != null) {
    let icn = item.addImage(SFSymbol.named(symbol).image)
    icn.imageSize = new Size(22, 22)
    icn.tintColor = Color.white()
    item.addSpacer()
  }
  if (timer == true) {
    let countDown = item.addDate(new Date(text))
    countDown.applyTimerStyle()
    countDown.rightAlignText()
    countDown.font = Font.mediumSystemFont(10)
  } else if (text != null) {
    let t = item.addText(text)
    t.font = Font.mediumSystemFont(10)
  }
}
