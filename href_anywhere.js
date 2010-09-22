var ElementLink = Class.create({
  initialize: function(element) {
    this.element = $(element);
    this.element.observe('mouseover', this.mouseover.bind(this));
    this.element.observe('mouseout', this.mouseout.bind(this));
    this.element.observe('click', this.click.bind(this));
    this.element.setStyle({cursor: 'pointer'});
    this.location = element.readAttribute('href');
    this.target = element.readAttribute('target');
    this.element.elementLinkObj = this;
  },
  mouseover: function(event) {
    if (['A', 'BUTTON', 'INPUT'].include(event.target.tagName) || event.target.hasAttribute('onclick') || event.target.hasAttribute('nohref')) return;
    window.status = this.location;
    this.element.addClassName('hover')
  },
  mouseout: function(event) {
    if (['A', 'BUTTON', 'INPUT'].include(event.target.tagName) || event.target.hasAttribute('onclick') || event.target.hasAttribute('nohref')) return;
    window.status = '';
    this.element.removeClassName('hover')
  },
  click: function(event) {
    if (['A', 'BUTTON', 'INPUT'].include(event.target.tagName) || event.target.hasAttribute('onclick') || event.target.hasAttribute('nohref')) return;
    if (Prototype.Browser.WebKit) {
      var a = new Element('a', {href: this.location, target: this.target});
      event.target = a;
      a.dispatchEvent(event);
    } else {
      if (event.metaKey || event.ctrlKey)
        window.open(this.location, '_blank');
      else
        window.location.href = this.location;
    }
    return event.stop();
  }
});
function setupElementLinks(parent) {
  $$('*[href]').each(function(element) {
    if (element.tagName != 'A' && !element.elementLinkObj)
      new ElementLink(element);
  });
}
Event.observe(window, 'load', setupElementLinks);
