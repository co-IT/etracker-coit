#decisionHelper

decisionHelper -- a web analytics helper tool
==============================

## SYNOPSIS

This tool helps you load the web analytics tracking tool and provides basic functionality for custom tracking events.

## IMPORTANT

In order to use this tool, you need to place a script tag in your web page containing the etracker secure code:

```javascript
<script type="text/javascript" data-etracker-code="my-tracking-code"></script>
```

## Super Easy Usage

Just include the module in your webpage and create an instance of it:

```javascript
var tracklet = new tracklet();
tracklet.bootstrap();
document.getElementById('myButton').addEventListener('click', tracklet.sendClickEvent('My Button', 'was clicked'));
```
