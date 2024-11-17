# Cookie Wrapper

A simple JavaScript API for handling cookies

- Extensive browser support
- Tested
- No dependency
- ~~Typescript~~
- Supports ES modules
- Supports CommonJS

## Installation

```bash
npm i @yurishvetsov/cookie-wrapper
```

## Basic Usage

### Import the library

```javascript
import cookieWrapper from '@yurishvetsov/cookie-wrapper'
// or
const cookieWrapper = require('@yurishvetsov/cookie-wrapper')
```

### Reading

Read all available cookies:

```javascript
cookieWrapper.get() // => [{ name: 'name', value: 'value' }]
```

Read cookie:

```javascript
cookieWrapper.get('name') // => 'value'
cookieWrapper.get('nothing') // => undefined
```

Read cookies by regular expression:

```javascript
cookieWrapper.get(new RegExp('^name')) // => [{ name: 'name_123', value: 'value' }]
```

### Creating

Create a cookie, valid across the entire site:

```javascript
cookieWrapper.set('name', 'value')
```

Create a cookie that expires on December 17, 2024, valid across the entire site:

```javascript
cookieWrapper.set('name', 'value', { expires: new Date('2024-12-17') })
```

Create a cookie that expires 1 hour from now, valid across the entire site:

```javascript
cookieWrapper.set('name', 'value', { 'max-age': 3600 })
```

Create cookie, valid to the path of the current page:

```javascript
cookieWrapper.set('name', 'value', { path: '' })
```

Create cookie with domain:

```javascript
cookieWrapper.set('name', 'value', { domain: '.site.com' })
```

### Deleting

Delete cookie:

```javascript
cookieWrapper.remove('name')
```

Delete a cookie valid to the path of the current page:
```javascript
cookieWrapper.remove('name', { path: '' })
```

Delete all cookies by regular expression and domain:
```javascript
cookieWrapper.remove(new RegExp('^name_'), { domain: '.site.com' })
```

## Cookie Attributes

| Attribute | Type | Description |
|---|---|---|
| expires | Date | Define when the cookie will be removed. |
| max-age | number | Determine when the cookie will be deleted, the value in seconds. |
| path | string | A [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) indicating the path where the cookie is visible. |
| domain | string | A [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) indicating a valid domain where the cookie should be visible. The cookie will also be visible to all subdomains. |

## Authors

- [Yuri Shvetsov](https://github.com/YuriShvetsov)
