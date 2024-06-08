/* MIT License

Copyright (c) 2022 Jeremy Vincent

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

function handler(event) {
    var request = event.request;
    var uri = request.uri;
    var modifiedUri = false;
    
    // Check whether the URI has a double slash.
    if (uri.includes('//')) {
        modifiedUri = true;
        uri = uri.split("//").join("/");
    }
    
    // Check whether the URI is missing a file name.
    if (uri.endsWith('/')) {
        modifiedUri = true;
        uri += 'index.html';
    }
    
    // Check whether the URI is missing a file extension.
    else if (!uri.includes('.')) {
        modifiedUri = true;
        uri += '/index.html';
    }

    // Return HTTP 302 Temp Redirect status code if URI modified.
    if (modifiedUri === true) {
        var response = {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                "location": { "value": uri }
          }
        }
        return response;
    }
    return request;
}
