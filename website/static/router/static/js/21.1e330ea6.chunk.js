(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{"./src/markdown/api/useMatch.md":function(n,a,s){"use strict";s.r(a),s.d(a,"title",function(){return o});var t=s("./node_modules/react/index.js"),p=s.n(t);const o="useMatch";a.default=function(){return p.a.createElement("div",{className:"markdown",dangerouslySetInnerHTML:{__html:'<h1>useMatch</h1>\n<p>Matches a path to the location. Matching is relative to any parent Routers, but not parent match’s, because they render even if they don’t match.</p>\n<p>This API requires a hook-compatible version of React.</p>\n<pre><code class="language-jsx"><span class="token keyword">import</span> <span class="token punctuation">{</span> useMatch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@reach/router"</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">App</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> match <span class="token operator">=</span> <span class="token function">useMatch</span><span class="token punctuation">(</span><span class="token string">\'/hot/:item\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">return</span> match <span class="token operator">?</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>Hot <span class="token punctuation">{</span>match<span class="token punctuation">.</span>item<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>Uncool<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p><code>useMatch</code> will return <code>null</code> if your path does not match the location. If it does match it will contain:</p>\n<ul>\n<li><code>uri</code></li>\n<li><code>path</code></li>\n<li><code>:params</code></li>\n</ul>\n<h2>match[param]: string</h2>\n<p>Any params in your the path will be parsed and passed as <code>match[param]</code> to your callback.</p>\n<pre><code class="language-jsx"><span class="token keyword">const</span> match <span class="token operator">=</span> <span class="token function">useMatch</span><span class="token punctuation">(</span><span class="token string">"events/:eventId"</span><span class="token punctuation">)</span>\n\nprops<span class="token punctuation">.</span>match <span class="token operator">?</span> props<span class="token punctuation">.</span>match<span class="token punctuation">.</span>eventId <span class="token punctuation">:</span> <span class="token string">"No match"</span>\n</code></pre>\n<h2>match.uri: string</h2>\n<p>The portion of the URI that matched. If you pass a wildcard path, the wildcard portion will not be included. Not sure how this is useful for a <code>Match</code>, but it’s critical for how focus managment works, so we might as well pass it on to Match if we pass it on to Route Components!</p>\n<pre><code class="language-jsx"><span class="token comment">// URL: /somewhere/deep/i/mean/really/deep</span>\n<span class="token keyword">const</span> match <span class="token operator">=</span> <span class="token function">useMatch</span><span class="token punctuation">(</span><span class="token string">"/somewhere/deep/*"</span><span class="token punctuation">)</span>\n\n<span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>match<span class="token punctuation">.</span>uri<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n</code></pre>\n<h2>match.path: string</h2>\n<p>The path you passed in as a prop.</p>\n'}})}}}]);