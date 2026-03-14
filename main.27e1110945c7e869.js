"use strict";
(self.webpackChunkboboverse = self.webpackChunkboboverse || []).push([[179], {
    121: ()=>{
        function Le(t) {
            return "function" == typeof t
        }
        function Ra(t) {
            const n = t(r=>{
                Error.call(r),
                r.stack = (new Error).stack
            }
            );
            return n.prototype = Object.create(Error.prototype),
            n.prototype.constructor = n,
            n
        }
        const bl = Ra(t=>function(n) {
            t(this),
            this.message = n ? `${n.length} errors occurred during unsubscription:\n${n.map((r,i)=>`${i + 1}) ${r.toString()}`).join("\n  ")}` : "",
            this.name = "UnsubscriptionError",
            this.errors = n
        }
        );
        function Pa(t, e) {
            if (t) {
                const n = t.indexOf(e);
                0 <= n && t.splice(n, 1)
            }
        }
        class Kn {
            constructor(e) {
                this.initialTeardown = e,
                this.closed = !1,
                this._parentage = null,
                this._finalizers = null
            }
            unsubscribe() {
                let e;
                if (!this.closed) {
                    this.closed = !0;
                    const {_parentage: n} = this;
                    if (n)
                        if (this._parentage = null,
                        Array.isArray(n))
                            for (const o of n)
                                o.remove(this);
                        else
                            n.remove(this);
                    const {initialTeardown: r} = this;
                    if (Le(r))
                        try {
                            r()
                        } catch (o) {
                            e = o instanceof bl ? o.errors : [o]
                        }
                    const {_finalizers: i} = this;
                    if (i) {
                        this._finalizers = null;
                        for (const o of i)
                            try {
                                _D(o)
                            } catch (s) {
                                e = e ?? [],
                                s instanceof bl ? e = [...e, ...s.errors] : e.push(s)
                            }
                    }
                    if (e)
                        throw new bl(e)
                }
            }
            add(e) {
                var n;
                if (e && e !== this)
                    if (this.closed)
                        _D(e);
                    else {
                        if (e instanceof Kn) {
                            if (e.closed || e._hasParent(this))
                                return;
                            e._addParent(this)
                        }
                        (this._finalizers = null !== (n = this._finalizers) && void 0 !== n ? n : []).push(e)
                    }
            }
            _hasParent(e) {
                const {_parentage: n} = this;
                return n === e || Array.isArray(n) && n.includes(e)
            }
            _addParent(e) {
                const {_parentage: n} = this;
                this._parentage = Array.isArray(n) ? (n.push(e),
                n) : n ? [n, e] : e
            }
            _removeParent(e) {
                const {_parentage: n} = this;
                n === e ? this._parentage = null : Array.isArray(n) && Pa(n, e)
            }
            remove(e) {
                const {_finalizers: n} = this;
                n && Pa(n, e),
                e instanceof Kn && e._removeParent(this)
            }
        }
        Kn.EMPTY = (()=>{
            const t = new Kn;
            return t.closed = !0,
            t
        }
        )();
        const mD = Kn.EMPTY;
        function DD(t) {
            return t instanceof Kn || t && "closed"in t && Le(t.remove) && Le(t.add) && Le(t.unsubscribe)
        }
        function _D(t) {
            Le(t) ? t() : t.unsubscribe()
        }
        const vo = {
            onUnhandledError: null,
            onStoppedNotification: null,
            Promise: void 0,
            useDeprecatedSynchronousErrorHandling: !1,
            useDeprecatedNextContext: !1
        }
          , Sl = {
            setTimeout(t, e, ...n) {
                const {delegate: r} = Sl;
                return r?.setTimeout ? r.setTimeout(t, e, ...n) : setTimeout(t, e, ...n)
            },
            clearTimeout(t) {
                const {delegate: e} = Sl;
                return (e?.clearTimeout || clearTimeout)(t)
            },
            delegate: void 0
        };
        function yD(t) {
            Sl.setTimeout(()=>{
                const {onUnhandledError: e} = vo;
                if (!e)
                    throw t;
                e(t)
            }
            )
        }
        function vD() {}
        const X1 = hf("C", void 0, void 0);
        function hf(t, e, n) {
            return {
                kind: t,
                value: e,
                error: n
            }
        }
        let Co = null;
        function Tl(t) {
            if (vo.useDeprecatedSynchronousErrorHandling) {
                const e = !Co;
                if (e && (Co = {
                    errorThrown: !1,
                    error: null
                }),
                t(),
                e) {
                    const {errorThrown: n, error: r} = Co;
                    if (Co = null,
                    n)
                        throw r
                }
            } else
                t()
        }
        class pf extends Kn {
            constructor(e) {
                super(),
                this.isStopped = !1,
                e ? (this.destination = e,
                DD(e) && e.add(this)) : this.destination = oT
            }
            static create(e, n, r) {
                return new Oa(e,n,r)
            }
            next(e) {
                this.isStopped ? mf(function eT(t) {
                    return hf("N", t, void 0)
                }(e), this) : this._next(e)
            }
            error(e) {
                this.isStopped ? mf(function J1(t) {
                    return hf("E", void 0, t)
                }(e), this) : (this.isStopped = !0,
                this._error(e))
            }
            complete() {
                this.isStopped ? mf(X1, this) : (this.isStopped = !0,
                this._complete())
            }
            unsubscribe() {
                this.closed || (this.isStopped = !0,
                super.unsubscribe(),
                this.destination = null)
            }
            _next(e) {
                this.destination.next(e)
            }
            _error(e) {
                try {
                    this.destination.error(e)
                } finally {
                    this.unsubscribe()
                }
            }
            _complete() {
                try {
                    this.destination.complete()
                } finally {
                    this.unsubscribe()
                }
            }
        }
        const nT = Function.prototype.bind;
        function gf(t, e) {
            return nT.call(t, e)
        }
        class rT {
            constructor(e) {
                this.partialObserver = e
            }
            next(e) {
                const {partialObserver: n} = this;
                if (n.next)
                    try {
                        n.next(e)
                    } catch (r) {
                        Il(r)
                    }
            }
            error(e) {
                const {partialObserver: n} = this;
                if (n.error)
                    try {
                        n.error(e)
                    } catch (r) {
                        Il(r)
                    }
                else
                    Il(e)
            }
            complete() {
                const {partialObserver: e} = this;
                if (e.complete)
                    try {
                        e.complete()
                    } catch (n) {
                        Il(n)
                    }
            }
        }
        class Oa extends pf {
            constructor(e, n, r) {
                let i;
                if (super(),
                Le(e) || !e)
                    i = {
                        next: e ?? void 0,
                        error: n ?? void 0,
                        complete: r ?? void 0
                    };
                else {
                    let o;
                    this && vo.useDeprecatedNextContext ? (o = Object.create(e),
                    o.unsubscribe = ()=>this.unsubscribe(),
                    i = {
                        next: e.next && gf(e.next, o),
                        error: e.error && gf(e.error, o),
                        complete: e.complete && gf(e.complete, o)
                    }) : i = e
                }
                this.destination = new rT(i)
            }
        }
        function Il(t) {
            vo.useDeprecatedSynchronousErrorHandling ? function tT(t) {
                vo.useDeprecatedSynchronousErrorHandling && Co && (Co.errorThrown = !0,
                Co.error = t)
            }(t) : yD(t)
        }
        function mf(t, e) {
            const {onStoppedNotification: n} = vo;
            n && Sl.setTimeout(()=>n(t, e))
        }
        const oT = {
            closed: !0,
            next: vD,
            error: function iT(t) {
                throw t
            },
            complete: vD
        }
          , Df = "function" == typeof Symbol && Symbol.observable || "@@observable";
        function wo(t) {
            return t
        }
        function CD(t) {
            return 0 === t.length ? wo : 1 === t.length ? t[0] : function(n) {
                return t.reduce((r,i)=>i(r), n)
            }
        }
        let yt = (()=>{
            class t {
                constructor(n) {
                    n && (this._subscribe = n)
                }
                lift(n) {
                    const r = new t;
                    return r.source = this,
                    r.operator = n,
                    r
                }
                subscribe(n, r, i) {
                    const o = function uT(t) {
                        return t && t instanceof pf || function aT(t) {
                            return t && Le(t.next) && Le(t.error) && Le(t.complete)
                        }(t) && DD(t)
                    }(n) ? n : new Oa(n,r,i);
                    return Tl(()=>{
                        const {operator: s, source: a} = this;
                        o.add(s ? s.call(o, a) : a ? this._subscribe(o) : this._trySubscribe(o))
                    }
                    ),
                    o
                }
                _trySubscribe(n) {
                    try {
                        return this._subscribe(n)
                    } catch (r) {
                        n.error(r)
                    }
                }
                forEach(n, r) {
                    return new (r = wD(r))((i,o)=>{
                        const s = new Oa({
                            next: a=>{
                                try {
                                    n(a)
                                } catch (u) {
                                    o(u),
                                    s.unsubscribe()
                                }
                            }
                            ,
                            error: o,
                            complete: i
                        });
                        this.subscribe(s)
                    }
                    )
                }
                _subscribe(n) {
                    var r;
                    return null === (r = this.source) || void 0 === r ? void 0 : r.subscribe(n)
                }
                [Df]() {
                    return this
                }
                pipe(...n) {
                    return CD(n)(this)
                }
                toPromise(n) {
                    return new (n = wD(n))((r,i)=>{
                        let o;
                        this.subscribe(s=>o = s, s=>i(s), ()=>r(o))
                    }
                    )
                }
            }
            return t.create = e=>new t(e),
            t
        }
        )();
        function wD(t) {
            var e;
            return null !== (e = t ?? vo.Promise) && void 0 !== e ? e : Promise
        }
        const lT = Ra(t=>function() {
            t(this),
            this.name = "ObjectUnsubscribedError",
            this.message = "object unsubscribed"
        }
        );
        let ui = (()=>{
            class t extends yt {
                constructor() {
                    super(),
                    this.closed = !1,
                    this.currentObservers = null,
                    this.observers = [],
                    this.isStopped = !1,
                    this.hasError = !1,
                    this.thrownError = null
                }
                lift(n) {
                    const r = new ED(this,this);
                    return r.operator = n,
                    r
                }
                _throwIfClosed() {
                    if (this.closed)
                        throw new lT
                }
                next(n) {
                    Tl(()=>{
                        if (this._throwIfClosed(),
                        !this.isStopped) {
                            this.currentObservers || (this.currentObservers = Array.from(this.observers));
                            for (const r of this.currentObservers)
                                r.next(n)
                        }
                    }
                    )
                }
                error(n) {
                    Tl(()=>{
                        if (this._throwIfClosed(),
                        !this.isStopped) {
                            this.hasError = this.isStopped = !0,
                            this.thrownError = n;
                            const {observers: r} = this;
                            for (; r.length; )
                                r.shift().error(n)
                        }
                    }
                    )
                }
                complete() {
                    Tl(()=>{
                        if (this._throwIfClosed(),
                        !this.isStopped) {
                            this.isStopped = !0;
                            const {observers: n} = this;
                            for (; n.length; )
                                n.shift().complete()
                        }
                    }
                    )
                }
                unsubscribe() {
                    this.isStopped = this.closed = !0,
                    this.observers = this.currentObservers = null
                }
                get observed() {
                    var n;
                    return (null === (n = this.observers) || void 0 === n ? void 0 : n.length) > 0
                }
                _trySubscribe(n) {
                    return this._throwIfClosed(),
                    super._trySubscribe(n)
                }
                _subscribe(n) {
                    return this._throwIfClosed(),
                    this._checkFinalizedStatuses(n),
                    this._innerSubscribe(n)
                }
                _innerSubscribe(n) {
                    const {hasError: r, isStopped: i, observers: o} = this;
                    return r || i ? mD : (this.currentObservers = null,
                    o.push(n),
                    new Kn(()=>{
                        this.currentObservers = null,
                        Pa(o, n)
                    }
                    ))
                }
                _checkFinalizedStatuses(n) {
                    const {hasError: r, thrownError: i, isStopped: o} = this;
                    r ? n.error(i) : o && n.complete()
                }
                asObservable() {
                    const n = new yt;
                    return n.source = this,
                    n
                }
            }
            return t.create = (e,n)=>new ED(e,n),
            t
        }
        )();
        class ED extends ui {
            constructor(e, n) {
                super(),
                this.destination = e,
                this.source = n
            }
            next(e) {
                var n, r;
                null === (r = null === (n = this.destination) || void 0 === n ? void 0 : n.next) || void 0 === r || r.call(n, e)
            }
            error(e) {
                var n, r;
                null === (r = null === (n = this.destination) || void 0 === n ? void 0 : n.error) || void 0 === r || r.call(n, e)
            }
            complete() {
                var e, n;
                null === (n = null === (e = this.destination) || void 0 === e ? void 0 : e.complete) || void 0 === n || n.call(e)
            }
            _subscribe(e) {
                var n, r;
                return null !== (r = null === (n = this.source) || void 0 === n ? void 0 : n.subscribe(e)) && void 0 !== r ? r : mD
            }
        }
        function bD(t) {
            return Le(t?.lift)
        }
        function Mt(t) {
            return e=>{
                if (bD(e))
                    return e.lift(function(n) {
                        try {
                            return t(n, this)
                        } catch (r) {
                            this.error(r)
                        }
                    });
                throw new TypeError("Unable to lift unknown Observable type")
            }
        }
        function xt(t, e, n, r, i) {
            return new cT(t,e,n,r,i)
        }
        class cT extends pf {
            constructor(e, n, r, i, o, s) {
                super(e),
                this.onFinalize = o,
                this.shouldUnsubscribe = s,
                this._next = n ? function(a) {
                    try {
                        n(a)
                    } catch (u) {
                        e.error(u)
                    }
                }
                : super._next,
                this._error = i ? function(a) {
                    try {
                        i(a)
                    } catch (u) {
                        e.error(u)
                    } finally {
                        this.unsubscribe()
                    }
                }
                : super._error,
                this._complete = r ? function() {
                    try {
                        r()
                    } catch (a) {
                        e.error(a)
                    } finally {
                        this.unsubscribe()
                    }
                }
                : super._complete
            }
            unsubscribe() {
                var e;
                if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                    const {closed: n} = this;
                    super.unsubscribe(),
                    !n && (null === (e = this.onFinalize) || void 0 === e || e.call(this))
                }
            }
        }
        function me(t, e) {
            return Mt((n,r)=>{
                let i = 0;
                n.subscribe(xt(r, o=>{
                    r.next(t.call(e, o, i++))
                }
                ))
            }
            )
        }
        function ji(t) {
            return this instanceof ji ? (this.v = t,
            this) : new ji(t)
        }
        function MD(t) {
            if (!Symbol.asyncIterator)
                throw new TypeError("Symbol.asyncIterator is not defined.");
            var n, e = t[Symbol.asyncIterator];
            return e ? e.call(t) : (t = function Cf(t) {
                var e = "function" == typeof Symbol && Symbol.iterator
                  , n = e && t[e]
                  , r = 0;
                if (n)
                    return n.call(t);
                if (t && "number" == typeof t.length)
                    return {
                        next: function() {
                            return t && r >= t.length && (t = void 0),
                            {
                                value: t && t[r++],
                                done: !t
                            }
                        }
                    };
                throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }(t),
            n = {},
            r("next"),
            r("throw"),
            r("return"),
            n[Symbol.asyncIterator] = function() {
                return this
            }
            ,
            n);
            function r(o) {
                n[o] = t[o] && function(s) {
                    return new Promise(function(a, u) {
                        !function i(o, s, a, u) {
                            Promise.resolve(u).then(function(l) {
                                o({
                                    value: l,
                                    done: a
                                })
                            }, s)
                        }(a, u, (s = t[o](s)).done, s.value)
                    }
                    )
                }
            }
        }
        "function" == typeof SuppressedError && SuppressedError;
        const xD = t=>t && "number" == typeof t.length && "function" != typeof t;
        function AD(t) {
            return Le(t?.then)
        }
        function FD(t) {
            return Le(t[Df])
        }
        function RD(t) {
            return Symbol.asyncIterator && Le(t?.[Symbol.asyncIterator])
        }
        function PD(t) {
            return new TypeError(`You provided ${null !== t && "object" == typeof t ? "an invalid object" : `'${t}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)
        }
        const OD = function RT() {
            return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
        }();
        function ND(t) {
            return Le(t?.[OD])
        }
        function kD(t) {
            return function ID(t, e, n) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var i, r = n.apply(t, e || []), o = [];
                return i = {},
                s("next"),
                s("throw"),
                s("return"),
                i[Symbol.asyncIterator] = function() {
                    return this
                }
                ,
                i;
                function s(f) {
                    r[f] && (i[f] = function(h) {
                        return new Promise(function(p, g) {
                            o.push([f, h, p, g]) > 1 || a(f, h)
                        }
                        )
                    }
                    )
                }
                function a(f, h) {
                    try {
                        !function u(f) {
                            f.value instanceof ji ? Promise.resolve(f.value.v).then(l, c) : d(o[0][2], f)
                        }(r[f](h))
                    } catch (p) {
                        d(o[0][3], p)
                    }
                }
                function l(f) {
                    a("next", f)
                }
                function c(f) {
                    a("throw", f)
                }
                function d(f, h) {
                    f(h),
                    o.shift(),
                    o.length && a(o[0][0], o[0][1])
                }
            }(this, arguments, function*() {
                const n = t.getReader();
                try {
                    for (; ; ) {
                        const {value: r, done: i} = yield ji(n.read());
                        if (i)
                            return yield ji(void 0);
                        yield yield ji(r)
                    }
                } finally {
                    n.releaseLock()
                }
            })
        }
        function LD(t) {
            return Le(t?.getReader)
        }
        function gr(t) {
            if (t instanceof yt)
                return t;
            if (null != t) {
                if (FD(t))
                    return function PT(t) {
                        return new yt(e=>{
                            const n = t[Df]();
                            if (Le(n.subscribe))
                                return n.subscribe(e);
                            throw new TypeError("Provided object does not correctly implement Symbol.observable")
                        }
                        )
                    }(t);
                if (xD(t))
                    return function OT(t) {
                        return new yt(e=>{
                            for (let n = 0; n < t.length && !e.closed; n++)
                                e.next(t[n]);
                            e.complete()
                        }
                        )
                    }(t);
                if (AD(t))
                    return function NT(t) {
                        return new yt(e=>{
                            t.then(n=>{
                                e.closed || (e.next(n),
                                e.complete())
                            }
                            , n=>e.error(n)).then(null, yD)
                        }
                        )
                    }(t);
                if (RD(t))
                    return BD(t);
                if (ND(t))
                    return function kT(t) {
                        return new yt(e=>{
                            for (const n of t)
                                if (e.next(n),
                                e.closed)
                                    return;
                            e.complete()
                        }
                        )
                    }(t);
                if (LD(t))
                    return function LT(t) {
                        return BD(kD(t))
                    }(t)
            }
            throw PD(t)
        }
        function BD(t) {
            return new yt(e=>{
                (function BT(t, e) {
                    var n, r, i, o;
                    return function SD(t, e, n, r) {
                        return new (n || (n = Promise))(function(o, s) {
                            function a(c) {
                                try {
                                    l(r.next(c))
                                } catch (d) {
                                    s(d)
                                }
                            }
                            function u(c) {
                                try {
                                    l(r.throw(c))
                                } catch (d) {
                                    s(d)
                                }
                            }
                            function l(c) {
                                c.done ? o(c.value) : function i(o) {
                                    return o instanceof n ? o : new n(function(s) {
                                        s(o)
                                    }
                                    )
                                }(c.value).then(a, u)
                            }
                            l((r = r.apply(t, e || [])).next())
                        }
                        )
                    }(this, void 0, void 0, function*() {
                        try {
                            for (n = MD(t); !(r = yield n.next()).done; )
                                if (e.next(r.value),
                                e.closed)
                                    return
                        } catch (s) {
                            i = {
                                error: s
                            }
                        } finally {
                            try {
                                r && !r.done && (o = n.return) && (yield o.call(n))
                            } finally {
                                if (i)
                                    throw i.error
                            }
                        }
                        e.complete()
                    })
                }
                )(t, e).catch(n=>e.error(n))
            }
            )
        }
        function li(t, e, n, r=0, i=!1) {
            const o = e.schedule(function() {
                n(),
                i ? t.add(this.schedule(null, r)) : this.unsubscribe()
            }, r);
            if (t.add(o),
            !i)
                return o
        }
        function Ot(t, e, n=1 / 0) {
            return Le(e) ? Ot((r,i)=>me((o,s)=>e(r, o, i, s))(gr(t(r, i))), n) : ("number" == typeof e && (n = e),
            Mt((r,i)=>function jT(t, e, n, r, i, o, s, a) {
                const u = [];
                let l = 0
                  , c = 0
                  , d = !1;
                const f = ()=>{
                    d && !u.length && !l && e.complete()
                }
                  , h = g=>l < r ? p(g) : u.push(g)
                  , p = g=>{
                    o && e.next(g),
                    l++;
                    let m = !1;
                    gr(n(g, c++)).subscribe(xt(e, _=>{
                        i?.(_),
                        o ? h(_) : e.next(_)
                    }
                    , ()=>{
                        m = !0
                    }
                    , void 0, ()=>{
                        if (m)
                            try {
                                for (l--; u.length && l < r; ) {
                                    const _ = u.shift();
                                    s ? li(e, s, ()=>p(_)) : p(_)
                                }
                                f()
                            } catch (_) {
                                e.error(_)
                            }
                    }
                    ))
                }
                ;
                return t.subscribe(xt(e, h, ()=>{
                    d = !0,
                    f()
                }
                )),
                ()=>{
                    a?.()
                }
            }(r, i, t, n)))
        }
        function us(t=1 / 0) {
            return Ot(wo, t)
        }
        const kr = new yt(t=>t.complete());
        function wf(t) {
            return t[t.length - 1]
        }
        function Na(t) {
            return function $T(t) {
                return t && Le(t.schedule)
            }(wf(t)) ? t.pop() : void 0
        }
        function jD(t, e=0) {
            return Mt((n,r)=>{
                n.subscribe(xt(r, i=>li(r, t, ()=>r.next(i), e), ()=>li(r, t, ()=>r.complete(), e), i=>li(r, t, ()=>r.error(i), e)))
            }
            )
        }
        function VD(t, e=0) {
            return Mt((n,r)=>{
                r.add(t.schedule(()=>n.subscribe(r), e))
            }
            )
        }
        function $D(t, e) {
            if (!t)
                throw new Error("Iterable cannot be null");
            return new yt(n=>{
                li(n, e, ()=>{
                    const r = t[Symbol.asyncIterator]();
                    li(n, e, ()=>{
                        r.next().then(i=>{
                            i.done ? n.complete() : n.next(i.value)
                        }
                        )
                    }
                    , 0, !0)
                }
                )
            }
            )
        }
        function vt(t, e) {
            return e ? function ZT(t, e) {
                if (null != t) {
                    if (FD(t))
                        return function zT(t, e) {
                            return gr(t).pipe(VD(e), jD(e))
                        }(t, e);
                    if (xD(t))
                        return function WT(t, e) {
                            return new yt(n=>{
                                let r = 0;
                                return e.schedule(function() {
                                    r === t.length ? n.complete() : (n.next(t[r++]),
                                    n.closed || this.schedule())
                                })
                            }
                            )
                        }(t, e);
                    if (AD(t))
                        return function GT(t, e) {
                            return gr(t).pipe(VD(e), jD(e))
                        }(t, e);
                    if (RD(t))
                        return $D(t, e);
                    if (ND(t))
                        return function qT(t, e) {
                            return new yt(n=>{
                                let r;
                                return li(n, e, ()=>{
                                    r = t[OD](),
                                    li(n, e, ()=>{
                                        let i, o;
                                        try {
                                            ({value: i, done: o} = r.next())
                                        } catch (s) {
                                            return void n.error(s)
                                        }
                                        o ? n.complete() : n.next(i)
                                    }
                                    , 0, !0)
                                }
                                ),
                                ()=>Le(r?.return) && r.return()
                            }
                            )
                        }(t, e);
                    if (LD(t))
                        return function YT(t, e) {
                            return $D(kD(t), e)
                        }(t, e)
                }
                throw PD(t)
            }(t, e) : gr(t)
        }
        function Ef(t, e, ...n) {
            if (!0 === e)
                return void t();
            if (!1 === e)
                return;
            const r = new Oa({
                next: ()=>{
                    r.unsubscribe(),
                    t()
                }
            });
            return gr(e(...n)).subscribe(r)
        }
        function Pe(t) {
            for (let e in t)
                if (t[e] === Pe)
                    return e;
            throw Error("Could not find renamed property on target object.")
        }
        function Be(t) {
            if ("string" == typeof t)
                return t;
            if (Array.isArray(t))
                return "[" + t.map(Be).join(", ") + "]";
            if (null == t)
                return "" + t;
            if (t.overriddenName)
                return `${t.overriddenName}`;
            if (t.name)
                return `${t.name}`;
            const e = t.toString();
            if (null == e)
                return "" + e;
            const n = e.indexOf("\n");
            return -1 === n ? e : e.substring(0, n)
        }
        function Sf(t, e) {
            return null == t || "" === t ? null === e ? "" : e : null == e || "" === e ? t : t + " " + e
        }
        const XT = Pe({
            __forward_ref__: Pe
        });
        function Tf(t) {
            return t.__forward_ref__ = Tf,
            t.toString = function() {
                return Be(this())
            }
            ,
            t
        }
        function z(t) {
            return If(t) ? t() : t
        }
        function If(t) {
            return "function" == typeof t && t.hasOwnProperty(XT) && t.__forward_ref__ === Tf
        }
        function Mf(t) {
            return t && !!t.\u0275providers
        }
        class P extends Error {
            constructor(e, n) {
                super(Ml(e, n)),
                this.code = e
            }
        }
        function Ml(t, e) {
            return `NG0${Math.abs(t)}${e ? ": " + e.trim() : ""}`
        }
        function Te(t) {
            return "function" == typeof t ? t.name || t.toString() : "object" == typeof t && null != t && "function" == typeof t.type ? t.type.name || t.type.toString() : function J(t) {
                return "string" == typeof t ? t : null == t ? "" : String(t)
            }(t)
        }
        function xl(t, e) {
            throw new P(-201,!1)
        }
        function Xn(t, e) {
            null == t && function Ie(t, e, n, r) {
                throw new Error(`ASSERTION ERROR: ${t}` + (null == r ? "" : ` [Expected=> ${n} ${r} ${e} <=Actual]`))
            }(e, t, null, "!=")
        }
        function Q(t) {
            return {
                token: t.token,
                providedIn: t.providedIn || null,
                factory: t.factory,
                value: void 0
            }
        }
        function ci(t) {
            return {
                providers: t.providers || [],
                imports: t.imports || []
            }
        }
        function Al(t) {
            return HD(t, Fl) || HD(t, GD)
        }
        function HD(t, e) {
            return t.hasOwnProperty(e) ? t[e] : null
        }
        function zD(t) {
            return t && (t.hasOwnProperty(xf) || t.hasOwnProperty(sI)) ? t[xf] : null
        }
        const Fl = Pe({
            \u0275prov: Pe
        })
          , xf = Pe({
            \u0275inj: Pe
        })
          , GD = Pe({
            ngInjectableDef: Pe
        })
          , sI = Pe({
            ngInjectorDef: Pe
        });
        var G = (()=>((G = G || {})[G.Default = 0] = "Default",
        G[G.Host = 1] = "Host",
        G[G.Self = 2] = "Self",
        G[G.SkipSelf = 4] = "SkipSelf",
        G[G.Optional = 8] = "Optional",
        G))();
        let Af;
        function Jn(t) {
            const e = Af;
            return Af = t,
            e
        }
        function WD(t, e, n) {
            const r = Al(t);
            return r && "root" == r.providedIn ? void 0 === r.value ? r.value = r.factory() : r.value : n & G.Optional ? null : void 0 !== e ? e : void xl(Be(t))
        }
        const $e = (()=>typeof globalThis < "u" && globalThis || typeof global < "u" && global || typeof window < "u" && window || typeof self < "u" && typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && self)()
          , ka = {}
          , Ff = "__NG_DI_FLAG__"
          , Rl = "ngTempTokenPath"
          , uI = "ngTokenPath"
          , lI = /\n/gm
          , cI = "\u0275"
          , qD = "__source";
        let La;
        function ls(t) {
            const e = La;
            return La = t,
            e
        }
        function dI(t, e=G.Default) {
            if (void 0 === La)
                throw new P(-203,!1);
            return null === La ? WD(t, void 0, e) : La.get(t, e & G.Optional ? null : void 0, e)
        }
        function W(t, e=G.Default) {
            return (function aI() {
                return Af
            }() || dI)(z(t), e)
        }
        function De(t, e=G.Default) {
            return W(t, Pl(e))
        }
        function Pl(t) {
            return typeof t > "u" || "number" == typeof t ? t : 0 | (t.optional && 8) | (t.host && 1) | (t.self && 2) | (t.skipSelf && 4)
        }
        function Rf(t) {
            const e = [];
            for (let n = 0; n < t.length; n++) {
                const r = z(t[n]);
                if (Array.isArray(r)) {
                    if (0 === r.length)
                        throw new P(900,!1);
                    let i, o = G.Default;
                    for (let s = 0; s < r.length; s++) {
                        const a = r[s]
                          , u = fI(a);
                        "number" == typeof u ? -1 === u ? i = a.token : o |= u : i = a
                    }
                    e.push(W(i, o))
                } else
                    e.push(W(r))
            }
            return e
        }
        function Ba(t, e) {
            return t[Ff] = e,
            t.prototype[Ff] = e,
            t
        }
        function fI(t) {
            return t[Ff]
        }
        function di(t) {
            return {
                toString: t
            }.toString()
        }
        var Lr = (()=>((Lr = Lr || {})[Lr.OnPush = 0] = "OnPush",
        Lr[Lr.Default = 1] = "Default",
        Lr))()
          , Br = (()=>{
            return (t = Br || (Br = {}))[t.Emulated = 0] = "Emulated",
            t[t.None = 2] = "None",
            t[t.ShadowDom = 3] = "ShadowDom",
            Br;
            var t
        }
        )();
        const fi = {}
          , Se = []
          , Ol = Pe({
            \u0275cmp: Pe
        })
          , Pf = Pe({
            \u0275dir: Pe
        })
          , Of = Pe({
            \u0275pipe: Pe
        })
          , ZD = Pe({
            \u0275mod: Pe
        })
          , hi = Pe({
            \u0275fac: Pe
        })
          , ja = Pe({
            __NG_ELEMENT_ID__: Pe
        });
        let gI = 0;
        function jr(t) {
            return di(()=>{
                const e = KD(t)
                  , n = {
                    ...e,
                    decls: t.decls,
                    vars: t.vars,
                    template: t.template,
                    consts: t.consts || null,
                    ngContentSelectors: t.ngContentSelectors,
                    onPush: t.changeDetection === Lr.OnPush,
                    directiveDefs: null,
                    pipeDefs: null,
                    dependencies: e.standalone && t.dependencies || null,
                    getStandaloneInjector: null,
                    data: t.data || {},
                    encapsulation: t.encapsulation || Br.Emulated,
                    id: "c" + gI++,
                    styles: t.styles || Se,
                    _: null,
                    schemas: t.schemas || null,
                    tView: null
                };
                XD(n);
                const r = t.dependencies;
                return n.directiveDefs = Nl(r, !1),
                n.pipeDefs = Nl(r, !0),
                n
            }
            )
        }
        function DI(t) {
            return Me(t) || Ut(t)
        }
        function _I(t) {
            return null !== t
        }
        function $i(t) {
            return di(()=>({
                type: t.type,
                bootstrap: t.bootstrap || Se,
                declarations: t.declarations || Se,
                imports: t.imports || Se,
                exports: t.exports || Se,
                transitiveCompileScopes: null,
                schemas: t.schemas || null,
                id: t.id || null
            }))
        }
        function QD(t, e) {
            if (null == t)
                return fi;
            const n = {};
            for (const r in t)
                if (t.hasOwnProperty(r)) {
                    let i = t[r]
                      , o = i;
                    Array.isArray(i) && (o = i[1],
                    i = i[0]),
                    n[i] = r,
                    e && (e[i] = o)
                }
            return n
        }
        function en(t) {
            return di(()=>{
                const e = KD(t);
                return XD(e),
                e
            }
            )
        }
        function Me(t) {
            return t[Ol] || null
        }
        function Ut(t) {
            return t[Pf] || null
        }
        function yn(t) {
            return t[Of] || null
        }
        function Pn(t, e) {
            const n = t[ZD] || null;
            if (!n && !0 === e)
                throw new Error(`Type ${Be(t)} does not have '\u0275mod' property.`);
            return n
        }
        function KD(t) {
            const e = {};
            return {
                type: t.type,
                providersResolver: null,
                factory: null,
                hostBindings: t.hostBindings || null,
                hostVars: t.hostVars || 0,
                hostAttrs: t.hostAttrs || null,
                contentQueries: t.contentQueries || null,
                declaredInputs: e,
                exportAs: t.exportAs || null,
                standalone: !0 === t.standalone,
                selectors: t.selectors || Se,
                viewQuery: t.viewQuery || null,
                features: t.features || null,
                setInput: null,
                findHostDirectiveDefs: null,
                hostDirectives: null,
                inputs: QD(t.inputs, e),
                outputs: QD(t.outputs)
            }
        }
        function XD(t) {
            t.features?.forEach(e=>e(t))
        }
        function Nl(t, e) {
            if (!t)
                return null;
            const n = e ? yn : DI;
            return ()=>("function" == typeof t ? t() : t).map(r=>n(r)).filter(_I)
        }
        const pi = 0
          , N = 1
          , oe = 2
          , Qe = 3
          , mr = 4
          , Eo = 5
          , Ht = 6
          , ds = 7
          , ot = 8
          , kl = 9
          , Ll = 10
          , ue = 11
          , Nf = 12
          , Va = 13
          , JD = 14
          , fs = 15
          , zt = 16
          , $a = 17
          , hs = 18
          , Vr = 19
          , Ua = 20
          , e_ = 21
          , Ue = 22
          , kf = 1
          , t_ = 2
          , Bl = 7
          , jl = 8
          , ps = 9
          , tn = 10;
        function On(t) {
            return Array.isArray(t) && "object" == typeof t[kf]
        }
        function Dr(t) {
            return Array.isArray(t) && !0 === t[kf]
        }
        function Lf(t) {
            return 0 != (4 & t.flags)
        }
        function Ha(t) {
            return t.componentOffset > -1
        }
        function _r(t) {
            return !!t.template
        }
        function vI(t) {
            return 0 != (256 & t[oe])
        }
        function bo(t, e) {
            return t.hasOwnProperty(hi) ? t[hi] : null
        }
        class EI {
            constructor(e, n, r) {
                this.previousValue = e,
                this.currentValue = n,
                this.firstChange = r
            }
            isFirstChange() {
                return this.firstChange
            }
        }
        function So() {
            return i_
        }
        function i_(t) {
            return t.type.prototype.ngOnChanges && (t.setInput = SI),
            bI
        }
        function bI() {
            const t = s_(this)
              , e = t?.current;
            if (e) {
                const n = t.previous;
                if (n === fi)
                    t.previous = e;
                else
                    for (let r in e)
                        n[r] = e[r];
                t.current = null,
                this.ngOnChanges(e)
            }
        }
        function SI(t, e, n, r) {
            const i = this.declaredInputs[n]
              , o = s_(t) || function TI(t, e) {
                return t[o_] = e
            }(t, {
                previous: fi,
                current: null
            })
              , s = o.current || (o.current = {})
              , a = o.previous
              , u = a[i];
            s[i] = new EI(u && u.currentValue,e,a === fi),
            t[r] = e
        }
        So.ngInherit = !0;
        const o_ = "__ngSimpleChanges__";
        function s_(t) {
            return t[o_] || null
        }
        const er = function(t, e, n) {};
        function Nt(t) {
            for (; Array.isArray(t); )
                t = t[pi];
            return t
        }
        function Nn(t, e) {
            return Nt(e[t.index])
        }
        function vn(t, e) {
            const n = e[t];
            return On(n) ? n : n[pi]
        }
        function Ul(t) {
            return 64 == (64 & t[oe])
        }
        function Ui(t, e) {
            return null == e ? null : t[e]
        }
        function c_(t) {
            t[hs] = 0
        }
        function jf(t, e) {
            t[Eo] += e;
            let n = t
              , r = t[Qe];
            for (; null !== r && (1 === e && 1 === n[Eo] || -1 === e && 0 === n[Eo]); )
                r[Eo] += e,
                n = r,
                r = r[Qe]
        }
        const ee = {
            lFrame: v_(null),
            bindingsEnabled: !0
        };
        function f_() {
            return ee.bindingsEnabled
        }
        function I() {
            return ee.lFrame.lView
        }
        function Ce() {
            return ee.lFrame.tView
        }
        function kt() {
            let t = h_();
            for (; null !== t && 64 === t.type; )
                t = t.parent;
            return t
        }
        function h_() {
            return ee.lFrame.currentTNode
        }
        function $r(t, e) {
            const n = ee.lFrame;
            n.currentTNode = t,
            n.isParent = e
        }
        function Vf() {
            return ee.lFrame.isParent
        }
        function $I(t, e) {
            const n = ee.lFrame;
            n.bindingIndex = n.bindingRootIndex = t,
            Uf(e)
        }
        function Uf(t) {
            ee.lFrame.currentDirectiveIndex = t
        }
        function zf(t) {
            ee.lFrame.currentQueryIndex = t
        }
        function HI(t) {
            const e = t[N];
            return 2 === e.type ? e.declTNode : 1 === e.type ? t[Ht] : null
        }
        function __(t, e, n) {
            if (n & G.SkipSelf) {
                let i = e
                  , o = t;
                for (; !(i = i.parent,
                null !== i || n & G.Host || (i = HI(o),
                null === i || (o = o[fs],
                10 & i.type))); )
                    ;
                if (null === i)
                    return !1;
                e = i,
                t = o
            }
            const r = ee.lFrame = y_();
            return r.currentTNode = e,
            r.lView = t,
            !0
        }
        function Gf(t) {
            const e = y_()
              , n = t[N];
            ee.lFrame = e,
            e.currentTNode = n.firstChild,
            e.lView = t,
            e.tView = n,
            e.contextLView = t,
            e.bindingIndex = n.bindingStartIndex,
            e.inI18n = !1
        }
        function y_() {
            const t = ee.lFrame
              , e = null === t ? null : t.child;
            return null === e ? v_(t) : e
        }
        function v_(t) {
            const e = {
                currentTNode: null,
                isParent: !0,
                lView: null,
                tView: null,
                selectedIndex: -1,
                contextLView: null,
                elementDepthCount: 0,
                currentNamespace: null,
                currentDirectiveIndex: -1,
                bindingRootIndex: -1,
                bindingIndex: -1,
                currentQueryIndex: 0,
                parent: t,
                child: null,
                inI18n: !1
            };
            return null !== t && (t.child = e),
            e
        }
        function C_() {
            const t = ee.lFrame;
            return ee.lFrame = t.parent,
            t.currentTNode = null,
            t.lView = null,
            t
        }
        const w_ = C_;
        function Wf() {
            const t = C_();
            t.isParent = !0,
            t.tView = null,
            t.selectedIndex = -1,
            t.contextLView = null,
            t.elementDepthCount = 0,
            t.currentDirectiveIndex = -1,
            t.currentNamespace = null,
            t.bindingRootIndex = -1,
            t.bindingIndex = -1,
            t.currentQueryIndex = 0
        }
        function To(t) {
            ee.lFrame.selectedIndex = t
        }
        function Hl(t, e) {
            for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
                const o = t.data[n].type.prototype
                  , {ngAfterContentInit: s, ngAfterContentChecked: a, ngAfterViewInit: u, ngAfterViewChecked: l, ngOnDestroy: c} = o;
                s && (t.contentHooks ?? (t.contentHooks = [])).push(-n, s),
                a && ((t.contentHooks ?? (t.contentHooks = [])).push(n, a),
                (t.contentCheckHooks ?? (t.contentCheckHooks = [])).push(n, a)),
                u && (t.viewHooks ?? (t.viewHooks = [])).push(-n, u),
                l && ((t.viewHooks ?? (t.viewHooks = [])).push(n, l),
                (t.viewCheckHooks ?? (t.viewCheckHooks = [])).push(n, l)),
                null != c && (t.destroyHooks ?? (t.destroyHooks = [])).push(n, c)
            }
        }
        function zl(t, e, n) {
            E_(t, e, 3, n)
        }
        function Gl(t, e, n, r) {
            (3 & t[oe]) === n && E_(t, e, n, r)
        }
        function qf(t, e) {
            let n = t[oe];
            (3 & n) === e && (n &= 2047,
            n += 1,
            t[oe] = n)
        }
        function E_(t, e, n, r) {
            const o = r ?? -1
              , s = e.length - 1;
            let a = 0;
            for (let u = void 0 !== r ? 65535 & t[hs] : 0; u < s; u++)
                if ("number" == typeof e[u + 1]) {
                    if (a = e[u],
                    null != r && a >= r)
                        break
                } else
                    e[u] < 0 && (t[hs] += 65536),
                    (a < o || -1 == o) && (XI(t, n, e, u),
                    t[hs] = (4294901760 & t[hs]) + u + 2),
                    u++
        }
        function XI(t, e, n, r) {
            const i = n[r] < 0
              , o = n[r + 1]
              , a = t[i ? -n[r] : n[r]];
            if (i) {
                if (t[oe] >> 11 < t[hs] >> 16 && (3 & t[oe]) === e) {
                    t[oe] += 2048,
                    er(4, a, o);
                    try {
                        o.call(a)
                    } finally {
                        er(5, a, o)
                    }
                }
            } else {
                er(4, a, o);
                try {
                    o.call(a)
                } finally {
                    er(5, a, o)
                }
            }
        }
        const Ds = -1;
        class Ga {
            constructor(e, n, r) {
                this.factory = e,
                this.resolving = !1,
                this.canSeeViewProviders = n,
                this.injectImpl = r
            }
        }
        function Zf(t, e, n) {
            let r = 0;
            for (; r < n.length; ) {
                const i = n[r];
                if ("number" == typeof i) {
                    if (0 !== i)
                        break;
                    r++;
                    const o = n[r++]
                      , s = n[r++]
                      , a = n[r++];
                    t.setAttribute(e, s, a, o)
                } else {
                    const o = i
                      , s = n[++r];
                    S_(o) ? t.setProperty(e, o, s) : t.setAttribute(e, o, s),
                    r++
                }
            }
            return r
        }
        function b_(t) {
            return 3 === t || 4 === t || 6 === t
        }
        function S_(t) {
            return 64 === t.charCodeAt(0)
        }
        function Wa(t, e) {
            if (null !== e && 0 !== e.length)
                if (null === t || 0 === t.length)
                    t = e.slice();
                else {
                    let n = -1;
                    for (let r = 0; r < e.length; r++) {
                        const i = e[r];
                        "number" == typeof i ? n = i : 0 === n || T_(t, n, i, null, -1 === n || 2 === n ? e[++r] : null)
                    }
                }
            return t
        }
        function T_(t, e, n, r, i) {
            let o = 0
              , s = t.length;
            if (-1 === e)
                s = -1;
            else
                for (; o < t.length; ) {
                    const a = t[o++];
                    if ("number" == typeof a) {
                        if (a === e) {
                            s = -1;
                            break
                        }
                        if (a > e) {
                            s = o - 1;
                            break
                        }
                    }
                }
            for (; o < t.length; ) {
                const a = t[o];
                if ("number" == typeof a)
                    break;
                if (a === n) {
                    if (null === r)
                        return void (null !== i && (t[o + 1] = i));
                    if (r === t[o + 1])
                        return void (t[o + 2] = i)
                }
                o++,
                null !== r && o++,
                null !== i && o++
            }
            -1 !== s && (t.splice(s, 0, e),
            o = s + 1),
            t.splice(o++, 0, n),
            null !== r && t.splice(o++, 0, r),
            null !== i && t.splice(o++, 0, i)
        }
        function I_(t) {
            return t !== Ds
        }
        function Wl(t) {
            return 32767 & t
        }
        function ql(t, e) {
            let n = function nM(t) {
                return t >> 16
            }(t)
              , r = e;
            for (; n > 0; )
                r = r[fs],
                n--;
            return r
        }
        let Qf = !0;
        function Yl(t) {
            const e = Qf;
            return Qf = t,
            e
        }
        const M_ = 255
          , x_ = 5;
        let rM = 0;
        const Ur = {};
        function Zl(t, e) {
            const n = A_(t, e);
            if (-1 !== n)
                return n;
            const r = e[N];
            r.firstCreatePass && (t.injectorIndex = e.length,
            Kf(r.data, t),
            Kf(e, null),
            Kf(r.blueprint, null));
            const i = Xf(t, e)
              , o = t.injectorIndex;
            if (I_(i)) {
                const s = Wl(i)
                  , a = ql(i, e)
                  , u = a[N].data;
                for (let l = 0; l < 8; l++)
                    e[o + l] = a[s + l] | u[s + l]
            }
            return e[o + 8] = i,
            o
        }
        function Kf(t, e) {
            t.push(0, 0, 0, 0, 0, 0, 0, 0, e)
        }
        function A_(t, e) {
            return -1 === t.injectorIndex || t.parent && t.parent.injectorIndex === t.injectorIndex || null === e[t.injectorIndex + 8] ? -1 : t.injectorIndex
        }
        function Xf(t, e) {
            if (t.parent && -1 !== t.parent.injectorIndex)
                return t.parent.injectorIndex;
            let n = 0
              , r = null
              , i = e;
            for (; null !== i; ) {
                if (r = B_(i),
                null === r)
                    return Ds;
                if (n++,
                i = i[fs],
                -1 !== r.injectorIndex)
                    return r.injectorIndex | n << 16
            }
            return Ds
        }
        function Jf(t, e, n) {
            !function iM(t, e, n) {
                let r;
                "string" == typeof n ? r = n.charCodeAt(0) || 0 : n.hasOwnProperty(ja) && (r = n[ja]),
                null == r && (r = n[ja] = rM++);
                const i = r & M_;
                e.data[t + (i >> x_)] |= 1 << i
            }(t, e, n)
        }
        function F_(t, e, n) {
            if (n & G.Optional || void 0 !== t)
                return t;
            xl()
        }
        function R_(t, e, n, r) {
            if (n & G.Optional && void 0 === r && (r = null),
            !(n & (G.Self | G.Host))) {
                const i = t[kl]
                  , o = Jn(void 0);
                try {
                    return i ? i.get(e, r, n & G.Optional) : WD(e, r, n & G.Optional)
                } finally {
                    Jn(o)
                }
            }
            return F_(r, 0, n)
        }
        function P_(t, e, n, r=G.Default, i) {
            if (null !== t) {
                if (1024 & e[oe]) {
                    const s = function lM(t, e, n, r, i) {
                        let o = t
                          , s = e;
                        for (; null !== o && null !== s && 1024 & s[oe] && !(256 & s[oe]); ) {
                            const a = O_(o, s, n, r | G.Self, Ur);
                            if (a !== Ur)
                                return a;
                            let u = o.parent;
                            if (!u) {
                                const l = s[e_];
                                if (l) {
                                    const c = l.get(n, Ur, r);
                                    if (c !== Ur)
                                        return c
                                }
                                u = B_(s),
                                s = s[fs]
                            }
                            o = u
                        }
                        return i
                    }(t, e, n, r, Ur);
                    if (s !== Ur)
                        return s
                }
                const o = O_(t, e, n, r, Ur);
                if (o !== Ur)
                    return o
            }
            return R_(e, n, r, i)
        }
        function O_(t, e, n, r, i) {
            const o = function aM(t) {
                if ("string" == typeof t)
                    return t.charCodeAt(0) || 0;
                const e = t.hasOwnProperty(ja) ? t[ja] : void 0;
                return "number" == typeof e ? e >= 0 ? e & M_ : uM : e
            }(n);
            if ("function" == typeof o) {
                if (!__(e, t, r))
                    return r & G.Host ? F_(i, 0, r) : R_(e, n, r, i);
                try {
                    const s = o(r);
                    if (null != s || r & G.Optional)
                        return s;
                    xl()
                } finally {
                    w_()
                }
            } else if ("number" == typeof o) {
                let s = null
                  , a = A_(t, e)
                  , u = Ds
                  , l = r & G.Host ? e[zt][Ht] : null;
                for ((-1 === a || r & G.SkipSelf) && (u = -1 === a ? Xf(t, e) : e[a + 8],
                u !== Ds && k_(r, !1) ? (s = e[N],
                a = Wl(u),
                e = ql(u, e)) : a = -1); -1 !== a; ) {
                    const c = e[N];
                    if (N_(o, a, c.data)) {
                        const d = sM(a, e, n, s, r, l);
                        if (d !== Ur)
                            return d
                    }
                    u = e[a + 8],
                    u !== Ds && k_(r, e[N].data[a + 8] === l) && N_(o, a, e) ? (s = c,
                    a = Wl(u),
                    e = ql(u, e)) : a = -1
                }
            }
            return i
        }
        function sM(t, e, n, r, i, o) {
            const s = e[N]
              , a = s.data[t + 8]
              , c = function Ql(t, e, n, r, i) {
                const o = t.providerIndexes
                  , s = e.data
                  , a = 1048575 & o
                  , u = t.directiveStart
                  , c = o >> 20
                  , f = i ? a + c : t.directiveEnd;
                for (let h = r ? a : a + c; h < f; h++) {
                    const p = s[h];
                    if (h < u && n === p || h >= u && p.type === n)
                        return h
                }
                if (i) {
                    const h = s[u];
                    if (h && _r(h) && h.type === n)
                        return u
                }
                return null
            }(a, s, n, null == r ? Ha(a) && Qf : r != s && 0 != (3 & a.type), i & G.Host && o === a);
            return null !== c ? Io(e, s, c, a) : Ur
        }
        function Io(t, e, n, r) {
            let i = t[n];
            const o = e.data;
            if (function JI(t) {
                return t instanceof Ga
            }(i)) {
                const s = i;
                s.resolving && function JT(t, e) {
                    const n = e ? `. Dependency path: ${e.join(" > ")} > ${t}` : "";
                    throw new P(-200,`Circular dependency in DI detected for ${t}${n}`)
                }(Te(o[n]));
                const a = Yl(s.canSeeViewProviders);
                s.resolving = !0;
                const u = s.injectImpl ? Jn(s.injectImpl) : null;
                __(t, r, G.Default);
                try {
                    i = t[n] = s.factory(void 0, o, t, r),
                    e.firstCreatePass && n >= r.directiveStart && function KI(t, e, n) {
                        const {ngOnChanges: r, ngOnInit: i, ngDoCheck: o} = e.type.prototype;
                        if (r) {
                            const s = i_(e);
                            (n.preOrderHooks ?? (n.preOrderHooks = [])).push(t, s),
                            (n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])).push(t, s)
                        }
                        i && (n.preOrderHooks ?? (n.preOrderHooks = [])).push(0 - t, i),
                        o && ((n.preOrderHooks ?? (n.preOrderHooks = [])).push(t, o),
                        (n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])).push(t, o))
                    }(n, o[n], e)
                } finally {
                    null !== u && Jn(u),
                    Yl(a),
                    s.resolving = !1,
                    w_()
                }
            }
            return i
        }
        function N_(t, e, n) {
            return !!(n[e + (t >> x_)] & 1 << t)
        }
        function k_(t, e) {
            return !(t & G.Self || t & G.Host && e)
        }
        class _s {
            constructor(e, n) {
                this._tNode = e,
                this._lView = n
            }
            get(e, n, r) {
                return P_(this._tNode, this._lView, e, Pl(r), n)
            }
        }
        function uM() {
            return new _s(kt(),I())
        }
        function eh(t) {
            return If(t) ? ()=>{
                const e = eh(z(t));
                return e && e()
            }
            : bo(t)
        }
        function B_(t) {
            const e = t[N]
              , n = e.type;
            return 2 === n ? e.declTNode : 1 === n ? t[Ht] : null
        }
        const vs = "__parameters__";
        function ws(t, e, n) {
            return di(()=>{
                const r = function th(t) {
                    return function(...n) {
                        if (t) {
                            const r = t(...n);
                            for (const i in r)
                                this[i] = r[i]
                        }
                    }
                }(e);
                function i(...o) {
                    if (this instanceof i)
                        return r.apply(this, o),
                        this;
                    const s = new i(...o);
                    return a.annotation = s,
                    a;
                    function a(u, l, c) {
                        const d = u.hasOwnProperty(vs) ? u[vs] : Object.defineProperty(u, vs, {
                            value: []
                        })[vs];
                        for (; d.length <= c; )
                            d.push(null);
                        return (d[c] = d[c] || []).push(s),
                        u
                    }
                }
                return n && (i.prototype = Object.create(n.prototype)),
                i.prototype.ngMetadataName = t,
                i.annotationCls = i,
                i
            }
            )
        }
        class K {
            constructor(e, n) {
                this._desc = e,
                this.ngMetadataName = "InjectionToken",
                this.\u0275prov = void 0,
                "number" == typeof n ? this.__NG_ELEMENT_ID__ = n : void 0 !== n && (this.\u0275prov = Q({
                    token: this,
                    providedIn: n.providedIn || "root",
                    factory: n.factory
                }))
            }
            get multi() {
                return this
            }
            toString() {
                return `InjectionToken ${this._desc}`
            }
        }
        function Mo(t, e) {
            t.forEach(n=>Array.isArray(n) ? Mo(n, e) : e(n))
        }
        function V_(t, e, n) {
            e >= t.length ? t.push(n) : t.splice(e, 0, n)
        }
        function Xl(t, e) {
            return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0]
        }
        const Qa = Ba(ws("Optional"), 8)
          , Ka = Ba(ws("SkipSelf"), 4);
        var Cn = (()=>((Cn = Cn || {})[Cn.Important = 1] = "Important",
        Cn[Cn.DashCase = 2] = "DashCase",
        Cn))();
        const lh = new Map;
        let NM = 0;
        const dh = "__ngContext__";
        function Gt(t, e) {
            On(e) ? (t[dh] = e[Ua],
            function LM(t) {
                lh.set(t[Ua], t)
            }(e)) : t[dh] = e
        }
        let fh;
        function hh(t, e) {
            return fh(t, e)
        }
        function tu(t) {
            const e = t[Qe];
            return Dr(e) ? e[Qe] : e
        }
        function ph(t) {
            return ay(t[Va])
        }
        function gh(t) {
            return ay(t[mr])
        }
        function ay(t) {
            for (; null !== t && !Dr(t); )
                t = t[mr];
            return t
        }
        function Ss(t, e, n, r, i) {
            if (null != r) {
                let o, s = !1;
                Dr(r) ? o = r : On(r) && (s = !0,
                r = r[pi]);
                const a = Nt(r);
                0 === t && null !== n ? null == i ? hy(e, n, a) : xo(e, n, a, i || null, !0) : 1 === t && null !== n ? xo(e, n, a, i || null, !0) : 2 === t ? function wh(t, e, n) {
                    const r = nc(t, e);
                    r && function rx(t, e, n, r) {
                        t.removeChild(e, n, r)
                    }(t, r, e, n)
                }(e, a, s) : 3 === t && e.destroyNode(a),
                null != o && function sx(t, e, n, r, i) {
                    const o = n[Bl];
                    o !== Nt(n) && Ss(e, t, r, o, i);
                    for (let a = tn; a < n.length; a++) {
                        const u = n[a];
                        nu(u[N], u, t, e, r, o)
                    }
                }(e, t, o, n, i)
            }
        }
        function Dh(t, e, n) {
            return t.createElement(e, n)
        }
        function ly(t, e) {
            const n = t[ps]
              , r = n.indexOf(e)
              , i = e[Qe];
            512 & e[oe] && (e[oe] &= -513,
            jf(i, -1)),
            n.splice(r, 1)
        }
        function _h(t, e) {
            if (t.length <= tn)
                return;
            const n = tn + e
              , r = t[n];
            if (r) {
                const i = r[$a];
                null !== i && i !== t && ly(i, r),
                e > 0 && (t[n - 1][mr] = r[mr]);
                const o = Xl(t, tn + e);
                !function ZM(t, e) {
                    nu(t, e, e[ue], 2, null, null),
                    e[pi] = null,
                    e[Ht] = null
                }(r[N], r);
                const s = o[Vr];
                null !== s && s.detachView(o[N]),
                r[Qe] = null,
                r[mr] = null,
                r[oe] &= -65
            }
            return r
        }
        function cy(t, e) {
            if (!(128 & e[oe])) {
                const n = e[ue];
                n.destroyNode && nu(t, e, n, 3, null, null),
                function XM(t) {
                    let e = t[Va];
                    if (!e)
                        return yh(t[N], t);
                    for (; e; ) {
                        let n = null;
                        if (On(e))
                            n = e[Va];
                        else {
                            const r = e[tn];
                            r && (n = r)
                        }
                        if (!n) {
                            for (; e && !e[mr] && e !== t; )
                                On(e) && yh(e[N], e),
                                e = e[Qe];
                            null === e && (e = t),
                            On(e) && yh(e[N], e),
                            n = e && e[mr]
                        }
                        e = n
                    }
                }(e)
            }
        }
        function yh(t, e) {
            if (!(128 & e[oe])) {
                e[oe] &= -65,
                e[oe] |= 128,
                function nx(t, e) {
                    let n;
                    if (null != t && null != (n = t.destroyHooks))
                        for (let r = 0; r < n.length; r += 2) {
                            const i = e[n[r]];
                            if (!(i instanceof Ga)) {
                                const o = n[r + 1];
                                if (Array.isArray(o))
                                    for (let s = 0; s < o.length; s += 2) {
                                        const a = i[o[s]]
                                          , u = o[s + 1];
                                        er(4, a, u);
                                        try {
                                            u.call(a)
                                        } finally {
                                            er(5, a, u)
                                        }
                                    }
                                else {
                                    er(4, i, o);
                                    try {
                                        o.call(i)
                                    } finally {
                                        er(5, i, o)
                                    }
                                }
                            }
                        }
                }(t, e),
                function tx(t, e) {
                    const n = t.cleanup
                      , r = e[ds];
                    let i = -1;
                    if (null !== n)
                        for (let o = 0; o < n.length - 1; o += 2)
                            if ("string" == typeof n[o]) {
                                const s = n[o + 3];
                                s >= 0 ? r[i = s]() : r[i = -s].unsubscribe(),
                                o += 2
                            } else {
                                const s = r[i = n[o + 1]];
                                n[o].call(s)
                            }
                    if (null !== r) {
                        for (let o = i + 1; o < r.length; o++)
                            (0,
                            r[o])();
                        e[ds] = null
                    }
                }(t, e),
                1 === e[N].type && e[ue].destroy();
                const n = e[$a];
                if (null !== n && Dr(e[Qe])) {
                    n !== e[Qe] && ly(n, e);
                    const r = e[Vr];
                    null !== r && r.detachView(t)
                }
                !function BM(t) {
                    lh.delete(t[Ua])
                }(e)
            }
        }
        function dy(t, e, n) {
            return function fy(t, e, n) {
                let r = e;
                for (; null !== r && 40 & r.type; )
                    r = (e = r).parent;
                if (null === r)
                    return n[pi];
                {
                    const {componentOffset: i} = r;
                    if (i > -1) {
                        const {encapsulation: o} = t.data[r.directiveStart + i];
                        if (o === Br.None || o === Br.Emulated)
                            return null
                    }
                    return Nn(r, n)
                }
            }(t, e.parent, n)
        }
        function xo(t, e, n, r, i) {
            t.insertBefore(e, n, r, i)
        }
        function hy(t, e, n) {
            t.appendChild(e, n)
        }
        function py(t, e, n, r, i) {
            null !== r ? xo(t, e, n, r, i) : hy(t, e, n)
        }
        function nc(t, e) {
            return t.parentNode(e)
        }
        let vh, Sh, Dy = function my(t, e, n) {
            return 40 & t.type ? Nn(t, n) : null
        };
        function rc(t, e, n, r) {
            const i = dy(t, r, e)
              , o = e[ue]
              , a = function gy(t, e, n) {
                return Dy(t, e, n)
            }(r.parent || e[Ht], r, e);
            if (null != i)
                if (Array.isArray(n))
                    for (let u = 0; u < n.length; u++)
                        py(o, i, n[u], a, !1);
                else
                    py(o, i, n, a, !1);
            void 0 !== vh && vh(o, r, e, n, i)
        }
        function ic(t, e) {
            if (null !== e) {
                const n = e.type;
                if (3 & n)
                    return Nn(e, t);
                if (4 & n)
                    return Ch(-1, t[e.index]);
                if (8 & n) {
                    const r = e.child;
                    if (null !== r)
                        return ic(t, r);
                    {
                        const i = t[e.index];
                        return Dr(i) ? Ch(-1, i) : Nt(i)
                    }
                }
                if (32 & n)
                    return hh(e, t)() || Nt(t[e.index]);
                {
                    const r = yy(t, e);
                    return null !== r ? Array.isArray(r) ? r[0] : ic(tu(t[zt]), r) : ic(t, e.next)
                }
            }
            return null
        }
        function yy(t, e) {
            return null !== e ? t[zt][Ht].projection[e.projection] : null
        }
        function Ch(t, e) {
            const n = tn + t + 1;
            if (n < e.length) {
                const r = e[n]
                  , i = r[N].firstChild;
                if (null !== i)
                    return ic(r, i)
            }
            return e[Bl]
        }
        function Eh(t, e, n, r, i, o, s) {
            for (; null != n; ) {
                const a = r[n.index]
                  , u = n.type;
                if (s && 0 === e && (a && Gt(Nt(a), r),
                n.flags |= 2),
                32 != (32 & n.flags))
                    if (8 & u)
                        Eh(t, e, n.child, r, i, o, !1),
                        Ss(e, t, i, a, o);
                    else if (32 & u) {
                        const l = hh(n, r);
                        let c;
                        for (; c = l(); )
                            Ss(e, t, i, c, o);
                        Ss(e, t, i, a, o)
                    } else
                        16 & u ? vy(t, e, r, n, i, o) : Ss(e, t, i, a, o);
                n = s ? n.projectionNext : n.next
            }
        }
        function nu(t, e, n, r, i, o) {
            Eh(n, r, t.firstChild, e, i, o, !1)
        }
        function vy(t, e, n, r, i, o) {
            const s = n[zt]
              , u = s[Ht].projection[r.projection];
            if (Array.isArray(u))
                for (let l = 0; l < u.length; l++)
                    Ss(e, t, i, u[l], o);
            else
                Eh(t, e, u, s[Qe], i, o, !0)
        }
        function Cy(t, e, n) {
            "" === n ? t.removeAttribute(e, "class") : t.setAttribute(e, "class", n)
        }
        function wy(t, e, n) {
            const {mergedAttrs: r, classes: i, styles: o} = n;
            null !== r && Zf(t, e, r),
            null !== i && Cy(t, e, i),
            null !== o && function ux(t, e, n) {
                t.setAttribute(e, "style", n)
            }(t, e, o)
        }
        const uc = new K("ENVIRONMENT_INITIALIZER")
          , Ly = new K("INJECTOR",-1)
          , By = new K("INJECTOR_DEF_TYPES");
        class jy {
            get(e, n=ka) {
                if (n === ka) {
                    const r = new Error(`NullInjectorError: No provider for ${Be(e)}!`);
                    throw r.name = "NullInjectorError",
                    r
                }
                return n
            }
        }
        function Nx(...t) {
            return {
                \u0275providers: Vy(0, t),
                \u0275fromNgModule: !0
            }
        }
        function Vy(t, ...e) {
            const n = []
              , r = new Set;
            let i;
            return Mo(e, o=>{
                const s = o;
                Fh(s, n, [], r) && (i || (i = []),
                i.push(s))
            }
            ),
            void 0 !== i && $y(i, n),
            n
        }
        function $y(t, e) {
            for (let n = 0; n < t.length; n++) {
                const {providers: i} = t[n];
                Rh(i, o=>{
                    e.push(o)
                }
                )
            }
        }
        function Fh(t, e, n, r) {
            if (!(t = z(t)))
                return !1;
            let i = null
              , o = zD(t);
            const s = !o && Me(t);
            if (o || s) {
                if (s && !s.standalone)
                    return !1;
                i = t
            } else {
                const u = t.ngModule;
                if (o = zD(u),
                !o)
                    return !1;
                i = u
            }
            const a = r.has(i);
            if (s) {
                if (a)
                    return !1;
                if (r.add(i),
                s.dependencies) {
                    const u = "function" == typeof s.dependencies ? s.dependencies() : s.dependencies;
                    for (const l of u)
                        Fh(l, e, n, r)
                }
            } else {
                if (!o)
                    return !1;
                {
                    if (null != o.imports && !a) {
                        let l;
                        r.add(i);
                        try {
                            Mo(o.imports, c=>{
                                Fh(c, e, n, r) && (l || (l = []),
                                l.push(c))
                            }
                            )
                        } finally {}
                        void 0 !== l && $y(l, e)
                    }
                    if (!a) {
                        const l = bo(i) || (()=>new i);
                        e.push({
                            provide: i,
                            useFactory: l,
                            deps: Se
                        }, {
                            provide: By,
                            useValue: i,
                            multi: !0
                        }, {
                            provide: uc,
                            useValue: ()=>W(i),
                            multi: !0
                        })
                    }
                    const u = o.providers;
                    null == u || a || Rh(u, c=>{
                        e.push(c)
                    }
                    )
                }
            }
            return i !== t && void 0 !== t.providers
        }
        function Rh(t, e) {
            for (let n of t)
                Mf(n) && (n = n.\u0275providers),
                Array.isArray(n) ? Rh(n, e) : e(n)
        }
        const kx = Pe({
            provide: String,
            useValue: Pe
        });
        function Ph(t) {
            return null !== t && "object" == typeof t && kx in t
        }
        function Ao(t) {
            return "function" == typeof t
        }
        const Oh = new K("Set Injector scope.")
          , lc = {}
          , Bx = {};
        let Nh;
        function cc() {
            return void 0 === Nh && (Nh = new jy),
            Nh
        }
        class _i {
        }
        class zy extends _i {
            get destroyed() {
                return this._destroyed
            }
            constructor(e, n, r, i) {
                super(),
                this.parent = n,
                this.source = r,
                this.scopes = i,
                this.records = new Map,
                this._ngOnDestroyHooks = new Set,
                this._onDestroyHooks = [],
                this._destroyed = !1,
                Lh(e, s=>this.processProvider(s)),
                this.records.set(Ly, Is(void 0, this)),
                i.has("environment") && this.records.set(_i, Is(void 0, this));
                const o = this.records.get(Oh);
                null != o && "string" == typeof o.value && this.scopes.add(o.value),
                this.injectorDefTypes = new Set(this.get(By.multi, Se, G.Self))
            }
            destroy() {
                this.assertNotDestroyed(),
                this._destroyed = !0;
                try {
                    for (const e of this._ngOnDestroyHooks)
                        e.ngOnDestroy();
                    for (const e of this._onDestroyHooks)
                        e()
                } finally {
                    this.records.clear(),
                    this._ngOnDestroyHooks.clear(),
                    this.injectorDefTypes.clear(),
                    this._onDestroyHooks.length = 0
                }
            }
            onDestroy(e) {
                this._onDestroyHooks.push(e)
            }
            runInContext(e) {
                this.assertNotDestroyed();
                const n = ls(this)
                  , r = Jn(void 0);
                try {
                    return e()
                } finally {
                    ls(n),
                    Jn(r)
                }
            }
            get(e, n=ka, r=G.Default) {
                this.assertNotDestroyed(),
                r = Pl(r);
                const i = ls(this)
                  , o = Jn(void 0);
                try {
                    if (!(r & G.SkipSelf)) {
                        let a = this.records.get(e);
                        if (void 0 === a) {
                            const u = function Hx(t) {
                                return "function" == typeof t || "object" == typeof t && t instanceof K
                            }(e) && Al(e);
                            a = u && this.injectableDefInScope(u) ? Is(kh(e), lc) : null,
                            this.records.set(e, a)
                        }
                        if (null != a)
                            return this.hydrate(e, a)
                    }
                    return (r & G.Self ? cc() : this.parent).get(e, n = r & G.Optional && n === ka ? null : n)
                } catch (s) {
                    if ("NullInjectorError" === s.name) {
                        if ((s[Rl] = s[Rl] || []).unshift(Be(e)),
                        i)
                            throw s;
                        return function hI(t, e, n, r) {
                            const i = t[Rl];
                            throw e[qD] && i.unshift(e[qD]),
                            t.message = function pI(t, e, n, r=null) {
                                t = t && "\n" === t.charAt(0) && t.charAt(1) == cI ? t.slice(2) : t;
                                let i = Be(e);
                                if (Array.isArray(e))
                                    i = e.map(Be).join(" -> ");
                                else if ("object" == typeof e) {
                                    let o = [];
                                    for (let s in e)
                                        if (e.hasOwnProperty(s)) {
                                            let a = e[s];
                                            o.push(s + ":" + ("string" == typeof a ? JSON.stringify(a) : Be(a)))
                                        }
                                    i = `{${o.join(", ")}}`
                                }
                                return `${n}${r ? "(" + r + ")" : ""}[${i}]: ${t.replace(lI, "\n  ")}`
                            }("\n" + t.message, i, n, r),
                            t[uI] = i,
                            t[Rl] = null,
                            t
                        }(s, e, "R3InjectorError", this.source)
                    }
                    throw s
                } finally {
                    Jn(o),
                    ls(i)
                }
            }
            resolveInjectorInitializers() {
                const e = ls(this)
                  , n = Jn(void 0);
                try {
                    const r = this.get(uc.multi, Se, G.Self);
                    for (const i of r)
                        i()
                } finally {
                    ls(e),
                    Jn(n)
                }
            }
            toString() {
                const e = []
                  , n = this.records;
                for (const r of n.keys())
                    e.push(Be(r));
                return `R3Injector[${e.join(", ")}]`
            }
            assertNotDestroyed() {
                if (this._destroyed)
                    throw new P(205,!1)
            }
            processProvider(e) {
                let n = Ao(e = z(e)) ? e : z(e && e.provide);
                const r = function Vx(t) {
                    return Ph(t) ? Is(void 0, t.useValue) : Is(function Gy(t, e, n) {
                        let r;
                        if (Ao(t)) {
                            const i = z(t);
                            return bo(i) || kh(i)
                        }
                        if (Ph(t))
                            r = ()=>z(t.useValue);
                        else if (function Hy(t) {
                            return !(!t || !t.useFactory)
                        }(t))
                            r = ()=>t.useFactory(...Rf(t.deps || []));
                        else if (function Uy(t) {
                            return !(!t || !t.useExisting)
                        }(t))
                            r = ()=>W(z(t.useExisting));
                        else {
                            const i = z(t && (t.useClass || t.provide));
                            if (!function $x(t) {
                                return !!t.deps
                            }(t))
                                return bo(i) || kh(i);
                            r = ()=>new i(...Rf(t.deps))
                        }
                        return r
                    }(t), lc)
                }(e);
                if (Ao(e) || !0 !== e.multi)
                    this.records.get(n);
                else {
                    let i = this.records.get(n);
                    i || (i = Is(void 0, lc, !0),
                    i.factory = ()=>Rf(i.multi),
                    this.records.set(n, i)),
                    n = e,
                    i.multi.push(e)
                }
                this.records.set(n, r)
            }
            hydrate(e, n) {
                return n.value === lc && (n.value = Bx,
                n.value = n.factory()),
                "object" == typeof n.value && n.value && function Ux(t) {
                    return null !== t && "object" == typeof t && "function" == typeof t.ngOnDestroy
                }(n.value) && this._ngOnDestroyHooks.add(n.value),
                n.value
            }
            injectableDefInScope(e) {
                if (!e.providedIn)
                    return !1;
                const n = z(e.providedIn);
                return "string" == typeof n ? "any" === n || this.scopes.has(n) : this.injectorDefTypes.has(n)
            }
        }
        function kh(t) {
            const e = Al(t)
              , n = null !== e ? e.factory : bo(t);
            if (null !== n)
                return n;
            if (t instanceof K)
                throw new P(204,!1);
            if (t instanceof Function)
                return function jx(t) {
                    const e = t.length;
                    if (e > 0)
                        throw function Za(t, e) {
                            const n = [];
                            for (let r = 0; r < t; r++)
                                n.push(e);
                            return n
                        }(e, "?"),
                        new P(204,!1);
                    const n = function oI(t) {
                        return t && (t[Fl] || t[GD]) || null
                    }(t);
                    return null !== n ? ()=>n.factory(t) : ()=>new t
                }(t);
            throw new P(204,!1)
        }
        function Is(t, e, n=!1) {
            return {
                factory: t,
                value: e,
                multi: n ? [] : void 0
            }
        }
        function Lh(t, e) {
            for (const n of t)
                Array.isArray(n) ? Lh(n, e) : n && Mf(n) ? Lh(n.\u0275providers, e) : e(n)
        }
        class zx {
        }
        class Wy {
        }
        class Wx {
            resolveComponentFactory(e) {
                throw function Gx(t) {
                    const e = Error(`No component factory found for ${Be(t)}. Did you add it to @NgModule.entryComponents?`);
                    return e.ngComponent = t,
                    e
                }(e)
            }
        }
        let su = (()=>{
            class t {
            }
            return t.NULL = new Wx,
            t
        }
        )();
        function qx() {
            return Ms(kt(), I())
        }
        function Ms(t, e) {
            return new zi(Nn(t, e))
        }
        let zi = (()=>{
            class t {
                constructor(n) {
                    this.nativeElement = n
                }
            }
            return t.__NG_ELEMENT_ID__ = qx,
            t
        }
        )();
        class Yy {
        }
        let Qx = (()=>{
            class t {
            }
            return t.\u0275prov = Q({
                token: t,
                providedIn: "root",
                factory: ()=>null
            }),
            t
        }
        )();
        class fc {
            constructor(e) {
                this.full = e,
                this.major = e.split(".")[0],
                this.minor = e.split(".")[1],
                this.patch = e.split(".").slice(2).join(".")
            }
        }
        const Kx = new fc("15.2.10")
          , Bh = {}
          , jh = "ngOriginalError";
        function Vh(t) {
            return t[jh]
        }
        class xs {
            constructor() {
                this._console = console
            }
            handleError(e) {
                const n = this._findOriginalError(e);
                this._console.error("ERROR", e),
                n && this._console.error("ORIGINAL ERROR", n)
            }
            _findOriginalError(e) {
                let n = e && Vh(e);
                for (; n && Vh(n); )
                    n = Vh(n);
                return n || null
            }
        }
        function yi(t) {
            return t instanceof Function ? t() : t
        }
        function Qy(t, e, n) {
            let r = t.length;
            for (; ; ) {
                const i = t.indexOf(e, n);
                if (-1 === i)
                    return i;
                if (0 === i || t.charCodeAt(i - 1) <= 32) {
                    const o = e.length;
                    if (i + o === r || t.charCodeAt(i + o) <= 32)
                        return i
                }
                n = i + 1
            }
        }
        const Ky = "ng-template";
        function uA(t, e, n) {
            let r = 0
              , i = !0;
            for (; r < t.length; ) {
                let o = t[r++];
                if ("string" == typeof o && i) {
                    const s = t[r++];
                    if (n && "class" === o && -1 !== Qy(s.toLowerCase(), e, 0))
                        return !0
                } else {
                    if (1 === o) {
                        for (; r < t.length && "string" == typeof (o = t[r++]); )
                            if (o.toLowerCase() === e)
                                return !0;
                        return !1
                    }
                    "number" == typeof o && (i = !1)
                }
            }
            return !1
        }
        function Xy(t) {
            return 4 === t.type && t.value !== Ky
        }
        function lA(t, e, n) {
            return e === (4 !== t.type || n ? t.value : Ky)
        }
        function cA(t, e, n) {
            let r = 4;
            const i = t.attrs || []
              , o = function hA(t) {
                for (let e = 0; e < t.length; e++)
                    if (b_(t[e]))
                        return e;
                return t.length
            }(i);
            let s = !1;
            for (let a = 0; a < e.length; a++) {
                const u = e[a];
                if ("number" != typeof u) {
                    if (!s)
                        if (4 & r) {
                            if (r = 2 | 1 & r,
                            "" !== u && !lA(t, u, n) || "" === u && 1 === e.length) {
                                if (yr(r))
                                    return !1;
                                s = !0
                            }
                        } else {
                            const l = 8 & r ? u : e[++a];
                            if (8 & r && null !== t.attrs) {
                                if (!uA(t.attrs, l, n)) {
                                    if (yr(r))
                                        return !1;
                                    s = !0
                                }
                                continue
                            }
                            const d = dA(8 & r ? "class" : u, i, Xy(t), n);
                            if (-1 === d) {
                                if (yr(r))
                                    return !1;
                                s = !0;
                                continue
                            }
                            if ("" !== l) {
                                let f;
                                f = d > o ? "" : i[d + 1].toLowerCase();
                                const h = 8 & r ? f : null;
                                if (h && -1 !== Qy(h, l, 0) || 2 & r && l !== f) {
                                    if (yr(r))
                                        return !1;
                                    s = !0
                                }
                            }
                        }
                } else {
                    if (!s && !yr(r) && !yr(u))
                        return !1;
                    if (s && yr(u))
                        continue;
                    s = !1,
                    r = u | 1 & r
                }
            }
            return yr(r) || s
        }
        function yr(t) {
            return 0 == (1 & t)
        }
        function dA(t, e, n, r) {
            if (null === e)
                return -1;
            let i = 0;
            if (r || !n) {
                let o = !1;
                for (; i < e.length; ) {
                    const s = e[i];
                    if (s === t)
                        return i;
                    if (3 === s || 6 === s)
                        o = !0;
                    else {
                        if (1 === s || 2 === s) {
                            let a = e[++i];
                            for (; "string" == typeof a; )
                                a = e[++i];
                            continue
                        }
                        if (4 === s)
                            break;
                        if (0 === s) {
                            i += 4;
                            continue
                        }
                    }
                    i += o ? 1 : 2
                }
                return -1
            }
            return function pA(t, e) {
                let n = t.indexOf(4);
                if (n > -1)
                    for (n++; n < t.length; ) {
                        const r = t[n];
                        if ("number" == typeof r)
                            return -1;
                        if (r === e)
                            return n;
                        n++
                    }
                return -1
            }(e, t)
        }
        function Jy(t, e, n=!1) {
            for (let r = 0; r < e.length; r++)
                if (cA(t, e[r], n))
                    return !0;
            return !1
        }
        function ev(t, e) {
            return t ? ":not(" + e.trim() + ")" : e
        }
        function mA(t) {
            let e = t[0]
              , n = 1
              , r = 2
              , i = ""
              , o = !1;
            for (; n < t.length; ) {
                let s = t[n];
                if ("string" == typeof s)
                    if (2 & r) {
                        const a = t[++n];
                        i += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]"
                    } else
                        8 & r ? i += "." + s : 4 & r && (i += " " + s);
                else
                    "" !== i && !yr(s) && (e += ev(o, i),
                    i = ""),
                    r = s,
                    o = o || !yr(r);
                n++
            }
            return "" !== i && (e += ev(o, i)),
            e
        }
        const te = {};
        function ov(t, e=null, n=null, r) {
            const i = sv(t, e, n, r);
            return i.resolveInjectorInitializers(),
            i
        }
        function sv(t, e=null, n=null, r, i=new Set) {
            const o = [n || Se, Nx(t)];
            return r = r || ("object" == typeof t ? void 0 : Be(t)),
            new zy(o,e || cc(),r || null,i)
        }
        let vi = (()=>{
            class t {
                static create(n, r) {
                    if (Array.isArray(n))
                        return ov({
                            name: ""
                        }, r, n, "");
                    {
                        const i = n.name ?? "";
                        return ov({
                            name: i
                        }, n.parent, n.providers, i)
                    }
                }
            }
            return t.THROW_IF_NOT_FOUND = ka,
            t.NULL = new jy,
            t.\u0275prov = Q({
                token: t,
                providedIn: "any",
                factory: ()=>W(Ly)
            }),
            t.__NG_ELEMENT_ID__ = -1,
            t
        }
        )();
        function q(t, e=G.Default) {
            const n = I();
            return null === n ? W(t, e) : P_(kt(), n, z(t), e)
        }
        function pv(t, e) {
            const n = t.contentQueries;
            if (null !== n)
                for (let r = 0; r < n.length; r += 2) {
                    const o = n[r + 1];
                    if (-1 !== o) {
                        const s = t.data[o];
                        zf(n[r]),
                        s.contentQueries(2, e[o], o)
                    }
                }
        }
        function pc(t, e, n, r, i, o, s, a, u, l, c) {
            const d = e.blueprint.slice();
            return d[pi] = i,
            d[oe] = 76 | r,
            (null !== c || t && 1024 & t[oe]) && (d[oe] |= 1024),
            c_(d),
            d[Qe] = d[fs] = t,
            d[ot] = n,
            d[Ll] = s || t && t[Ll],
            d[ue] = a || t && t[ue],
            d[Nf] = u || t && t[Nf] || null,
            d[kl] = l || t && t[kl] || null,
            d[Ht] = o,
            d[Ua] = function kM() {
                return NM++
            }(),
            d[e_] = c,
            d[zt] = 2 == e.type ? t[zt] : d,
            d
        }
        function Rs(t, e, n, r, i) {
            let o = t.data[e];
            if (null === o)
                o = function Gh(t, e, n, r, i) {
                    const o = h_()
                      , s = Vf()
                      , u = t.data[e] = function HA(t, e, n, r, i, o) {
                        return {
                            type: n,
                            index: r,
                            insertBeforeIndex: null,
                            injectorIndex: e ? e.injectorIndex : -1,
                            directiveStart: -1,
                            directiveEnd: -1,
                            directiveStylingLast: -1,
                            componentOffset: -1,
                            propertyBindings: null,
                            flags: 0,
                            providerIndexes: 0,
                            value: i,
                            attrs: o,
                            mergedAttrs: null,
                            localNames: null,
                            initialInputs: void 0,
                            inputs: null,
                            outputs: null,
                            tView: null,
                            next: null,
                            prev: null,
                            projectionNext: null,
                            child: null,
                            parent: e,
                            projection: null,
                            styles: null,
                            stylesWithoutHost: null,
                            residualStyles: void 0,
                            classes: null,
                            classesWithoutHost: null,
                            residualClasses: void 0,
                            classBindings: 0,
                            styleBindings: 0
                        }
                    }(0, s ? o : o && o.parent, n, e, r, i);
                    return null === t.firstChild && (t.firstChild = u),
                    null !== o && (s ? null == o.child && null !== u.parent && (o.child = u) : null === o.next && (o.next = u,
                    u.prev = o)),
                    u
                }(t, e, n, r, i),
                function VI() {
                    return ee.lFrame.inI18n
                }() && (o.flags |= 32);
            else if (64 & o.type) {
                o.type = n,
                o.value = r,
                o.attrs = i;
                const s = function za() {
                    const t = ee.lFrame
                      , e = t.currentTNode;
                    return t.isParent ? e : e.parent
                }();
                o.injectorIndex = null === s ? -1 : s.injectorIndex
            }
            return $r(o, !0),
            o
        }
        function au(t, e, n, r) {
            if (0 === n)
                return -1;
            const i = e.length;
            for (let o = 0; o < n; o++)
                e.push(r),
                t.blueprint.push(r),
                t.data.push(null);
            return i
        }
        function Wh(t, e, n) {
            Gf(e);
            try {
                const r = t.viewQuery;
                null !== r && tp(1, r, n);
                const i = t.template;
                null !== i && gv(t, e, i, 1, n),
                t.firstCreatePass && (t.firstCreatePass = !1),
                t.staticContentQueries && pv(t, e),
                t.staticViewQueries && tp(2, t.viewQuery, n);
                const o = t.components;
                null !== o && function VA(t, e) {
                    for (let n = 0; n < e.length; n++)
                        lF(t, e[n])
                }(e, o)
            } catch (r) {
                throw t.firstCreatePass && (t.incompleteFirstPass = !0,
                t.firstCreatePass = !1),
                r
            } finally {
                e[oe] &= -5,
                Wf()
            }
        }
        function gc(t, e, n, r) {
            const i = e[oe];
            if (128 != (128 & i)) {
                Gf(e);
                try {
                    c_(e),
                    function g_(t) {
                        return ee.lFrame.bindingIndex = t
                    }(t.bindingStartIndex),
                    null !== n && gv(t, e, n, 2, r);
                    const s = 3 == (3 & i);
                    if (s) {
                        const l = t.preOrderCheckHooks;
                        null !== l && zl(e, l, null)
                    } else {
                        const l = t.preOrderHooks;
                        null !== l && Gl(e, l, 0, null),
                        qf(e, 0)
                    }
                    if (function aF(t) {
                        for (let e = ph(t); null !== e; e = gh(e)) {
                            if (!e[t_])
                                continue;
                            const n = e[ps];
                            for (let r = 0; r < n.length; r++) {
                                const i = n[r];
                                512 & i[oe] || jf(i[Qe], 1),
                                i[oe] |= 512
                            }
                        }
                    }(e),
                    function sF(t) {
                        for (let e = ph(t); null !== e; e = gh(e))
                            for (let n = tn; n < e.length; n++) {
                                const r = e[n]
                                  , i = r[N];
                                Ul(r) && gc(i, r, i.template, r[ot])
                            }
                    }(e),
                    null !== t.contentQueries && pv(t, e),
                    s) {
                        const l = t.contentCheckHooks;
                        null !== l && zl(e, l)
                    } else {
                        const l = t.contentHooks;
                        null !== l && Gl(e, l, 1),
                        qf(e, 1)
                    }
                    !function BA(t, e) {
                        const n = t.hostBindingOpCodes;
                        if (null !== n)
                            try {
                                for (let r = 0; r < n.length; r++) {
                                    const i = n[r];
                                    if (i < 0)
                                        To(~i);
                                    else {
                                        const o = i
                                          , s = n[++r]
                                          , a = n[++r];
                                        $I(s, o),
                                        a(2, e[o])
                                    }
                                }
                            } finally {
                                To(-1)
                            }
                    }(t, e);
                    const a = t.components;
                    null !== a && function jA(t, e) {
                        for (let n = 0; n < e.length; n++)
                            uF(t, e[n])
                    }(e, a);
                    const u = t.viewQuery;
                    if (null !== u && tp(2, u, r),
                    s) {
                        const l = t.viewCheckHooks;
                        null !== l && zl(e, l)
                    } else {
                        const l = t.viewHooks;
                        null !== l && Gl(e, l, 2),
                        qf(e, 2)
                    }
                    !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
                    e[oe] &= -41,
                    512 & e[oe] && (e[oe] &= -513,
                    jf(e[Qe], -1))
                } finally {
                    Wf()
                }
            }
        }
        function gv(t, e, n, r, i) {
            const o = function rn() {
                return ee.lFrame.selectedIndex
            }()
              , s = 2 & r;
            try {
                To(-1),
                s && e.length > Ue && function tv(t, e, n, r) {
                    if (!r)
                        if (3 == (3 & e[oe])) {
                            const o = t.preOrderCheckHooks;
                            null !== o && zl(e, o, n)
                        } else {
                            const o = t.preOrderHooks;
                            null !== o && Gl(e, o, 0, n)
                        }
                    To(n)
                }(t, e, Ue, !1),
                er(s ? 2 : 0, i),
                n(r, i)
            } finally {
                To(o),
                er(s ? 3 : 1, i)
            }
        }
        function qh(t, e, n) {
            if (Lf(e)) {
                const i = e.directiveEnd;
                for (let o = e.directiveStart; o < i; o++) {
                    const s = t.data[o];
                    s.contentQueries && s.contentQueries(1, n[o], o)
                }
            }
        }
        function mv(t) {
            const e = t.tView;
            return null === e || e.incompleteFirstPass ? t.tView = Qh(1, null, t.template, t.decls, t.vars, t.directiveDefs, t.pipeDefs, t.viewQuery, t.schemas, t.consts) : e
        }
        function Qh(t, e, n, r, i, o, s, a, u, l) {
            const c = Ue + r
              , d = c + i
              , f = function $A(t, e) {
                const n = [];
                for (let r = 0; r < e; r++)
                    n.push(r < t ? null : te);
                return n
            }(c, d)
              , h = "function" == typeof l ? l() : l;
            return f[N] = {
                type: t,
                blueprint: f,
                template: n,
                queries: null,
                viewQuery: a,
                declTNode: e,
                data: f.slice().fill(null, c),
                bindingStartIndex: c,
                expandoStartIndex: d,
                hostBindingOpCodes: null,
                firstCreatePass: !0,
                firstUpdatePass: !0,
                staticViewQueries: !1,
                staticContentQueries: !1,
                preOrderHooks: null,
                preOrderCheckHooks: null,
                contentHooks: null,
                contentCheckHooks: null,
                viewHooks: null,
                viewCheckHooks: null,
                destroyHooks: null,
                cleanup: null,
                contentQueries: null,
                components: null,
                directiveRegistry: "function" == typeof o ? o() : o,
                pipeRegistry: "function" == typeof s ? s() : s,
                firstChild: null,
                schemas: u,
                consts: h,
                incompleteFirstPass: !1
            }
        }
        function Dv(t, e, n, r) {
            const i = function Ev(t) {
                return t[ds] || (t[ds] = [])
            }(e);
            null === n ? i.push(r) : (i.push(n),
            t.firstCreatePass && function bv(t) {
                return t.cleanup || (t.cleanup = [])
            }(t).push(r, i.length - 1))
        }
        function _v(t, e, n, r) {
            for (let i in t)
                if (t.hasOwnProperty(i)) {
                    n = null === n ? {} : n;
                    const o = t[i];
                    null === r ? yv(n, e, i, o) : r.hasOwnProperty(i) && yv(n, e, r[i], o)
                }
            return n
        }
        function yv(t, e, n, r) {
            t.hasOwnProperty(n) ? t[n].push(e, r) : t[n] = [e, r]
        }
        function vv(t, e, n, r, i, o) {
            for (let l = 0; l < r.length; l++)
                Jf(Zl(n, e), t, r[l].type);
            !function tF(t, e, n) {
                t.flags |= 1,
                t.directiveStart = e,
                t.directiveEnd = e + n,
                t.providerIndexes = e
            }(n, t.data.length, r.length);
            for (let l = 0; l < r.length; l++) {
                const c = r[l];
                c.providersResolver && c.providersResolver(c)
            }
            let s = !1
              , a = !1
              , u = au(t, e, r.length, null);
            for (let l = 0; l < r.length; l++) {
                const c = r[l];
                n.mergedAttrs = Wa(n.mergedAttrs, c.hostAttrs),
                nF(t, n, e, u, c),
                eF(u, c, i),
                null !== c.contentQueries && (n.flags |= 4),
                (null !== c.hostBindings || null !== c.hostAttrs || 0 !== c.hostVars) && (n.flags |= 64);
                const d = c.type.prototype;
                !s && (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) && ((t.preOrderHooks ?? (t.preOrderHooks = [])).push(n.index),
                s = !0),
                !a && (d.ngOnChanges || d.ngDoCheck) && ((t.preOrderCheckHooks ?? (t.preOrderCheckHooks = [])).push(n.index),
                a = !0),
                u++
            }
            !function zA(t, e, n) {
                const i = e.directiveEnd
                  , o = t.data
                  , s = e.attrs
                  , a = [];
                let u = null
                  , l = null;
                for (let c = e.directiveStart; c < i; c++) {
                    const d = o[c]
                      , f = n ? n.get(d) : null
                      , p = f ? f.outputs : null;
                    u = _v(d.inputs, c, u, f ? f.inputs : null),
                    l = _v(d.outputs, c, l, p);
                    const g = null === u || null === s || Xy(e) ? null : oF(u, c, s);
                    a.push(g)
                }
                null !== u && (u.hasOwnProperty("class") && (e.flags |= 8),
                u.hasOwnProperty("style") && (e.flags |= 16)),
                e.initialInputs = a,
                e.inputs = u,
                e.outputs = l
            }(t, n, o)
        }
        function Cv(t, e, n) {
            const r = n.directiveStart
              , i = n.directiveEnd
              , o = n.index
              , s = function UI() {
                return ee.lFrame.currentDirectiveIndex
            }();
            try {
                To(o);
                for (let a = r; a < i; a++) {
                    const u = t.data[a]
                      , l = e[a];
                    Uf(a),
                    (null !== u.hostBindings || 0 !== u.hostVars || null !== u.hostAttrs) && KA(u, l)
                }
            } finally {
                To(-1),
                Uf(s)
            }
        }
        function KA(t, e) {
            null !== t.hostBindings && t.hostBindings(1, e)
        }
        function Xh(t, e, n) {
            e.componentOffset = n,
            (t.components ?? (t.components = [])).push(e.index)
        }
        function eF(t, e, n) {
            if (n) {
                if (e.exportAs)
                    for (let r = 0; r < e.exportAs.length; r++)
                        n[e.exportAs[r]] = t;
                _r(e) && (n[""] = t)
            }
        }
        function nF(t, e, n, r, i) {
            t.data[r] = i;
            const o = i.factory || (i.factory = bo(i.type))
              , s = new Ga(o,_r(i),q);
            t.blueprint[r] = s,
            n[r] = s,
            function YA(t, e, n, r, i) {
                const o = i.hostBindings;
                if (o) {
                    let s = t.hostBindingOpCodes;
                    null === s && (s = t.hostBindingOpCodes = []);
                    const a = ~e.index;
                    (function ZA(t) {
                        let e = t.length;
                        for (; e > 0; ) {
                            const n = t[--e];
                            if ("number" == typeof n && n < 0)
                                return n
                        }
                        return 0
                    }
                    )(s) != a && s.push(a),
                    s.push(n, r, o)
                }
            }(t, e, r, au(t, n, i.hostVars, te), i)
        }
        function iF(t, e, n, r, i, o) {
            const s = o[e];
            if (null !== s) {
                const a = r.setInput;
                for (let u = 0; u < s.length; ) {
                    const l = s[u++]
                      , c = s[u++]
                      , d = s[u++];
                    null !== a ? r.setInput(n, d, l, c) : n[c] = d
                }
            }
        }
        function oF(t, e, n) {
            let r = null
              , i = 0;
            for (; i < n.length; ) {
                const o = n[i];
                if (0 !== o)
                    if (5 !== o) {
                        if ("number" == typeof o)
                            break;
                        if (t.hasOwnProperty(o)) {
                            null === r && (r = []);
                            const s = t[o];
                            for (let a = 0; a < s.length; a += 2)
                                if (s[a] === e) {
                                    r.push(o, s[a + 1], n[i + 1]);
                                    break
                                }
                        }
                        i += 2
                    } else
                        i += 2;
                else
                    i += 4
            }
            return r
        }
        function uF(t, e) {
            const n = vn(e, t);
            if (Ul(n)) {
                const r = n[N];
                48 & n[oe] ? gc(r, n, r.template, n[ot]) : n[Eo] > 0 && ep(n)
            }
        }
        function ep(t) {
            for (let r = ph(t); null !== r; r = gh(r))
                for (let i = tn; i < r.length; i++) {
                    const o = r[i];
                    if (Ul(o))
                        if (512 & o[oe]) {
                            const s = o[N];
                            gc(s, o, s.template, o[ot])
                        } else
                            o[Eo] > 0 && ep(o)
                }
            const n = t[N].components;
            if (null !== n)
                for (let r = 0; r < n.length; r++) {
                    const i = vn(n[r], t);
                    Ul(i) && i[Eo] > 0 && ep(i)
                }
        }
        function lF(t, e) {
            const n = vn(e, t)
              , r = n[N];
            (function cF(t, e) {
                for (let n = e.length; n < t.blueprint.length; n++)
                    e.push(t.blueprint[n])
            }
            )(r, n),
            Wh(r, n, n[ot])
        }
        function mc(t, e) {
            return t[Va] ? t[JD][mr] = e : t[Va] = e,
            t[JD] = e,
            e
        }
        function Dc(t) {
            for (; t; ) {
                t[oe] |= 32;
                const e = tu(t);
                if (vI(t) && !e)
                    return t;
                t = e
            }
            return null
        }
        function _c(t, e, n, r=!0) {
            const i = e[Ll];
            i.begin && i.begin();
            try {
                gc(t, e, t.template, n)
            } catch (s) {
                throw r && function Tv(t, e) {
                    const n = t[kl]
                      , r = n ? n.get(xs, null) : null;
                    r && r.handleError(e)
                }(e, s),
                s
            } finally {
                i.end && i.end()
            }
        }
        function tp(t, e, n) {
            zf(0),
            e(t, n)
        }
        function np(t, e, n, r, i) {
            for (let o = 0; o < n.length; ) {
                const s = n[o++]
                  , a = n[o++]
                  , u = e[s]
                  , l = t.data[s];
                null !== l.setInput ? l.setInput(u, i, r, a) : u[a] = i
            }
        }
        function yc(t, e, n) {
            let r = n ? t.styles : null
              , i = n ? t.classes : null
              , o = 0;
            if (null !== e)
                for (let s = 0; s < e.length; s++) {
                    const a = e[s];
                    "number" == typeof a ? o = a : 1 == o ? i = Sf(i, a) : 2 == o && (r = Sf(r, a + ": " + e[++s] + ";"))
                }
            n ? t.styles = r : t.stylesWithoutHost = r,
            n ? t.classes = i : t.classesWithoutHost = i
        }
        function vc(t, e, n, r, i=!1) {
            for (; null !== n; ) {
                const o = e[n.index];
                if (null !== o && r.push(Nt(o)),
                Dr(o))
                    for (let a = tn; a < o.length; a++) {
                        const u = o[a]
                          , l = u[N].firstChild;
                        null !== l && vc(u[N], u, l, r)
                    }
                const s = n.type;
                if (8 & s)
                    vc(t, e, n.child, r);
                else if (32 & s) {
                    const a = hh(n, e);
                    let u;
                    for (; u = a(); )
                        r.push(u)
                } else if (16 & s) {
                    const a = yy(e, n);
                    if (Array.isArray(a))
                        r.push(...a);
                    else {
                        const u = tu(e[zt]);
                        vc(u[N], u, a, r, !0)
                    }
                }
                n = i ? n.projectionNext : n.next
            }
            return r
        }
        class uu {
            get rootNodes() {
                const e = this._lView
                  , n = e[N];
                return vc(n, e, n.firstChild, [])
            }
            constructor(e, n) {
                this._lView = e,
                this._cdRefInjectingView = n,
                this._appRef = null,
                this._attachedToViewContainer = !1
            }
            get context() {
                return this._lView[ot]
            }
            set context(e) {
                this._lView[ot] = e
            }
            get destroyed() {
                return 128 == (128 & this._lView[oe])
            }
            destroy() {
                if (this._appRef)
                    this._appRef.detachView(this);
                else if (this._attachedToViewContainer) {
                    const e = this._lView[Qe];
                    if (Dr(e)) {
                        const n = e[jl]
                          , r = n ? n.indexOf(this) : -1;
                        r > -1 && (_h(e, r),
                        Xl(n, r))
                    }
                    this._attachedToViewContainer = !1
                }
                cy(this._lView[N], this._lView)
            }
            onDestroy(e) {
                Dv(this._lView[N], this._lView, null, e)
            }
            markForCheck() {
                Dc(this._cdRefInjectingView || this._lView)
            }
            detach() {
                this._lView[oe] &= -65
            }
            reattach() {
                this._lView[oe] |= 64
            }
            detectChanges() {
                _c(this._lView[N], this._lView, this.context)
            }
            checkNoChanges() {}
            attachToViewContainerRef() {
                if (this._appRef)
                    throw new P(902,!1);
                this._attachedToViewContainer = !0
            }
            detachFromAppRef() {
                this._appRef = null,
                function KM(t, e) {
                    nu(t, e, e[ue], 2, null, null)
                }(this._lView[N], this._lView)
            }
            attachToAppRef(e) {
                if (this._attachedToViewContainer)
                    throw new P(902,!1);
                this._appRef = e
            }
        }
        class dF extends uu {
            constructor(e) {
                super(e),
                this._view = e
            }
            detectChanges() {
                const e = this._view;
                _c(e[N], e, e[ot], !1)
            }
            checkNoChanges() {}
            get context() {
                return null
            }
        }
        class Iv extends su {
            constructor(e) {
                super(),
                this.ngModule = e
            }
            resolveComponentFactory(e) {
                const n = Me(e);
                return new lu(n,this.ngModule)
            }
        }
        function Mv(t) {
            const e = [];
            for (let n in t)
                t.hasOwnProperty(n) && e.push({
                    propName: t[n],
                    templateName: n
                });
            return e
        }
        class hF {
            constructor(e, n) {
                this.injector = e,
                this.parentInjector = n
            }
            get(e, n, r) {
                r = Pl(r);
                const i = this.injector.get(e, Bh, r);
                return i !== Bh || n === Bh ? i : this.parentInjector.get(e, n, r)
            }
        }
        class lu extends Wy {
            get inputs() {
                return Mv(this.componentDef.inputs)
            }
            get outputs() {
                return Mv(this.componentDef.outputs)
            }
            constructor(e, n) {
                super(),
                this.componentDef = e,
                this.ngModule = n,
                this.componentType = e.type,
                this.selector = function DA(t) {
                    return t.map(mA).join(",")
                }(e.selectors),
                this.ngContentSelectors = e.ngContentSelectors ? e.ngContentSelectors : [],
                this.isBoundToModule = !!n
            }
            create(e, n, r, i) {
                let o = (i = i || this.ngModule)instanceof _i ? i : i?.injector;
                o && null !== this.componentDef.getStandaloneInjector && (o = this.componentDef.getStandaloneInjector(o) || o);
                const s = o ? new hF(e,o) : e
                  , a = s.get(Yy, null);
                if (null === a)
                    throw new P(407,!1);
                const u = s.get(Qx, null)
                  , l = a.createRenderer(null, this.componentDef)
                  , c = this.componentDef.selectors[0][0] || "div"
                  , d = r ? function UA(t, e, n) {
                    return t.selectRootElement(e, n === Br.ShadowDom)
                }(l, r, this.componentDef.encapsulation) : Dh(l, c, function fF(t) {
                    const e = t.toLowerCase();
                    return "svg" === e ? "svg" : "math" === e ? "math" : null
                }(c))
                  , f = this.componentDef.onPush ? 288 : 272
                  , h = Qh(0, null, null, 1, 0, null, null, null, null, null)
                  , p = pc(null, h, null, f, null, null, a, l, u, s, null);
                let g, m;
                Gf(p);
                try {
                    const _ = this.componentDef;
                    let y, D = null;
                    _.findHostDirectiveDefs ? (y = [],
                    D = new Map,
                    _.findHostDirectiveDefs(_, y, D),
                    y.push(_)) : y = [_];
                    const v = function gF(t, e) {
                        const n = t[N]
                          , r = Ue;
                        return t[r] = e,
                        Rs(n, r, 2, "#host", null)
                    }(p, d)
                      , w = function mF(t, e, n, r, i, o, s, a) {
                        const u = i[N];
                        !function DF(t, e, n, r) {
                            for (const i of t)
                                e.mergedAttrs = Wa(e.mergedAttrs, i.hostAttrs);
                            null !== e.mergedAttrs && (yc(e, e.mergedAttrs, !0),
                            null !== n && wy(r, n, e))
                        }(r, t, e, s);
                        const l = o.createRenderer(e, n)
                          , c = pc(i, mv(n), null, n.onPush ? 32 : 16, i[t.index], t, o, l, a || null, null, null);
                        return u.firstCreatePass && Xh(u, t, r.length - 1),
                        mc(i, c),
                        i[t.index] = c
                    }(v, d, _, y, p, a, l);
                    m = function l_(t, e) {
                        return t.data[e]
                    }(h, Ue),
                    d && function yF(t, e, n, r) {
                        if (r)
                            Zf(t, n, ["ng-version", Kx.full]);
                        else {
                            const {attrs: i, classes: o} = function _A(t) {
                                const e = []
                                  , n = [];
                                let r = 1
                                  , i = 2;
                                for (; r < t.length; ) {
                                    let o = t[r];
                                    if ("string" == typeof o)
                                        2 === i ? "" !== o && e.push(o, t[++r]) : 8 === i && n.push(o);
                                    else {
                                        if (!yr(i))
                                            break;
                                        i = o
                                    }
                                    r++
                                }
                                return {
                                    attrs: e,
                                    classes: n
                                }
                            }(e.selectors[0]);
                            i && Zf(t, n, i),
                            o && o.length > 0 && Cy(t, n, o.join(" "))
                        }
                    }(l, _, d, r),
                    void 0 !== n && function vF(t, e, n) {
                        const r = t.projection = [];
                        for (let i = 0; i < e.length; i++) {
                            const o = n[i];
                            r.push(null != o ? Array.from(o) : null)
                        }
                    }(m, this.ngContentSelectors, n),
                    g = function _F(t, e, n, r, i, o) {
                        const s = kt()
                          , a = i[N]
                          , u = Nn(s, i);
                        vv(a, i, s, n, null, r);
                        for (let c = 0; c < n.length; c++)
                            Gt(Io(i, a, s.directiveStart + c, s), i);
                        Cv(a, i, s),
                        u && Gt(u, i);
                        const l = Io(i, a, s.directiveStart + s.componentOffset, s);
                        if (t[ot] = i[ot] = l,
                        null !== o)
                            for (const c of o)
                                c(l, e);
                        return qh(a, s, t),
                        l
                    }(w, _, y, D, p, [CF]),
                    Wh(h, p, null)
                } finally {
                    Wf()
                }
                return new pF(this.componentType,g,Ms(m, p),p,m)
            }
        }
        class pF extends zx {
            constructor(e, n, r, i, o) {
                super(),
                this.location = r,
                this._rootLView = i,
                this._tNode = o,
                this.instance = n,
                this.hostView = this.changeDetectorRef = new dF(i),
                this.componentType = e
            }
            setInput(e, n) {
                const r = this._tNode.inputs;
                let i;
                if (null !== r && (i = r[e])) {
                    const o = this._rootLView;
                    np(o[N], o, i, e, n),
                    Dc(vn(this._tNode.index, o))
                }
            }
            get injector() {
                return new _s(this._tNode,this._rootLView)
            }
            destroy() {
                this.hostView.destroy()
            }
            onDestroy(e) {
                this.hostView.onDestroy(e)
            }
        }
        function CF() {
            const t = kt();
            Hl(I()[N], t)
        }
        function sp(t, e, n, r, i) {
            const s = i ? "class" : "style";
            np(t, n, e.inputs[s], s, r)
        }
        function Ke(t, e, n, r) {
            const i = I()
              , o = Ce()
              , s = Ue + t
              , a = i[ue]
              , u = o.firstCreatePass ? function jF(t, e, n, r, i, o) {
                const s = e.consts
                  , u = Rs(e, t, 2, r, Ui(s, i));
                return function Kh(t, e, n, r) {
                    if (f_()) {
                        const i = null === r ? null : {
                            "": -1
                        }
                          , o = function XA(t, e) {
                            const n = t.directiveRegistry;
                            let r = null
                              , i = null;
                            if (n)
                                for (let o = 0; o < n.length; o++) {
                                    const s = n[o];
                                    if (Jy(e, s.selectors, !1))
                                        if (r || (r = []),
                                        _r(s))
                                            if (null !== s.findHostDirectiveDefs) {
                                                const a = [];
                                                i = i || new Map,
                                                s.findHostDirectiveDefs(s, a, i),
                                                r.unshift(...a, s),
                                                Xh(t, e, a.length)
                                            } else
                                                r.unshift(s),
                                                Xh(t, e, 0);
                                        else
                                            i = i || new Map,
                                            s.findHostDirectiveDefs?.(s, r, i),
                                            r.push(s)
                                }
                            return null === r ? null : [r, i]
                        }(t, n);
                        let s, a;
                        null === o ? s = a = null : [s,a] = o,
                        null !== s && vv(t, e, n, s, i, a),
                        i && function JA(t, e, n) {
                            if (e) {
                                const r = t.localNames = [];
                                for (let i = 0; i < e.length; i += 2) {
                                    const o = n[e[i + 1]];
                                    if (null == o)
                                        throw new P(-301,!1);
                                    r.push(e[i], o)
                                }
                            }
                        }(n, r, i)
                    }
                    n.mergedAttrs = Wa(n.mergedAttrs, n.attrs)
                }(e, n, u, Ui(s, o)),
                null !== u.attrs && yc(u, u.attrs, !1),
                null !== u.mergedAttrs && yc(u, u.mergedAttrs, !0),
                null !== e.queries && e.queries.elementStart(e, u),
                u
            }(s, o, i, e, n, r) : o.data[s]
              , l = i[s] = Dh(a, e, function QI() {
                return ee.lFrame.currentNamespace
            }())
              , c = function Vl(t) {
                return 1 == (1 & t.flags)
            }(u);
            return $r(u, !0),
            wy(a, l, u),
            32 != (32 & u.flags) && rc(o, i, l, u),
            0 === function RI() {
                return ee.lFrame.elementDepthCount
            }() && Gt(l, i),
            function PI() {
                ee.lFrame.elementDepthCount++
            }(),
            c && (function Yh(t, e, n) {
                f_() && (function QA(t, e, n, r) {
                    const i = n.directiveStart
                      , o = n.directiveEnd;
                    Ha(n) && function rF(t, e, n) {
                        const r = Nn(e, t)
                          , i = mv(n)
                          , o = t[Ll]
                          , s = mc(t, pc(t, i, null, n.onPush ? 32 : 16, r, e, o, o.createRenderer(r, n), null, null, null));
                        t[e.index] = s
                    }(e, n, t.data[i + n.componentOffset]),
                    t.firstCreatePass || Zl(n, e),
                    Gt(r, e);
                    const s = n.initialInputs;
                    for (let a = i; a < o; a++) {
                        const u = t.data[a]
                          , l = Io(e, t, a, n);
                        Gt(l, e),
                        null !== s && iF(0, a - i, l, u, 0, s),
                        _r(u) && (vn(n.index, e)[ot] = Io(e, t, a, n))
                    }
                }(t, e, n, Nn(n, e)),
                64 == (64 & n.flags) && Cv(t, e, n))
            }(o, i, u),
            qh(o, u, i)),
            null !== r && function Zh(t, e, n=Nn) {
                const r = e.localNames;
                if (null !== r) {
                    let i = e.index + 1;
                    for (let o = 0; o < r.length; o += 2) {
                        const s = r[o + 1]
                          , a = -1 === s ? n(e, t) : t[s];
                        t[i++] = a
                    }
                }
            }(i, u),
            Ke
        }
        function wt() {
            let t = kt();
            Vf() ? function $f() {
                ee.lFrame.isParent = !1
            }() : (t = t.parent,
            $r(t, !1));
            const e = t;
            !function OI() {
                ee.lFrame.elementDepthCount--
            }();
            const n = Ce();
            return n.firstCreatePass && (Hl(n, t),
            Lf(t) && n.queries.elementEnd(t)),
            null != e.classesWithoutHost && function eM(t) {
                return 0 != (8 & t.flags)
            }(e) && sp(n, e, I(), e.classesWithoutHost, !0),
            null != e.stylesWithoutHost && function tM(t) {
                return 0 != (16 & t.flags)
            }(e) && sp(n, e, I(), e.stylesWithoutHost, !1),
            wt
        }
        function xe(t, e, n, r) {
            return Ke(t, e, n, r),
            wt(),
            xe
        }
        function Ec(t) {
            return !!t && "function" == typeof t.then
        }
        const Wv = function Gv(t) {
            return !!t && "function" == typeof t.subscribe
        };
        function on(t, e="") {
            const n = I()
              , r = Ce()
              , i = t + Ue
              , o = r.firstCreatePass ? Rs(r, i, 1, e, null) : r.data[i]
              , s = n[i] = function mh(t, e) {
                return t.createText(e)
            }(n[ue], e);
            rc(r, n, s, o),
            $r(o, !1)
        }
        const zs = "en-US";
        let z0 = zs;
        class Gs {
        }
        class mC {
        }
        class DC extends Gs {
            constructor(e, n) {
                super(),
                this._parent = n,
                this._bootstrapComponents = [],
                this.destroyCbs = [],
                this.componentFactoryResolver = new Iv(this);
                const r = Pn(e);
                this._bootstrapComponents = yi(r.bootstrap),
                this._r3Injector = sv(e, n, [{
                    provide: Gs,
                    useValue: this
                }, {
                    provide: su,
                    useValue: this.componentFactoryResolver
                }], Be(e), new Set(["environment"])),
                this._r3Injector.resolveInjectorInitializers(),
                this.instance = this._r3Injector.get(e)
            }
            get injector() {
                return this._r3Injector
            }
            destroy() {
                const e = this._r3Injector;
                !e.destroyed && e.destroy(),
                this.destroyCbs.forEach(n=>n()),
                this.destroyCbs = null
            }
            onDestroy(e) {
                this.destroyCbs.push(e)
            }
        }
        class wp extends mC {
            constructor(e) {
                super(),
                this.moduleType = e
            }
            create(e) {
                return new DC(this.moduleType,e)
            }
        }
        class NP extends Gs {
            constructor(e, n, r) {
                super(),
                this.componentFactoryResolver = new Iv(this),
                this.instance = null;
                const i = new zy([...e, {
                    provide: Gs,
                    useValue: this
                }, {
                    provide: su,
                    useValue: this.componentFactoryResolver
                }],n || cc(),r,new Set(["environment"]));
                this.injector = i,
                i.resolveInjectorInitializers()
            }
            destroy() {
                this.injector.destroy()
            }
            onDestroy(e) {
                this.injector.onDestroy(e)
            }
        }
        function Ac(t, e, n=null) {
            return new NP(t,e,n).injector
        }
        let kP = (()=>{
            class t {
                constructor(n) {
                    this._injector = n,
                    this.cachedInjectors = new Map
                }
                getOrCreateStandaloneInjector(n) {
                    if (!n.standalone)
                        return null;
                    if (!this.cachedInjectors.has(n.id)) {
                        const r = Vy(0, n.type)
                          , i = r.length > 0 ? Ac([r], this._injector, `Standalone[${n.type.name}]`) : null;
                        this.cachedInjectors.set(n.id, i)
                    }
                    return this.cachedInjectors.get(n.id)
                }
                ngOnDestroy() {
                    try {
                        for (const n of this.cachedInjectors.values())
                            null !== n && n.destroy()
                    } finally {
                        this.cachedInjectors.clear()
                    }
                }
            }
            return t.\u0275prov = Q({
                token: t,
                providedIn: "environment",
                factory: ()=>new t(W(_i))
            }),
            t
        }
        )();
        function _C(t) {
            t.getStandaloneInjector = e=>e.get(kP).getOrCreateStandaloneInjector(t)
        }
        function bp(t) {
            return e=>{
                setTimeout(t, void 0, e)
            }
        }
        const an = class uO extends ui {
            constructor(e=!1) {
                super(),
                this.__isAsync = e
            }
            emit(e) {
                super.next(e)
            }
            subscribe(e, n, r) {
                let i = e
                  , o = n || (()=>null)
                  , s = r;
                if (e && "object" == typeof e) {
                    const u = e;
                    i = u.next?.bind(u),
                    o = u.error?.bind(u),
                    s = u.complete?.bind(u)
                }
                this.__isAsync && (o = bp(o),
                i && (i = bp(i)),
                s && (s = bp(s)));
                const a = super.subscribe({
                    next: i,
                    error: o,
                    complete: s
                });
                return e instanceof Kn && e.add(a),
                a
            }
        }
        ;
        let wr = (()=>{
            class t {
            }
            return t.__NG_ELEMENT_ID__ = hO,
            t
        }
        )();
        function hO() {
            return function RC(t, e) {
                let n;
                const r = e[t.index];
                if (Dr(r))
                    n = r;
                else {
                    let i;
                    if (8 & t.type)
                        i = Nt(r);
                    else {
                        const o = e[ue];
                        i = o.createComment("");
                        const s = Nn(t, e);
                        xo(o, nc(o, s), i, function ix(t, e) {
                            return t.nextSibling(e)
                        }(o, s), !1)
                    }
                    e[t.index] = n = function wv(t, e, n, r) {
                        return [t, !0, !1, e, null, 0, r, n, null, null]
                    }(r, e, i, t),
                    mc(e, n)
                }
                return new AC(n,t,e)
            }(kt(), I())
        }
        const pO = wr
          , AC = class extends pO {
            constructor(e, n, r) {
                super(),
                this._lContainer = e,
                this._hostTNode = n,
                this._hostLView = r
            }
            get element() {
                return Ms(this._hostTNode, this._hostLView)
            }
            get injector() {
                return new _s(this._hostTNode,this._hostLView)
            }
            get parentInjector() {
                const e = Xf(this._hostTNode, this._hostLView);
                if (I_(e)) {
                    const n = ql(e, this._hostLView)
                      , r = Wl(e);
                    return new _s(n[N].data[r + 8],n)
                }
                return new _s(null,this._hostLView)
            }
            clear() {
                for (; this.length > 0; )
                    this.remove(this.length - 1)
            }
            get(e) {
                const n = FC(this._lContainer);
                return null !== n && n[e] || null
            }
            get length() {
                return this._lContainer.length - tn
            }
            createEmbeddedView(e, n, r) {
                let i, o;
                "number" == typeof r ? i = r : null != r && (i = r.index,
                o = r.injector);
                const s = e.createEmbeddedView(n || {}, o);
                return this.insert(s, i),
                s
            }
            createComponent(e, n, r, i, o) {
                const s = e && !function Ya(t) {
                    return "function" == typeof t
                }(e);
                let a;
                if (s)
                    a = n;
                else {
                    const d = n || {};
                    a = d.index,
                    r = d.injector,
                    i = d.projectableNodes,
                    o = d.environmentInjector || d.ngModuleRef
                }
                const u = s ? e : new lu(Me(e))
                  , l = r || this.parentInjector;
                if (!o && null == u.ngModule) {
                    const f = (s ? l : this.parentInjector).get(_i, null);
                    f && (o = f)
                }
                const c = u.create(l, i, void 0, o);
                return this.insert(c.hostView, a),
                c
            }
            insert(e, n) {
                const r = e._lView
                  , i = r[N];
                if (function FI(t) {
                    return Dr(t[Qe])
                }(r)) {
                    const c = this.indexOf(e);
                    if (-1 !== c)
                        this.detach(c);
                    else {
                        const d = r[Qe]
                          , f = new AC(d,d[Ht],d[Qe]);
                        f.detach(f.indexOf(e))
                    }
                }
                const o = this._adjustIndex(n)
                  , s = this._lContainer;
                !function JM(t, e, n, r) {
                    const i = tn + r
                      , o = n.length;
                    r > 0 && (n[i - 1][mr] = e),
                    r < o - tn ? (e[mr] = n[i],
                    V_(n, tn + r, e)) : (n.push(e),
                    e[mr] = null),
                    e[Qe] = n;
                    const s = e[$a];
                    null !== s && n !== s && function ex(t, e) {
                        const n = t[ps];
                        e[zt] !== e[Qe][Qe][zt] && (t[t_] = !0),
                        null === n ? t[ps] = [e] : n.push(e)
                    }(s, e);
                    const a = e[Vr];
                    null !== a && a.insertView(t),
                    e[oe] |= 64
                }(i, r, s, o);
                const a = Ch(o, s)
                  , u = r[ue]
                  , l = nc(u, s[Bl]);
                return null !== l && function QM(t, e, n, r, i, o) {
                    r[pi] = i,
                    r[Ht] = e,
                    nu(t, r, n, 1, i, o)
                }(i, s[Ht], u, r, l, a),
                e.attachToViewContainerRef(),
                V_(Tp(s), o, e),
                e
            }
            move(e, n) {
                return this.insert(e, n)
            }
            indexOf(e) {
                const n = FC(this._lContainer);
                return null !== n ? n.indexOf(e) : -1
            }
            remove(e) {
                const n = this._adjustIndex(e, -1)
                  , r = _h(this._lContainer, n);
                r && (Xl(Tp(this._lContainer), n),
                cy(r[N], r))
            }
            detach(e) {
                const n = this._adjustIndex(e, -1)
                  , r = _h(this._lContainer, n);
                return r && null != Xl(Tp(this._lContainer), n) ? new uu(r) : null
            }
            _adjustIndex(e, n=0) {
                return e ?? this.length + n
            }
        }
        ;
        function FC(t) {
            return t[jl]
        }
        function Tp(t) {
            return t[jl] || (t[jl] = [])
        }
        function Pc(...t) {}
        const Oc = new K("Application Initializer");
        let Nc = (()=>{
            class t {
                constructor(n) {
                    this.appInits = n,
                    this.resolve = Pc,
                    this.reject = Pc,
                    this.initialized = !1,
                    this.done = !1,
                    this.donePromise = new Promise((r,i)=>{
                        this.resolve = r,
                        this.reject = i
                    }
                    )
                }
                runInitializers() {
                    if (this.initialized)
                        return;
                    const n = []
                      , r = ()=>{
                        this.done = !0,
                        this.resolve()
                    }
                    ;
                    if (this.appInits)
                        for (let i = 0; i < this.appInits.length; i++) {
                            const o = this.appInits[i]();
                            if (Ec(o))
                                n.push(o);
                            else if (Wv(o)) {
                                const s = new Promise((a,u)=>{
                                    o.subscribe({
                                        complete: a,
                                        error: u
                                    })
                                }
                                );
                                n.push(s)
                            }
                        }
                    Promise.all(n).then(()=>{
                        r()
                    }
                    ).catch(i=>{
                        this.reject(i)
                    }
                    ),
                    0 === n.length && r(),
                    this.initialized = !0
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)(W(Oc, 8))
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac,
                providedIn: "root"
            }),
            t
        }
        )();
        const vu = new K("AppId",{
            providedIn: "root",
            factory: function iw() {
                return `${Lp()}${Lp()}${Lp()}`
            }
        });
        function Lp() {
            return String.fromCharCode(97 + Math.floor(25 * Math.random()))
        }
        const ow = new K("Platform Initializer")
          , sw = new K("Platform ID",{
            providedIn: "platform",
            factory: ()=>"unknown"
        });
        let UO = (()=>{
            class t {
                log(n) {
                    console.log(n)
                }
                warn(n) {
                    console.warn(n)
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac,
                providedIn: "platform"
            }),
            t
        }
        )();
        const Ei = new K("LocaleId",{
            providedIn: "root",
            factory: ()=>De(Ei, G.Optional | G.SkipSelf) || function HO() {
                return typeof $localize < "u" && $localize.locale || zs
            }()
        });
        class GO {
            constructor(e, n) {
                this.ngModuleFactory = e,
                this.componentFactories = n
            }
        }
        let aw = (()=>{
            class t {
                compileModuleSync(n) {
                    return new wp(n)
                }
                compileModuleAsync(n) {
                    return Promise.resolve(this.compileModuleSync(n))
                }
                compileModuleAndAllComponentsSync(n) {
                    const r = this.compileModuleSync(n)
                      , o = yi(Pn(n).declarations).reduce((s,a)=>{
                        const u = Me(a);
                        return u && s.push(new lu(u)),
                        s
                    }
                    , []);
                    return new GO(r,o)
                }
                compileModuleAndAllComponentsAsync(n) {
                    return Promise.resolve(this.compileModuleAndAllComponentsSync(n))
                }
                clearCache() {}
                clearCacheFor(n) {}
                getModuleId(n) {}
            }
            return t.\u0275fac = function(n) {
                return new (n || t)
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac,
                providedIn: "root"
            }),
            t
        }
        )();
        const YO = (()=>Promise.resolve(0))();
        function Bp(t) {
            typeof Zone > "u" ? YO.then(()=>{
                t && t.apply(null, null)
            }
            ) : Zone.current.scheduleMicroTask("scheduleMicrotask", t)
        }
        class st {
            constructor({enableLongStackTrace: e=!1, shouldCoalesceEventChangeDetection: n=!1, shouldCoalesceRunChangeDetection: r=!1}) {
                if (this.hasPendingMacrotasks = !1,
                this.hasPendingMicrotasks = !1,
                this.isStable = !0,
                this.onUnstable = new an(!1),
                this.onMicrotaskEmpty = new an(!1),
                this.onStable = new an(!1),
                this.onError = new an(!1),
                typeof Zone > "u")
                    throw new P(908,!1);
                Zone.assertZonePatched();
                const i = this;
                i._nesting = 0,
                i._outer = i._inner = Zone.current,
                Zone.TaskTrackingZoneSpec && (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec)),
                e && Zone.longStackTraceZoneSpec && (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
                i.shouldCoalesceEventChangeDetection = !r && n,
                i.shouldCoalesceRunChangeDetection = r,
                i.lastRequestAnimationFrameId = -1,
                i.nativeRequestAnimationFrame = function ZO() {
                    let t = $e.requestAnimationFrame
                      , e = $e.cancelAnimationFrame;
                    if (typeof Zone < "u" && t && e) {
                        const n = t[Zone.__symbol__("OriginalDelegate")];
                        n && (t = n);
                        const r = e[Zone.__symbol__("OriginalDelegate")];
                        r && (e = r)
                    }
                    return {
                        nativeRequestAnimationFrame: t,
                        nativeCancelAnimationFrame: e
                    }
                }().nativeRequestAnimationFrame,
                function XO(t) {
                    const e = ()=>{
                        !function KO(t) {
                            t.isCheckStableRunning || -1 !== t.lastRequestAnimationFrameId || (t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call($e, ()=>{
                                t.fakeTopEventTask || (t.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", ()=>{
                                    t.lastRequestAnimationFrameId = -1,
                                    Vp(t),
                                    t.isCheckStableRunning = !0,
                                    jp(t),
                                    t.isCheckStableRunning = !1
                                }
                                , void 0, ()=>{}
                                , ()=>{}
                                )),
                                t.fakeTopEventTask.invoke()
                            }
                            ),
                            Vp(t))
                        }(t)
                    }
                    ;
                    t._inner = t._inner.fork({
                        name: "angular",
                        properties: {
                            isAngularZone: !0
                        },
                        onInvokeTask: (n,r,i,o,s,a)=>{
                            try {
                                return cw(t),
                                n.invokeTask(i, o, s, a)
                            } finally {
                                (t.shouldCoalesceEventChangeDetection && "eventTask" === o.type || t.shouldCoalesceRunChangeDetection) && e(),
                                dw(t)
                            }
                        }
                        ,
                        onInvoke: (n,r,i,o,s,a,u)=>{
                            try {
                                return cw(t),
                                n.invoke(i, o, s, a, u)
                            } finally {
                                t.shouldCoalesceRunChangeDetection && e(),
                                dw(t)
                            }
                        }
                        ,
                        onHasTask: (n,r,i,o)=>{
                            n.hasTask(i, o),
                            r === i && ("microTask" == o.change ? (t._hasPendingMicrotasks = o.microTask,
                            Vp(t),
                            jp(t)) : "macroTask" == o.change && (t.hasPendingMacrotasks = o.macroTask))
                        }
                        ,
                        onHandleError: (n,r,i,o)=>(n.handleError(i, o),
                        t.runOutsideAngular(()=>t.onError.emit(o)),
                        !1)
                    })
                }(i)
            }
            static isInAngularZone() {
                return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone")
            }
            static assertInAngularZone() {
                if (!st.isInAngularZone())
                    throw new P(909,!1)
            }
            static assertNotInAngularZone() {
                if (st.isInAngularZone())
                    throw new P(909,!1)
            }
            run(e, n, r) {
                return this._inner.run(e, n, r)
            }
            runTask(e, n, r, i) {
                const o = this._inner
                  , s = o.scheduleEventTask("NgZoneEvent: " + i, e, QO, Pc, Pc);
                try {
                    return o.runTask(s, n, r)
                } finally {
                    o.cancelTask(s)
                }
            }
            runGuarded(e, n, r) {
                return this._inner.runGuarded(e, n, r)
            }
            runOutsideAngular(e) {
                return this._outer.run(e)
            }
        }
        const QO = {};
        function jp(t) {
            if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
                try {
                    t._nesting++,
                    t.onMicrotaskEmpty.emit(null)
                } finally {
                    if (t._nesting--,
                    !t.hasPendingMicrotasks)
                        try {
                            t.runOutsideAngular(()=>t.onStable.emit(null))
                        } finally {
                            t.isStable = !0
                        }
                }
        }
        function Vp(t) {
            t.hasPendingMicrotasks = !!(t._hasPendingMicrotasks || (t.shouldCoalesceEventChangeDetection || t.shouldCoalesceRunChangeDetection) && -1 !== t.lastRequestAnimationFrameId)
        }
        function cw(t) {
            t._nesting++,
            t.isStable && (t.isStable = !1,
            t.onUnstable.emit(null))
        }
        function dw(t) {
            t._nesting--,
            jp(t)
        }
        class JO {
            constructor() {
                this.hasPendingMicrotasks = !1,
                this.hasPendingMacrotasks = !1,
                this.isStable = !0,
                this.onUnstable = new an,
                this.onMicrotaskEmpty = new an,
                this.onStable = new an,
                this.onError = new an
            }
            run(e, n, r) {
                return e.apply(n, r)
            }
            runGuarded(e, n, r) {
                return e.apply(n, r)
            }
            runOutsideAngular(e) {
                return e()
            }
            runTask(e, n, r, i) {
                return e.apply(n, r)
            }
        }
        const fw = new K("")
          , kc = new K("");
        let Hp, $p = (()=>{
            class t {
                constructor(n, r, i) {
                    this._ngZone = n,
                    this.registry = r,
                    this._pendingCount = 0,
                    this._isZoneStable = !0,
                    this._didWork = !1,
                    this._callbacks = [],
                    this.taskTrackingZone = null,
                    Hp || (function eN(t) {
                        Hp = t
                    }(i),
                    i.addToWindow(r)),
                    this._watchAngularEvents(),
                    n.run(()=>{
                        this.taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone")
                    }
                    )
                }
                _watchAngularEvents() {
                    this._ngZone.onUnstable.subscribe({
                        next: ()=>{
                            this._didWork = !0,
                            this._isZoneStable = !1
                        }
                    }),
                    this._ngZone.runOutsideAngular(()=>{
                        this._ngZone.onStable.subscribe({
                            next: ()=>{
                                st.assertNotInAngularZone(),
                                Bp(()=>{
                                    this._isZoneStable = !0,
                                    this._runCallbacksIfReady()
                                }
                                )
                            }
                        })
                    }
                    )
                }
                increasePendingRequestCount() {
                    return this._pendingCount += 1,
                    this._didWork = !0,
                    this._pendingCount
                }
                decreasePendingRequestCount() {
                    if (this._pendingCount -= 1,
                    this._pendingCount < 0)
                        throw new Error("pending async requests below zero");
                    return this._runCallbacksIfReady(),
                    this._pendingCount
                }
                isStable() {
                    return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
                }
                _runCallbacksIfReady() {
                    if (this.isStable())
                        Bp(()=>{
                            for (; 0 !== this._callbacks.length; ) {
                                let n = this._callbacks.pop();
                                clearTimeout(n.timeoutId),
                                n.doneCb(this._didWork)
                            }
                            this._didWork = !1
                        }
                        );
                    else {
                        let n = this.getPendingTasks();
                        this._callbacks = this._callbacks.filter(r=>!r.updateCb || !r.updateCb(n) || (clearTimeout(r.timeoutId),
                        !1)),
                        this._didWork = !0
                    }
                }
                getPendingTasks() {
                    return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(n=>({
                        source: n.source,
                        creationLocation: n.creationLocation,
                        data: n.data
                    })) : []
                }
                addCallback(n, r, i) {
                    let o = -1;
                    r && r > 0 && (o = setTimeout(()=>{
                        this._callbacks = this._callbacks.filter(s=>s.timeoutId !== o),
                        n(this._didWork, this.getPendingTasks())
                    }
                    , r)),
                    this._callbacks.push({
                        doneCb: n,
                        timeoutId: o,
                        updateCb: i
                    })
                }
                whenStable(n, r, i) {
                    if (i && !this.taskTrackingZone)
                        throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
                    this.addCallback(n, r, i),
                    this._runCallbacksIfReady()
                }
                getPendingRequestCount() {
                    return this._pendingCount
                }
                registerApplication(n) {
                    this.registry.registerApplication(n, this)
                }
                unregisterApplication(n) {
                    this.registry.unregisterApplication(n)
                }
                findProviders(n, r, i) {
                    return []
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)(W(st),W(Up),W(kc))
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac
            }),
            t
        }
        )(), Up = (()=>{
            class t {
                constructor() {
                    this._applications = new Map
                }
                registerApplication(n, r) {
                    this._applications.set(n, r)
                }
                unregisterApplication(n) {
                    this._applications.delete(n)
                }
                unregisterAllApplications() {
                    this._applications.clear()
                }
                getTestability(n) {
                    return this._applications.get(n) || null
                }
                getAllTestabilities() {
                    return Array.from(this._applications.values())
                }
                getAllRootElements() {
                    return Array.from(this._applications.keys())
                }
                findTestabilityInTree(n, r=!0) {
                    return Hp?.findTestabilityInTree(this, n, r) ?? null
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac,
                providedIn: "platform"
            }),
            t
        }
        )();
        const bi = !1;
        let Wi = null;
        const hw = new K("AllowMultipleToken")
          , zp = new K("PlatformDestroyListeners")
          , pw = new K("appBootstrapListener");
        class gw {
            constructor(e, n) {
                this.name = e,
                this.token = n
            }
        }
        function Dw(t, e, n=[]) {
            const r = `Platform: ${e}`
              , i = new K(r);
            return (o=[])=>{
                let s = Gp();
                if (!s || s.injector.get(hw, !1)) {
                    const a = [...n, ...o, {
                        provide: i,
                        useValue: !0
                    }];
                    t ? t(a) : function rN(t) {
                        if (Wi && !Wi.get(hw, !1))
                            throw new P(400,!1);
                        Wi = t;
                        const e = t.get(yw);
                        (function mw(t) {
                            const e = t.get(ow, null);
                            e && e.forEach(n=>n())
                        }
                        )(t)
                    }(function _w(t=[], e) {
                        return vi.create({
                            name: e,
                            providers: [{
                                provide: Oh,
                                useValue: "platform"
                            }, {
                                provide: zp,
                                useValue: new Set([()=>Wi = null])
                            }, ...t]
                        })
                    }(a, r))
                }
                return function oN(t) {
                    const e = Gp();
                    if (!e)
                        throw new P(401,!1);
                    return e
                }()
            }
        }
        function Gp() {
            return Wi?.get(yw) ?? null
        }
        let yw = (()=>{
            class t {
                constructor(n) {
                    this._injector = n,
                    this._modules = [],
                    this._destroyListeners = [],
                    this._destroyed = !1
                }
                bootstrapModuleFactory(n, r) {
                    const i = function Cw(t, e) {
                        let n;
                        return n = "noop" === t ? new JO : ("zone.js" === t ? void 0 : t) || new st(e),
                        n
                    }(r?.ngZone, function vw(t) {
                        return {
                            enableLongStackTrace: !1,
                            shouldCoalesceEventChangeDetection: !(!t || !t.ngZoneEventCoalescing) || !1,
                            shouldCoalesceRunChangeDetection: !(!t || !t.ngZoneRunCoalescing) || !1
                        }
                    }(r))
                      , o = [{
                        provide: st,
                        useValue: i
                    }];
                    return i.run(()=>{
                        const s = vi.create({
                            providers: o,
                            parent: this.injector,
                            name: n.moduleType.name
                        })
                          , a = n.create(s)
                          , u = a.injector.get(xs, null);
                        if (!u)
                            throw new P(402,!1);
                        return i.runOutsideAngular(()=>{
                            const l = i.onError.subscribe({
                                next: c=>{
                                    u.handleError(c)
                                }
                            });
                            a.onDestroy(()=>{
                                Bc(this._modules, a),
                                l.unsubscribe()
                            }
                            )
                        }
                        ),
                        function ww(t, e, n) {
                            try {
                                const r = n();
                                return Ec(r) ? r.catch(i=>{
                                    throw e.runOutsideAngular(()=>t.handleError(i)),
                                    i
                                }
                                ) : r
                            } catch (r) {
                                throw e.runOutsideAngular(()=>t.handleError(r)),
                                r
                            }
                        }(u, i, ()=>{
                            const l = a.injector.get(Nc);
                            return l.runInitializers(),
                            l.donePromise.then(()=>(function G0(t) {
                                Xn(t, "Expected localeId to be defined"),
                                "string" == typeof t && (z0 = t.toLowerCase().replace(/_/g, "-"))
                            }(a.injector.get(Ei, zs) || zs),
                            this._moduleDoBootstrap(a),
                            a))
                        }
                        )
                    }
                    )
                }
                bootstrapModule(n, r=[]) {
                    const i = Ew({}, r);
                    return function tN(t, e, n) {
                        const r = new wp(n);
                        return Promise.resolve(r)
                    }(0, 0, n).then(o=>this.bootstrapModuleFactory(o, i))
                }
                _moduleDoBootstrap(n) {
                    const r = n.injector.get(Lc);
                    if (n._bootstrapComponents.length > 0)
                        n._bootstrapComponents.forEach(i=>r.bootstrap(i));
                    else {
                        if (!n.instance.ngDoBootstrap)
                            throw new P(-403,!1);
                        n.instance.ngDoBootstrap(r)
                    }
                    this._modules.push(n)
                }
                onDestroy(n) {
                    this._destroyListeners.push(n)
                }
                get injector() {
                    return this._injector
                }
                destroy() {
                    if (this._destroyed)
                        throw new P(404,!1);
                    this._modules.slice().forEach(r=>r.destroy()),
                    this._destroyListeners.forEach(r=>r());
                    const n = this._injector.get(zp, null);
                    n && (n.forEach(r=>r()),
                    n.clear()),
                    this._destroyed = !0
                }
                get destroyed() {
                    return this._destroyed
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)(W(vi))
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac,
                providedIn: "platform"
            }),
            t
        }
        )();
        function Ew(t, e) {
            return Array.isArray(e) ? e.reduce(Ew, t) : {
                ...t,
                ...e
            }
        }
        let Lc = (()=>{
            class t {
                get destroyed() {
                    return this._destroyed
                }
                get injector() {
                    return this._injector
                }
                constructor(n, r, i) {
                    this._zone = n,
                    this._injector = r,
                    this._exceptionHandler = i,
                    this._bootstrapListeners = [],
                    this._views = [],
                    this._runningTick = !1,
                    this._stable = !0,
                    this._destroyed = !1,
                    this._destroyListeners = [],
                    this.componentTypes = [],
                    this.components = [],
                    this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                        next: ()=>{
                            this._zone.run(()=>{
                                this.tick()
                            }
                            )
                        }
                    });
                    const o = new yt(a=>{
                        this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks,
                        this._zone.runOutsideAngular(()=>{
                            a.next(this._stable),
                            a.complete()
                        }
                        )
                    }
                    )
                      , s = new yt(a=>{
                        let u;
                        this._zone.runOutsideAngular(()=>{
                            u = this._zone.onStable.subscribe(()=>{
                                st.assertNotInAngularZone(),
                                Bp(()=>{
                                    !this._stable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks && (this._stable = !0,
                                    a.next(!0))
                                }
                                )
                            }
                            )
                        }
                        );
                        const l = this._zone.onUnstable.subscribe(()=>{
                            st.assertInAngularZone(),
                            this._stable && (this._stable = !1,
                            this._zone.runOutsideAngular(()=>{
                                a.next(!1)
                            }
                            ))
                        }
                        );
                        return ()=>{
                            u.unsubscribe(),
                            l.unsubscribe()
                        }
                    }
                    );
                    this.isStable = function QT(...t) {
                        const e = Na(t)
                          , n = function HT(t, e) {
                            return "number" == typeof wf(t) ? t.pop() : e
                        }(t, 1 / 0)
                          , r = t;
                        return r.length ? 1 === r.length ? gr(r[0]) : us(n)(vt(r, e)) : kr
                    }(o, s.pipe(function KT(t={}) {
                        const {connector: e=(()=>new ui), resetOnError: n=!0, resetOnComplete: r=!0, resetOnRefCountZero: i=!0} = t;
                        return o=>{
                            let s, a, u, l = 0, c = !1, d = !1;
                            const f = ()=>{
                                a?.unsubscribe(),
                                a = void 0
                            }
                              , h = ()=>{
                                f(),
                                s = u = void 0,
                                c = d = !1
                            }
                              , p = ()=>{
                                const g = s;
                                h(),
                                g?.unsubscribe()
                            }
                            ;
                            return Mt((g,m)=>{
                                l++,
                                !d && !c && f();
                                const _ = u = u ?? e();
                                m.add(()=>{
                                    l--,
                                    0 === l && !d && !c && (a = Ef(p, i))
                                }
                                ),
                                _.subscribe(m),
                                !s && l > 0 && (s = new Oa({
                                    next: y=>_.next(y),
                                    error: y=>{
                                        d = !0,
                                        f(),
                                        a = Ef(h, n, y),
                                        _.error(y)
                                    }
                                    ,
                                    complete: ()=>{
                                        c = !0,
                                        f(),
                                        a = Ef(h, r),
                                        _.complete()
                                    }
                                }),
                                gr(g).subscribe(s))
                            }
                            )(o)
                        }
                    }()))
                }
                bootstrap(n, r) {
                    const i = n instanceof Wy;
                    if (!this._injector.get(Nc).done) {
                        !i && function cs(t) {
                            const e = Me(t) || Ut(t) || yn(t);
                            return null !== e && e.standalone
                        }(n);
                        throw new P(405,bi)
                    }
                    let s;
                    s = i ? n : this._injector.get(su).resolveComponentFactory(n),
                    this.componentTypes.push(s.componentType);
                    const a = function nN(t) {
                        return t.isBoundToModule
                    }(s) ? void 0 : this._injector.get(Gs)
                      , l = s.create(vi.NULL, [], r || s.selector, a)
                      , c = l.location.nativeElement
                      , d = l.injector.get(fw, null);
                    return d?.registerApplication(c),
                    l.onDestroy(()=>{
                        this.detachView(l.hostView),
                        Bc(this.components, l),
                        d?.unregisterApplication(c)
                    }
                    ),
                    this._loadComponent(l),
                    l
                }
                tick() {
                    if (this._runningTick)
                        throw new P(101,!1);
                    try {
                        this._runningTick = !0;
                        for (let n of this._views)
                            n.detectChanges()
                    } catch (n) {
                        this._zone.runOutsideAngular(()=>this._exceptionHandler.handleError(n))
                    } finally {
                        this._runningTick = !1
                    }
                }
                attachView(n) {
                    const r = n;
                    this._views.push(r),
                    r.attachToAppRef(this)
                }
                detachView(n) {
                    const r = n;
                    Bc(this._views, r),
                    r.detachFromAppRef()
                }
                _loadComponent(n) {
                    this.attachView(n.hostView),
                    this.tick(),
                    this.components.push(n);
                    const r = this._injector.get(pw, []);
                    r.push(...this._bootstrapListeners),
                    r.forEach(i=>i(n))
                }
                ngOnDestroy() {
                    if (!this._destroyed)
                        try {
                            this._destroyListeners.forEach(n=>n()),
                            this._views.slice().forEach(n=>n.destroy()),
                            this._onMicrotaskEmptySubscription.unsubscribe()
                        } finally {
                            this._destroyed = !0,
                            this._views = [],
                            this._bootstrapListeners = [],
                            this._destroyListeners = []
                        }
                }
                onDestroy(n) {
                    return this._destroyListeners.push(n),
                    ()=>Bc(this._destroyListeners, n)
                }
                destroy() {
                    if (this._destroyed)
                        throw new P(406,!1);
                    const n = this._injector;
                    n.destroy && !n.destroyed && n.destroy()
                }
                get viewCount() {
                    return this._views.length
                }
                warnIfDestroyed() {}
            }
            return t.\u0275fac = function(n) {
                return new (n || t)(W(st),W(_i),W(xs))
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac,
                providedIn: "root"
            }),
            t
        }
        )();
        function Bc(t, e) {
            const n = t.indexOf(e);
            n > -1 && t.splice(n, 1)
        }
        let Wp = (()=>{
            class t {
            }
            return t.__NG_ELEMENT_ID__ = aN,
            t
        }
        )();
        function aN(t) {
            return function uN(t, e, n) {
                if (Ha(t) && !n) {
                    const r = vn(t.index, e);
                    return new uu(r,r)
                }
                return 47 & t.type ? new uu(e[zt],e) : null
            }(kt(), I(), 16 == (16 & t))
        }
        const CN = Dw(null, "core", []);
        let wN = (()=>{
            class t {
                constructor(n) {}
            }
            return t.\u0275fac = function(n) {
                return new (n || t)(W(Lc))
            }
            ,
            t.\u0275mod = $i({
                type: t
            }),
            t.\u0275inj = ci({}),
            t
        }
        )()
          , Xp = null;
        function No() {
            return Xp
        }
        class SN {
        }
        const En = new K("DocumentToken");
        let Jp = (()=>{
            class t {
                historyGo(n) {
                    throw new Error("Not implemented")
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: function() {
                    return function TN() {
                        return W(Ow)
                    }()
                },
                providedIn: "platform"
            }),
            t
        }
        )();
        const IN = new K("Location Initialized");
        let Ow = (()=>{
            class t extends Jp {
                constructor(n) {
                    super(),
                    this._doc = n,
                    this._location = window.location,
                    this._history = window.history
                }
                getBaseHrefFromDOM() {
                    return No().getBaseHref(this._doc)
                }
                onPopState(n) {
                    const r = No().getGlobalEventTarget(this._doc, "window");
                    return r.addEventListener("popstate", n, !1),
                    ()=>r.removeEventListener("popstate", n)
                }
                onHashChange(n) {
                    const r = No().getGlobalEventTarget(this._doc, "window");
                    return r.addEventListener("hashchange", n, !1),
                    ()=>r.removeEventListener("hashchange", n)
                }
                get href() {
                    return this._location.href
                }
                get protocol() {
                    return this._location.protocol
                }
                get hostname() {
                    return this._location.hostname
                }
                get port() {
                    return this._location.port
                }
                get pathname() {
                    return this._location.pathname
                }
                get search() {
                    return this._location.search
                }
                get hash() {
                    return this._location.hash
                }
                set pathname(n) {
                    this._location.pathname = n
                }
                pushState(n, r, i) {
                    Nw() ? this._history.pushState(n, r, i) : this._location.hash = i
                }
                replaceState(n, r, i) {
                    Nw() ? this._history.replaceState(n, r, i) : this._location.hash = i
                }
                forward() {
                    this._history.forward()
                }
                back() {
                    this._history.back()
                }
                historyGo(n=0) {
                    this._history.go(n)
                }
                getState() {
                    return this._history.state
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)(W(En))
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: function() {
                    return function MN() {
                        return new Ow(W(En))
                    }()
                },
                providedIn: "platform"
            }),
            t
        }
        )();
        function Nw() {
            return !!window.history.pushState
        }
        function eg(t, e) {
            if (0 == t.length)
                return e;
            if (0 == e.length)
                return t;
            let n = 0;
            return t.endsWith("/") && n++,
            e.startsWith("/") && n++,
            2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
        }
        function kw(t) {
            const e = t.match(/#|\?|$/)
              , n = e && e.index || t.length;
            return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n)
        }
        function Si(t) {
            return t && "?" !== t[0] ? "?" + t : t
        }
        let ko = (()=>{
            class t {
                historyGo(n) {
                    throw new Error("Not implemented")
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: function() {
                    return De(Bw)
                },
                providedIn: "root"
            }),
            t
        }
        )();
        const Lw = new K("appBaseHref");
        let Bw = (()=>{
            class t extends ko {
                constructor(n, r) {
                    super(),
                    this._platformLocation = n,
                    this._removeListenerFns = [],
                    this._baseHref = r ?? this._platformLocation.getBaseHrefFromDOM() ?? De(En).location?.origin ?? ""
                }
                ngOnDestroy() {
                    for (; this._removeListenerFns.length; )
                        this._removeListenerFns.pop()()
                }
                onPopState(n) {
                    this._removeListenerFns.push(this._platformLocation.onPopState(n), this._platformLocation.onHashChange(n))
                }
                getBaseHref() {
                    return this._baseHref
                }
                prepareExternalUrl(n) {
                    return eg(this._baseHref, n)
                }
                path(n=!1) {
                    const r = this._platformLocation.pathname + Si(this._platformLocation.search)
                      , i = this._platformLocation.hash;
                    return i && n ? `${r}${i}` : r
                }
                pushState(n, r, i, o) {
                    const s = this.prepareExternalUrl(i + Si(o));
                    this._platformLocation.pushState(n, r, s)
                }
                replaceState(n, r, i, o) {
                    const s = this.prepareExternalUrl(i + Si(o));
                    this._platformLocation.replaceState(n, r, s)
                }
                forward() {
                    this._platformLocation.forward()
                }
                back() {
                    this._platformLocation.back()
                }
                getState() {
                    return this._platformLocation.getState()
                }
                historyGo(n=0) {
                    this._platformLocation.historyGo?.(n)
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)(W(Jp),W(Lw, 8))
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac,
                providedIn: "root"
            }),
            t
        }
        )()
          , xN = (()=>{
            class t extends ko {
                constructor(n, r) {
                    super(),
                    this._platformLocation = n,
                    this._baseHref = "",
                    this._removeListenerFns = [],
                    null != r && (this._baseHref = r)
                }
                ngOnDestroy() {
                    for (; this._removeListenerFns.length; )
                        this._removeListenerFns.pop()()
                }
                onPopState(n) {
                    this._removeListenerFns.push(this._platformLocation.onPopState(n), this._platformLocation.onHashChange(n))
                }
                getBaseHref() {
                    return this._baseHref
                }
                path(n=!1) {
                    let r = this._platformLocation.hash;
                    return null == r && (r = "#"),
                    r.length > 0 ? r.substring(1) : r
                }
                prepareExternalUrl(n) {
                    const r = eg(this._baseHref, n);
                    return r.length > 0 ? "#" + r : r
                }
                pushState(n, r, i, o) {
                    let s = this.prepareExternalUrl(i + Si(o));
                    0 == s.length && (s = this._platformLocation.pathname),
                    this._platformLocation.pushState(n, r, s)
                }
                replaceState(n, r, i, o) {
                    let s = this.prepareExternalUrl(i + Si(o));
                    0 == s.length && (s = this._platformLocation.pathname),
                    this._platformLocation.replaceState(n, r, s)
                }
                forward() {
                    this._platformLocation.forward()
                }
                back() {
                    this._platformLocation.back()
                }
                getState() {
                    return this._platformLocation.getState()
                }
                historyGo(n=0) {
                    this._platformLocation.historyGo?.(n)
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)(W(Jp),W(Lw, 8))
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac
            }),
            t
        }
        )()
          , tg = (()=>{
            class t {
                constructor(n) {
                    this._subject = new an,
                    this._urlChangeListeners = [],
                    this._urlChangeSubscription = null,
                    this._locationStrategy = n;
                    const r = this._locationStrategy.getBaseHref();
                    this._basePath = function RN(t) {
                        if (new RegExp("^(https?:)?//").test(t)) {
                            const [,n] = t.split(/\/\/[^\/]+/);
                            return n
                        }
                        return t
                    }(kw(jw(r))),
                    this._locationStrategy.onPopState(i=>{
                        this._subject.emit({
                            url: this.path(!0),
                            pop: !0,
                            state: i.state,
                            type: i.type
                        })
                    }
                    )
                }
                ngOnDestroy() {
                    this._urlChangeSubscription?.unsubscribe(),
                    this._urlChangeListeners = []
                }
                path(n=!1) {
                    return this.normalize(this._locationStrategy.path(n))
                }
                getState() {
                    return this._locationStrategy.getState()
                }
                isCurrentPathEqualTo(n, r="") {
                    return this.path() == this.normalize(n + Si(r))
                }
                normalize(n) {
                    return t.stripTrailingSlash(function FN(t, e) {
                        if (!t || !e.startsWith(t))
                            return e;
                        const n = e.substring(t.length);
                        return "" === n || ["/", ";", "?", "#"].includes(n[0]) ? n : e
                    }(this._basePath, jw(n)))
                }
                prepareExternalUrl(n) {
                    return n && "/" !== n[0] && (n = "/" + n),
                    this._locationStrategy.prepareExternalUrl(n)
                }
                go(n, r="", i=null) {
                    this._locationStrategy.pushState(i, "", n, r),
                    this._notifyUrlChangeListeners(this.prepareExternalUrl(n + Si(r)), i)
                }
                replaceState(n, r="", i=null) {
                    this._locationStrategy.replaceState(i, "", n, r),
                    this._notifyUrlChangeListeners(this.prepareExternalUrl(n + Si(r)), i)
                }
                forward() {
                    this._locationStrategy.forward()
                }
                back() {
                    this._locationStrategy.back()
                }
                historyGo(n=0) {
                    this._locationStrategy.historyGo?.(n)
                }
                onUrlChange(n) {
                    return this._urlChangeListeners.push(n),
                    this._urlChangeSubscription || (this._urlChangeSubscription = this.subscribe(r=>{
                        this._notifyUrlChangeListeners(r.url, r.state)
                    }
                    )),
                    ()=>{
                        const r = this._urlChangeListeners.indexOf(n);
                        this._urlChangeListeners.splice(r, 1),
                        0 === this._urlChangeListeners.length && (this._urlChangeSubscription?.unsubscribe(),
                        this._urlChangeSubscription = null)
                    }
                }
                _notifyUrlChangeListeners(n="", r) {
                    this._urlChangeListeners.forEach(i=>i(n, r))
                }
                subscribe(n, r, i) {
                    return this._subject.subscribe({
                        next: n,
                        error: r,
                        complete: i
                    })
                }
            }
            return t.normalizeQueryParams = Si,
            t.joinWithSlash = eg,
            t.stripTrailingSlash = kw,
            t.\u0275fac = function(n) {
                return new (n || t)(W(ko))
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: function() {
                    return function AN() {
                        return new tg(W(ko))
                    }()
                },
                providedIn: "root"
            }),
            t
        }
        )();
        function jw(t) {
            return t.replace(/\/index.html$/, "")
        }
        let tE = (()=>{
            class t {
            }
            return t.\u0275fac = function(n) {
                return new (n || t)
            }
            ,
            t.\u0275mod = $i({
                type: t
            }),
            t.\u0275inj = ci({}),
            t
        }
        )();
        let Qk = (()=>{
            class t {
            }
            return t.\u0275prov = Q({
                token: t,
                providedIn: "root",
                factory: ()=>new Kk(W(En),window)
            }),
            t
        }
        )();
        class Kk {
            constructor(e, n) {
                this.document = e,
                this.window = n,
                this.offset = ()=>[0, 0]
            }
            setOffset(e) {
                this.offset = Array.isArray(e) ? ()=>e : e
            }
            getScrollPosition() {
                return this.supportsScrolling() ? [this.window.pageXOffset, this.window.pageYOffset] : [0, 0]
            }
            scrollToPosition(e) {
                this.supportsScrolling() && this.window.scrollTo(e[0], e[1])
            }
            scrollToAnchor(e) {
                if (!this.supportsScrolling())
                    return;
                const n = function Xk(t, e) {
                    const n = t.getElementById(e) || t.getElementsByName(e)[0];
                    if (n)
                        return n;
                    if ("function" == typeof t.createTreeWalker && t.body && (t.body.createShadowRoot || t.body.attachShadow)) {
                        const r = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT);
                        let i = r.currentNode;
                        for (; i; ) {
                            const o = i.shadowRoot;
                            if (o) {
                                const s = o.getElementById(e) || o.querySelector(`[name="${e}"]`);
                                if (s)
                                    return s
                            }
                            i = r.nextNode()
                        }
                    }
                    return null
                }(this.document, e);
                n && (this.scrollToElement(n),
                n.focus())
            }
            setHistoryScrollRestoration(e) {
                if (this.supportScrollRestoration()) {
                    const n = this.window.history;
                    n && n.scrollRestoration && (n.scrollRestoration = e)
                }
            }
            scrollToElement(e) {
                const n = e.getBoundingClientRect()
                  , r = n.left + this.window.pageXOffset
                  , i = n.top + this.window.pageYOffset
                  , o = this.offset();
                this.window.scrollTo(r - o[0], i - o[1])
            }
            supportScrollRestoration() {
                try {
                    if (!this.supportsScrolling())
                        return !1;
                    const e = rE(this.window.history) || rE(Object.getPrototypeOf(this.window.history));
                    return !(!e || !e.writable && !e.set)
                } catch {
                    return !1
                }
            }
            supportsScrolling() {
                try {
                    return !!this.window && !!this.window.scrollTo && "pageXOffset"in this.window
                } catch {
                    return !1
                }
            }
        }
        function rE(t) {
            return Object.getOwnPropertyDescriptor(t, "scrollRestoration")
        }
        class TL extends SN {
            constructor() {
                super(...arguments),
                this.supportsDOMEvents = !0
            }
        }
        class _g extends TL {
            static makeCurrent() {
                !function bN(t) {
                    Xp || (Xp = t)
                }(new _g)
            }
            onAndCancel(e, n, r) {
                return e.addEventListener(n, r, !1),
                ()=>{
                    e.removeEventListener(n, r, !1)
                }
            }
            dispatchEvent(e, n) {
                e.dispatchEvent(n)
            }
            remove(e) {
                e.parentNode && e.parentNode.removeChild(e)
            }
            createElement(e, n) {
                return (n = n || this.getDefaultDocument()).createElement(e)
            }
            createHtmlDocument() {
                return document.implementation.createHTMLDocument("fakeTitle")
            }
            getDefaultDocument() {
                return document
            }
            isElementNode(e) {
                return e.nodeType === Node.ELEMENT_NODE
            }
            isShadowRoot(e) {
                return e instanceof DocumentFragment
            }
            getGlobalEventTarget(e, n) {
                return "window" === n ? window : "document" === n ? e : "body" === n ? e.body : null
            }
            getBaseHref(e) {
                const n = function IL() {
                    return Su = Su || document.querySelector("base"),
                    Su ? Su.getAttribute("href") : null
                }();
                return null == n ? null : function ML(t) {
                    Jc = Jc || document.createElement("a"),
                    Jc.setAttribute("href", t);
                    const e = Jc.pathname;
                    return "/" === e.charAt(0) ? e : `/${e}`
                }(n)
            }
            resetBaseElement() {
                Su = null
            }
            getUserAgent() {
                return window.navigator.userAgent
            }
            getCookie(e) {
                return function gk(t, e) {
                    e = encodeURIComponent(e);
                    for (const n of t.split(";")) {
                        const r = n.indexOf("=")
                          , [i,o] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
                        if (i.trim() === e)
                            return decodeURIComponent(o)
                    }
                    return null
                }(document.cookie, e)
            }
        }
        let Jc, Su = null;
        const uE = new K("TRANSITION_ID")
          , AL = [{
            provide: Oc,
            useFactory: function xL(t, e, n) {
                return ()=>{
                    n.get(Nc).donePromise.then(()=>{
                        const r = No()
                          , i = e.querySelectorAll(`style[ng-transition="${t}"]`);
                        for (let o = 0; o < i.length; o++)
                            r.remove(i[o])
                    }
                    )
                }
            },
            deps: [uE, En, vi],
            multi: !0
        }];
        let RL = (()=>{
            class t {
                build() {
                    return new XMLHttpRequest
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac
            }),
            t
        }
        )();
        const ed = new K("EventManagerPlugins");
        let td = (()=>{
            class t {
                constructor(n, r) {
                    this._zone = r,
                    this._eventNameToPlugin = new Map,
                    n.forEach(i=>{
                        i.manager = this
                    }
                    ),
                    this._plugins = n.slice().reverse()
                }
                addEventListener(n, r, i) {
                    return this._findPluginFor(r).addEventListener(n, r, i)
                }
                addGlobalEventListener(n, r, i) {
                    return this._findPluginFor(r).addGlobalEventListener(n, r, i)
                }
                getZone() {
                    return this._zone
                }
                _findPluginFor(n) {
                    const r = this._eventNameToPlugin.get(n);
                    if (r)
                        return r;
                    const i = this._plugins;
                    for (let o = 0; o < i.length; o++) {
                        const s = i[o];
                        if (s.supports(n))
                            return this._eventNameToPlugin.set(n, s),
                            s
                    }
                    throw new Error(`No event manager plugin found for event ${n}`)
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)(W(ed),W(st))
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac
            }),
            t
        }
        )();
        class lE {
            constructor(e) {
                this._doc = e
            }
            addGlobalEventListener(e, n, r) {
                const i = No().getGlobalEventTarget(this._doc, e);
                if (!i)
                    throw new Error(`Unsupported event target ${i} for event ${n}`);
                return this.addEventListener(i, n, r)
            }
        }
        let cE = (()=>{
            class t {
                constructor() {
                    this.usageCount = new Map
                }
                addStyles(n) {
                    for (const r of n)
                        1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r)
                }
                removeStyles(n) {
                    for (const r of n)
                        0 === this.changeUsageCount(r, -1) && this.onStyleRemoved(r)
                }
                onStyleRemoved(n) {}
                onStyleAdded(n) {}
                getAllStyles() {
                    return this.usageCount.keys()
                }
                changeUsageCount(n, r) {
                    const i = this.usageCount;
                    let o = i.get(n) ?? 0;
                    return o += r,
                    o > 0 ? i.set(n, o) : i.delete(n),
                    o
                }
                ngOnDestroy() {
                    for (const n of this.getAllStyles())
                        this.onStyleRemoved(n);
                    this.usageCount.clear()
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac
            }),
            t
        }
        )()
          , Tu = (()=>{
            class t extends cE {
                constructor(n) {
                    super(),
                    this.doc = n,
                    this.styleRef = new Map,
                    this.hostNodes = new Set,
                    this.resetHostNodes()
                }
                onStyleAdded(n) {
                    for (const r of this.hostNodes)
                        this.addStyleToHost(r, n)
                }
                onStyleRemoved(n) {
                    const r = this.styleRef;
                    r.get(n)?.forEach(o=>o.remove()),
                    r.delete(n)
                }
                ngOnDestroy() {
                    super.ngOnDestroy(),
                    this.styleRef.clear(),
                    this.resetHostNodes()
                }
                addHost(n) {
                    this.hostNodes.add(n);
                    for (const r of this.getAllStyles())
                        this.addStyleToHost(n, r)
                }
                removeHost(n) {
                    this.hostNodes.delete(n)
                }
                addStyleToHost(n, r) {
                    const i = this.doc.createElement("style");
                    i.textContent = r,
                    n.appendChild(i);
                    const o = this.styleRef.get(r);
                    o ? o.push(i) : this.styleRef.set(r, [i])
                }
                resetHostNodes() {
                    const n = this.hostNodes;
                    n.clear(),
                    n.add(this.doc.head)
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)(W(En))
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac
            }),
            t
        }
        )();
        const yg = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: "http://www.w3.org/1999/xhtml",
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/",
            math: "http://www.w3.org/1998/MathML/"
        }
          , vg = /%COMP%/g
          , hE = new K("RemoveStylesOnCompDestory",{
            providedIn: "root",
            factory: ()=>!1
        });
        function pE(t, e) {
            return e.flat(100).map(n=>n.replace(vg, t))
        }
        function gE(t) {
            return e=>{
                if ("__ngUnwrap__" === e)
                    return t;
                !1 === t(e) && (e.preventDefault(),
                e.returnValue = !1)
            }
        }
        let Cg = (()=>{
            class t {
                constructor(n, r, i, o) {
                    this.eventManager = n,
                    this.sharedStylesHost = r,
                    this.appId = i,
                    this.removeStylesOnCompDestory = o,
                    this.rendererByCompId = new Map,
                    this.defaultRenderer = new wg(n)
                }
                createRenderer(n, r) {
                    if (!n || !r)
                        return this.defaultRenderer;
                    const i = this.getOrCreateRenderer(n, r);
                    return i instanceof _E ? i.applyToHost(n) : i instanceof Eg && i.applyStyles(),
                    i
                }
                getOrCreateRenderer(n, r) {
                    const i = this.rendererByCompId;
                    let o = i.get(r.id);
                    if (!o) {
                        const s = this.eventManager
                          , a = this.sharedStylesHost
                          , u = this.removeStylesOnCompDestory;
                        switch (r.encapsulation) {
                        case Br.Emulated:
                            o = new _E(s,a,r,this.appId,u);
                            break;
                        case Br.ShadowDom:
                            return new jL(s,a,n,r);
                        default:
                            o = new Eg(s,a,r,u)
                        }
                        o.onDestroy = ()=>i.delete(r.id),
                        i.set(r.id, o)
                    }
                    return o
                }
                ngOnDestroy() {
                    this.rendererByCompId.clear()
                }
                begin() {}
                end() {}
            }
            return t.\u0275fac = function(n) {
                return new (n || t)(W(td),W(Tu),W(vu),W(hE))
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac
            }),
            t
        }
        )();
        class wg {
            constructor(e) {
                this.eventManager = e,
                this.data = Object.create(null),
                this.destroyNode = null
            }
            destroy() {}
            createElement(e, n) {
                return n ? document.createElementNS(yg[n] || n, e) : document.createElement(e)
            }
            createComment(e) {
                return document.createComment(e)
            }
            createText(e) {
                return document.createTextNode(e)
            }
            appendChild(e, n) {
                (DE(e) ? e.content : e).appendChild(n)
            }
            insertBefore(e, n, r) {
                e && (DE(e) ? e.content : e).insertBefore(n, r)
            }
            removeChild(e, n) {
                e && e.removeChild(n)
            }
            selectRootElement(e, n) {
                let r = "string" == typeof e ? document.querySelector(e) : e;
                if (!r)
                    throw new Error(`The selector "${e}" did not match any elements`);
                return n || (r.textContent = ""),
                r
            }
            parentNode(e) {
                return e.parentNode
            }
            nextSibling(e) {
                return e.nextSibling
            }
            setAttribute(e, n, r, i) {
                if (i) {
                    n = i + ":" + n;
                    const o = yg[i];
                    o ? e.setAttributeNS(o, n, r) : e.setAttribute(n, r)
                } else
                    e.setAttribute(n, r)
            }
            removeAttribute(e, n, r) {
                if (r) {
                    const i = yg[r];
                    i ? e.removeAttributeNS(i, n) : e.removeAttribute(`${r}:${n}`)
                } else
                    e.removeAttribute(n)
            }
            addClass(e, n) {
                e.classList.add(n)
            }
            removeClass(e, n) {
                e.classList.remove(n)
            }
            setStyle(e, n, r, i) {
                i & (Cn.DashCase | Cn.Important) ? e.style.setProperty(n, r, i & Cn.Important ? "important" : "") : e.style[n] = r
            }
            removeStyle(e, n, r) {
                r & Cn.DashCase ? e.style.removeProperty(n) : e.style[n] = ""
            }
            setProperty(e, n, r) {
                e[n] = r
            }
            setValue(e, n) {
                e.nodeValue = n
            }
            listen(e, n, r) {
                return "string" == typeof e ? this.eventManager.addGlobalEventListener(e, n, gE(r)) : this.eventManager.addEventListener(e, n, gE(r))
            }
        }
        function DE(t) {
            return "TEMPLATE" === t.tagName && void 0 !== t.content
        }
        class jL extends wg {
            constructor(e, n, r, i) {
                super(e),
                this.sharedStylesHost = n,
                this.hostEl = r,
                this.shadowRoot = r.attachShadow({
                    mode: "open"
                }),
                this.sharedStylesHost.addHost(this.shadowRoot);
                const o = pE(i.id, i.styles);
                for (const s of o) {
                    const a = document.createElement("style");
                    a.textContent = s,
                    this.shadowRoot.appendChild(a)
                }
            }
            nodeOrShadowRoot(e) {
                return e === this.hostEl ? this.shadowRoot : e
            }
            appendChild(e, n) {
                return super.appendChild(this.nodeOrShadowRoot(e), n)
            }
            insertBefore(e, n, r) {
                return super.insertBefore(this.nodeOrShadowRoot(e), n, r)
            }
            removeChild(e, n) {
                return super.removeChild(this.nodeOrShadowRoot(e), n)
            }
            parentNode(e) {
                return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))
            }
            destroy() {
                this.sharedStylesHost.removeHost(this.shadowRoot)
            }
        }
        class Eg extends wg {
            constructor(e, n, r, i, o=r.id) {
                super(e),
                this.sharedStylesHost = n,
                this.removeStylesOnCompDestory = i,
                this.rendererUsageCount = 0,
                this.styles = pE(o, r.styles)
            }
            applyStyles() {
                this.sharedStylesHost.addStyles(this.styles),
                this.rendererUsageCount++
            }
            destroy() {
                this.removeStylesOnCompDestory && (this.sharedStylesHost.removeStyles(this.styles),
                this.rendererUsageCount--,
                0 === this.rendererUsageCount && this.onDestroy?.())
            }
        }
        class _E extends Eg {
            constructor(e, n, r, i, o) {
                const s = i + "-" + r.id;
                super(e, n, r, o, s),
                this.contentAttr = function kL(t) {
                    return "_ngcontent-%COMP%".replace(vg, t)
                }(s),
                this.hostAttr = function LL(t) {
                    return "_nghost-%COMP%".replace(vg, t)
                }(s)
            }
            applyToHost(e) {
                this.applyStyles(),
                this.setAttribute(e, this.hostAttr, "")
            }
            createElement(e, n) {
                const r = super.createElement(e, n);
                return super.setAttribute(r, this.contentAttr, ""),
                r
            }
        }
        let VL = (()=>{
            class t extends lE {
                constructor(n) {
                    super(n)
                }
                supports(n) {
                    return !0
                }
                addEventListener(n, r, i) {
                    return n.addEventListener(r, i, !1),
                    ()=>this.removeEventListener(n, r, i)
                }
                removeEventListener(n, r, i) {
                    return n.removeEventListener(r, i)
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)(W(En))
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac
            }),
            t
        }
        )();
        const yE = ["alt", "control", "meta", "shift"]
          , $L = {
            "\b": "Backspace",
            "\t": "Tab",
            "\x7f": "Delete",
            "\x1b": "Escape",
            Del: "Delete",
            Esc: "Escape",
            Left: "ArrowLeft",
            Right: "ArrowRight",
            Up: "ArrowUp",
            Down: "ArrowDown",
            Menu: "ContextMenu",
            Scroll: "ScrollLock",
            Win: "OS"
        }
          , UL = {
            alt: t=>t.altKey,
            control: t=>t.ctrlKey,
            meta: t=>t.metaKey,
            shift: t=>t.shiftKey
        };
        let HL = (()=>{
            class t extends lE {
                constructor(n) {
                    super(n)
                }
                supports(n) {
                    return null != t.parseEventName(n)
                }
                addEventListener(n, r, i) {
                    const o = t.parseEventName(r)
                      , s = t.eventCallback(o.fullKey, i, this.manager.getZone());
                    return this.manager.getZone().runOutsideAngular(()=>No().onAndCancel(n, o.domEventName, s))
                }
                static parseEventName(n) {
                    const r = n.toLowerCase().split(".")
                      , i = r.shift();
                    if (0 === r.length || "keydown" !== i && "keyup" !== i)
                        return null;
                    const o = t._normalizeKey(r.pop());
                    let s = ""
                      , a = r.indexOf("code");
                    if (a > -1 && (r.splice(a, 1),
                    s = "code."),
                    yE.forEach(l=>{
                        const c = r.indexOf(l);
                        c > -1 && (r.splice(c, 1),
                        s += l + ".")
                    }
                    ),
                    s += o,
                    0 != r.length || 0 === o.length)
                        return null;
                    const u = {};
                    return u.domEventName = i,
                    u.fullKey = s,
                    u
                }
                static matchEventFullKeyCode(n, r) {
                    let i = $L[n.key] || n.key
                      , o = "";
                    return r.indexOf("code.") > -1 && (i = n.code,
                    o = "code."),
                    !(null == i || !i) && (i = i.toLowerCase(),
                    " " === i ? i = "space" : "." === i && (i = "dot"),
                    yE.forEach(s=>{
                        s !== i && (0,
                        UL[s])(n) && (o += s + ".")
                    }
                    ),
                    o += i,
                    o === r)
                }
                static eventCallback(n, r, i) {
                    return o=>{
                        t.matchEventFullKeyCode(o, n) && i.runGuarded(()=>r(o))
                    }
                }
                static _normalizeKey(n) {
                    return "esc" === n ? "escape" : n
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)(W(En))
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac
            }),
            t
        }
        )();
        const CE = [{
            provide: sw,
            useValue: "browser"
        }, {
            provide: ow,
            useValue: function zL() {
                _g.makeCurrent()
            },
            multi: !0
        }, {
            provide: En,
            useFactory: function WL() {
                return function fx(t) {
                    Sh = t
                }(document),
                document
            },
            deps: []
        }]
          , qL = Dw(CN, "browser", CE)
          , wE = new K("")
          , EE = [{
            provide: kc,
            useClass: class FL {
                addToWindow(e) {
                    $e.getAngularTestability = (r,i=!0)=>{
                        const o = e.findTestabilityInTree(r, i);
                        if (null == o)
                            throw new Error("Could not find testability for element.");
                        return o
                    }
                    ,
                    $e.getAllAngularTestabilities = ()=>e.getAllTestabilities(),
                    $e.getAllAngularRootElements = ()=>e.getAllRootElements(),
                    $e.frameworkStabilizers || ($e.frameworkStabilizers = []),
                    $e.frameworkStabilizers.push(r=>{
                        const i = $e.getAllAngularTestabilities();
                        let o = i.length
                          , s = !1;
                        const a = function(u) {
                            s = s || u,
                            o--,
                            0 == o && r(s)
                        };
                        i.forEach(function(u) {
                            u.whenStable(a)
                        })
                    }
                    )
                }
                findTestabilityInTree(e, n, r) {
                    return null == n ? null : e.getTestability(n) ?? (r ? No().isShadowRoot(n) ? this.findTestabilityInTree(e, n.host, !0) : this.findTestabilityInTree(e, n.parentElement, !0) : null)
                }
            }
            ,
            deps: []
        }, {
            provide: fw,
            useClass: $p,
            deps: [st, Up, kc]
        }, {
            provide: $p,
            useClass: $p,
            deps: [st, Up, kc]
        }]
          , bE = [{
            provide: Oh,
            useValue: "root"
        }, {
            provide: xs,
            useFactory: function GL() {
                return new xs
            },
            deps: []
        }, {
            provide: ed,
            useClass: VL,
            multi: !0,
            deps: [En, st, sw]
        }, {
            provide: ed,
            useClass: HL,
            multi: !0,
            deps: [En]
        }, {
            provide: Cg,
            useClass: Cg,
            deps: [td, Tu, vu, hE]
        }, {
            provide: Yy,
            useExisting: Cg
        }, {
            provide: cE,
            useExisting: Tu
        }, {
            provide: Tu,
            useClass: Tu,
            deps: [En]
        }, {
            provide: td,
            useClass: td,
            deps: [ed, st]
        }, {
            provide: class Jk {
            }
            ,
            useClass: RL,
            deps: []
        }, []];
        let YL = (()=>{
            class t {
                constructor(n) {}
                static withServerTransition(n) {
                    return {
                        ngModule: t,
                        providers: [{
                            provide: vu,
                            useValue: n.appId
                        }, {
                            provide: uE,
                            useExisting: vu
                        }, AL]
                    }
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)(W(wE, 12))
            }
            ,
            t.\u0275mod = $i({
                type: t
            }),
            t.\u0275inj = ci({
                providers: [...bE, ...EE],
                imports: [tE, wN]
            }),
            t
        }
        )()
          , SE = (()=>{
            class t {
                constructor(n) {
                    this._doc = n
                }
                getTitle() {
                    return this._doc.title
                }
                setTitle(n) {
                    this._doc.title = n || ""
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)(W(En))
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: function(n) {
                    let r = null;
                    return r = n ? new n : function QL() {
                        return new SE(W(En))
                    }(),
                    r
                },
                providedIn: "root"
            }),
            t
        }
        )();
        function U(...t) {
            return vt(t, Na(t))
        }
        typeof window < "u" && window;
        class Tr extends ui {
            constructor(e) {
                super(),
                this._value = e
            }
            get value() {
                return this.getValue()
            }
            _subscribe(e) {
                const n = super._subscribe(e);
                return !n.closed && e.next(this._value),
                n
            }
            getValue() {
                const {hasError: e, thrownError: n, _value: r} = this;
                if (e)
                    throw n;
                return this._throwIfClosed(),
                r
            }
            next(e) {
                super.next(this._value = e)
            }
        }
        const nd = Ra(t=>function() {
            t(this),
            this.name = "EmptyError",
            this.message = "no elements in sequence"
        }
        )
          , {isArray: n2} = Array
          , {getPrototypeOf: r2, prototype: i2, keys: o2} = Object;
        const {isArray: u2} = Array;
        function ME(...t) {
            const e = Na(t)
              , n = function UT(t) {
                return Le(wf(t)) ? t.pop() : void 0
            }(t)
              , {args: r, keys: i} = function s2(t) {
                if (1 === t.length) {
                    const e = t[0];
                    if (n2(e))
                        return {
                            args: e,
                            keys: null
                        };
                    if (function a2(t) {
                        return t && "object" == typeof t && r2(t) === i2
                    }(e)) {
                        const n = o2(e);
                        return {
                            args: n.map(r=>e[r]),
                            keys: n
                        }
                    }
                }
                return {
                    args: t,
                    keys: null
                }
            }(t);
            if (0 === r.length)
                return vt([], e);
            const o = new yt(function f2(t, e, n=wo) {
                return r=>{
                    xE(e, ()=>{
                        const {length: i} = t
                          , o = new Array(i);
                        let s = i
                          , a = i;
                        for (let u = 0; u < i; u++)
                            xE(e, ()=>{
                                const l = vt(t[u], e);
                                let c = !1;
                                l.subscribe(xt(r, d=>{
                                    o[u] = d,
                                    c || (c = !0,
                                    a--),
                                    a || r.next(n(o.slice()))
                                }
                                , ()=>{
                                    --s || r.complete()
                                }
                                ))
                            }
                            , r)
                    }
                    , r)
                }
            }(r, e, i ? s=>function d2(t, e) {
                return t.reduce((n,r,i)=>(n[r] = e[i],
                n), {})
            }(i, s) : wo));
            return n ? o.pipe(function c2(t) {
                return me(e=>function l2(t, e) {
                    return u2(e) ? t(...e) : t(e)
                }(t, e))
            }(n)) : o
        }
        function xE(t, e, n) {
            t ? li(n, t, e) : e()
        }
        function Tg(...t) {
            return function h2() {
                return us(1)
            }()(vt(t, Na(t)))
        }
        function AE(t) {
            return new yt(e=>{
                gr(t()).subscribe(e)
            }
            )
        }
        function Iu(t, e) {
            const n = Le(t) ? t : ()=>t
              , r = i=>i.error(n());
            return new yt(e ? i=>e.schedule(r, 0, i) : r)
        }
        function Ig() {
            return Mt((t,e)=>{
                let n = null;
                t._refCount++;
                const r = xt(e, void 0, void 0, void 0, ()=>{
                    if (!t || t._refCount <= 0 || 0 < --t._refCount)
                        return void (n = null);
                    const i = t._connection
                      , o = n;
                    n = null,
                    i && (!o || i === o) && i.unsubscribe(),
                    e.unsubscribe()
                }
                );
                t.subscribe(r),
                r.closed || (n = t.connect())
            }
            )
        }
        class FE extends yt {
            constructor(e, n) {
                super(),
                this.source = e,
                this.subjectFactory = n,
                this._subject = null,
                this._refCount = 0,
                this._connection = null,
                bD(e) && (this.lift = e.lift)
            }
            _subscribe(e) {
                return this.getSubject().subscribe(e)
            }
            getSubject() {
                const e = this._subject;
                return (!e || e.isStopped) && (this._subject = this.subjectFactory()),
                this._subject
            }
            _teardown() {
                this._refCount = 0;
                const {_connection: e} = this;
                this._subject = this._connection = null,
                e?.unsubscribe()
            }
            connect() {
                let e = this._connection;
                if (!e) {
                    e = this._connection = new Kn;
                    const n = this.getSubject();
                    e.add(this.source.subscribe(xt(n, void 0, ()=>{
                        this._teardown(),
                        n.complete()
                    }
                    , r=>{
                        this._teardown(),
                        n.error(r)
                    }
                    , ()=>this._teardown()))),
                    e.closed && (this._connection = null,
                    e = Kn.EMPTY)
                }
                return e
            }
            refCount() {
                return Ig()(this)
            }
        }
        function qr(t, e) {
            return Mt((n,r)=>{
                let i = null
                  , o = 0
                  , s = !1;
                const a = ()=>s && !i && r.complete();
                n.subscribe(xt(r, u=>{
                    i?.unsubscribe();
                    let l = 0;
                    const c = o++;
                    gr(t(u, c)).subscribe(i = xt(r, d=>r.next(e ? e(u, d, c, l++) : d), ()=>{
                        i = null,
                        a()
                    }
                    ))
                }
                , ()=>{
                    s = !0,
                    a()
                }
                ))
            }
            )
        }
        function Ys(t) {
            return t <= 0 ? ()=>kr : Mt((e,n)=>{
                let r = 0;
                e.subscribe(xt(n, i=>{
                    ++r <= t && (n.next(i),
                    t <= r && n.complete())
                }
                ))
            }
            )
        }
        function Yi(t, e) {
            return Mt((n,r)=>{
                let i = 0;
                n.subscribe(xt(r, o=>t.call(e, o, i++) && r.next(o)))
            }
            )
        }
        function rd(t) {
            return Mt((e,n)=>{
                let r = !1;
                e.subscribe(xt(n, i=>{
                    r = !0,
                    n.next(i)
                }
                , ()=>{
                    r || n.next(t),
                    n.complete()
                }
                ))
            }
            )
        }
        function RE(t=g2) {
            return Mt((e,n)=>{
                let r = !1;
                e.subscribe(xt(n, i=>{
                    r = !0,
                    n.next(i)
                }
                , ()=>r ? n.complete() : n.error(t())))
            }
            )
        }
        function g2() {
            return new nd
        }
        function Zi(t, e) {
            const n = arguments.length >= 2;
            return r=>r.pipe(t ? Yi((i,o)=>t(i, o, r)) : wo, Ys(1), n ? rd(e) : RE(()=>new nd))
        }
        function Lo(t, e) {
            return Le(e) ? Ot(t, e, 1) : Ot(t, 1)
        }
        function qt(t, e, n) {
            const r = Le(t) || e || n ? {
                next: t,
                error: e,
                complete: n
            } : t;
            return r ? Mt((i,o)=>{
                var s;
                null === (s = r.subscribe) || void 0 === s || s.call(r);
                let a = !0;
                i.subscribe(xt(o, u=>{
                    var l;
                    null === (l = r.next) || void 0 === l || l.call(r, u),
                    o.next(u)
                }
                , ()=>{
                    var u;
                    a = !1,
                    null === (u = r.complete) || void 0 === u || u.call(r),
                    o.complete()
                }
                , u=>{
                    var l;
                    a = !1,
                    null === (l = r.error) || void 0 === l || l.call(r, u),
                    o.error(u)
                }
                , ()=>{
                    var u, l;
                    a && (null === (u = r.unsubscribe) || void 0 === u || u.call(r)),
                    null === (l = r.finalize) || void 0 === l || l.call(r)
                }
                ))
            }
            ) : wo
        }
        function Qi(t) {
            return Mt((e,n)=>{
                let o, r = null, i = !1;
                r = e.subscribe(xt(n, void 0, void 0, s=>{
                    o = gr(t(s, Qi(t)(e))),
                    r ? (r.unsubscribe(),
                    r = null,
                    o.subscribe(n)) : i = !0
                }
                )),
                i && (r.unsubscribe(),
                r = null,
                o.subscribe(n))
            }
            )
        }
        function PE(t, e) {
            return Mt(function m2(t, e, n, r, i) {
                return (o,s)=>{
                    let a = n
                      , u = e
                      , l = 0;
                    o.subscribe(xt(s, c=>{
                        const d = l++;
                        u = a ? t(u, c, d) : (a = !0,
                        c),
                        r && s.next(u)
                    }
                    , i && (()=>{
                        a && s.next(u),
                        s.complete()
                    }
                    )))
                }
            }(t, e, arguments.length >= 2, !0))
        }
        function Mg(t) {
            return t <= 0 ? ()=>kr : Mt((e,n)=>{
                let r = [];
                e.subscribe(xt(n, i=>{
                    r.push(i),
                    t < r.length && r.shift()
                }
                , ()=>{
                    for (const i of r)
                        n.next(i);
                    n.complete()
                }
                , void 0, ()=>{
                    r = null
                }
                ))
            }
            )
        }
        function OE(t, e) {
            const n = arguments.length >= 2;
            return r=>r.pipe(t ? Yi((i,o)=>t(i, o, r)) : wo, Mg(1), n ? rd(e) : RE(()=>new nd))
        }
        function xg(t) {
            return Mt((e,n)=>{
                try {
                    e.subscribe(n)
                } finally {
                    n.add(t)
                }
            }
            )
        }
        const re = "primary"
          , Mu = Symbol("RouteTitle");
        class y2 {
            constructor(e) {
                this.params = e || {}
            }
            has(e) {
                return Object.prototype.hasOwnProperty.call(this.params, e)
            }
            get(e) {
                if (this.has(e)) {
                    const n = this.params[e];
                    return Array.isArray(n) ? n[0] : n
                }
                return null
            }
            getAll(e) {
                if (this.has(e)) {
                    const n = this.params[e];
                    return Array.isArray(n) ? n : [n]
                }
                return []
            }
            get keys() {
                return Object.keys(this.params)
            }
        }
        function Zs(t) {
            return new y2(t)
        }
        function v2(t, e, n) {
            const r = n.path.split("/");
            if (r.length > t.length || "full" === n.pathMatch && (e.hasChildren() || r.length < t.length))
                return null;
            const i = {};
            for (let o = 0; o < r.length; o++) {
                const s = r[o]
                  , a = t[o];
                if (s.startsWith(":"))
                    i[s.substring(1)] = a;
                else if (s !== a.path)
                    return null
            }
            return {
                consumed: t.slice(0, r.length),
                posParams: i
            }
        }
        function Yr(t, e) {
            const n = t ? Object.keys(t) : void 0
              , r = e ? Object.keys(e) : void 0;
            if (!n || !r || n.length != r.length)
                return !1;
            let i;
            for (let o = 0; o < n.length; o++)
                if (i = n[o],
                !NE(t[i], e[i]))
                    return !1;
            return !0
        }
        function NE(t, e) {
            if (Array.isArray(t) && Array.isArray(e)) {
                if (t.length !== e.length)
                    return !1;
                const n = [...t].sort()
                  , r = [...e].sort();
                return n.every((i,o)=>r[o] === i)
            }
            return t === e
        }
        function kE(t) {
            return Array.prototype.concat.apply([], t)
        }
        function LE(t) {
            return t.length > 0 ? t[t.length - 1] : null
        }
        function Lt(t, e) {
            for (const n in t)
                t.hasOwnProperty(n) && e(t[n], n)
        }
        function Ki(t) {
            return Wv(t) ? t : Ec(t) ? vt(Promise.resolve(t)) : U(t)
        }
        const id = !1
          , w2 = {
            exact: function VE(t, e, n) {
                if (!Bo(t.segments, e.segments) || !od(t.segments, e.segments, n) || t.numberOfChildren !== e.numberOfChildren)
                    return !1;
                for (const r in e.children)
                    if (!t.children[r] || !VE(t.children[r], e.children[r], n))
                        return !1;
                return !0
            },
            subset: $E
        }
          , BE = {
            exact: function E2(t, e) {
                return Yr(t, e)
            },
            subset: function b2(t, e) {
                return Object.keys(e).length <= Object.keys(t).length && Object.keys(e).every(n=>NE(t[n], e[n]))
            },
            ignored: ()=>!0
        };
        function jE(t, e, n) {
            return w2[n.paths](t.root, e.root, n.matrixParams) && BE[n.queryParams](t.queryParams, e.queryParams) && !("exact" === n.fragment && t.fragment !== e.fragment)
        }
        function $E(t, e, n) {
            return UE(t, e, e.segments, n)
        }
        function UE(t, e, n, r) {
            if (t.segments.length > n.length) {
                const i = t.segments.slice(0, n.length);
                return !(!Bo(i, n) || e.hasChildren() || !od(i, n, r))
            }
            if (t.segments.length === n.length) {
                if (!Bo(t.segments, n) || !od(t.segments, n, r))
                    return !1;
                for (const i in e.children)
                    if (!t.children[i] || !$E(t.children[i], e.children[i], r))
                        return !1;
                return !0
            }
            {
                const i = n.slice(0, t.segments.length)
                  , o = n.slice(t.segments.length);
                return !!(Bo(t.segments, i) && od(t.segments, i, r) && t.children[re]) && UE(t.children[re], e, o, r)
            }
        }
        function od(t, e, n) {
            return e.every((r,i)=>BE[n](t[i].parameters, r.parameters))
        }
        class Xi {
            constructor(e=new le([],{}), n={}, r=null) {
                this.root = e,
                this.queryParams = n,
                this.fragment = r
            }
            get queryParamMap() {
                return this._queryParamMap || (this._queryParamMap = Zs(this.queryParams)),
                this._queryParamMap
            }
            toString() {
                return I2.serialize(this)
            }
        }
        class le {
            constructor(e, n) {
                this.segments = e,
                this.children = n,
                this.parent = null,
                Lt(n, (r,i)=>r.parent = this)
            }
            hasChildren() {
                return this.numberOfChildren > 0
            }
            get numberOfChildren() {
                return Object.keys(this.children).length
            }
            toString() {
                return sd(this)
            }
        }
        class xu {
            constructor(e, n) {
                this.path = e,
                this.parameters = n
            }
            get parameterMap() {
                return this._parameterMap || (this._parameterMap = Zs(this.parameters)),
                this._parameterMap
            }
            toString() {
                return GE(this)
            }
        }
        function Bo(t, e) {
            return t.length === e.length && t.every((n,r)=>n.path === e[r].path)
        }
        let Au = (()=>{
            class t {
            }
            return t.\u0275fac = function(n) {
                return new (n || t)
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: function() {
                    return new Ag
                },
                providedIn: "root"
            }),
            t
        }
        )();
        class Ag {
            parse(e) {
                const n = new k2(e);
                return new Xi(n.parseRootSegment(),n.parseQueryParams(),n.parseFragment())
            }
            serialize(e) {
                const n = `/${Fu(e.root, !0)}`
                  , r = function A2(t) {
                    const e = Object.keys(t).map(n=>{
                        const r = t[n];
                        return Array.isArray(r) ? r.map(i=>`${ad(n)}=${ad(i)}`).join("&") : `${ad(n)}=${ad(r)}`
                    }
                    ).filter(n=>!!n);
                    return e.length ? `?${e.join("&")}` : ""
                }(e.queryParams);
                return `${n}${r}${"string" == typeof e.fragment ? `#${function M2(t) {
                    return encodeURI(t)
                }(e.fragment)}` : ""}`
            }
        }
        const I2 = new Ag;
        function sd(t) {
            return t.segments.map(e=>GE(e)).join("/")
        }
        function Fu(t, e) {
            if (!t.hasChildren())
                return sd(t);
            if (e) {
                const n = t.children[re] ? Fu(t.children[re], !1) : ""
                  , r = [];
                return Lt(t.children, (i,o)=>{
                    o !== re && r.push(`${o}:${Fu(i, !1)}`)
                }
                ),
                r.length > 0 ? `${n}(${r.join("//")})` : n
            }
            {
                const n = function T2(t, e) {
                    let n = [];
                    return Lt(t.children, (r,i)=>{
                        i === re && (n = n.concat(e(r, i)))
                    }
                    ),
                    Lt(t.children, (r,i)=>{
                        i !== re && (n = n.concat(e(r, i)))
                    }
                    ),
                    n
                }(t, (r,i)=>i === re ? [Fu(t.children[re], !1)] : [`${i}:${Fu(r, !1)}`]);
                return 1 === Object.keys(t.children).length && null != t.children[re] ? `${sd(t)}/${n[0]}` : `${sd(t)}/(${n.join("//")})`
            }
        }
        function HE(t) {
            return encodeURIComponent(t).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",")
        }
        function ad(t) {
            return HE(t).replace(/%3B/gi, ";")
        }
        function Fg(t) {
            return HE(t).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&")
        }
        function ud(t) {
            return decodeURIComponent(t)
        }
        function zE(t) {
            return ud(t.replace(/\+/g, "%20"))
        }
        function GE(t) {
            return `${Fg(t.path)}${function x2(t) {
                return Object.keys(t).map(e=>`;${Fg(e)}=${Fg(t[e])}`).join("")
            }(t.parameters)}`
        }
        const F2 = /^[^\/()?;=#]+/;
        function ld(t) {
            const e = t.match(F2);
            return e ? e[0] : ""
        }
        const R2 = /^[^=?&#]+/
          , O2 = /^[^&#]+/;
        class k2 {
            constructor(e) {
                this.url = e,
                this.remaining = e
            }
            parseRootSegment() {
                return this.consumeOptional("/"),
                "" === this.remaining || this.peekStartsWith("?") || this.peekStartsWith("#") ? new le([],{}) : new le([],this.parseChildren())
            }
            parseQueryParams() {
                const e = {};
                if (this.consumeOptional("?"))
                    do {
                        this.parseQueryParam(e)
                    } while (this.consumeOptional("&"));
                return e
            }
            parseFragment() {
                return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null
            }
            parseChildren() {
                if ("" === this.remaining)
                    return {};
                this.consumeOptional("/");
                const e = [];
                for (this.peekStartsWith("(") || e.push(this.parseSegment()); this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/("); )
                    this.capture("/"),
                    e.push(this.parseSegment());
                let n = {};
                this.peekStartsWith("/(") && (this.capture("/"),
                n = this.parseParens(!0));
                let r = {};
                return this.peekStartsWith("(") && (r = this.parseParens(!1)),
                (e.length > 0 || Object.keys(n).length > 0) && (r[re] = new le(e,n)),
                r
            }
            parseSegment() {
                const e = ld(this.remaining);
                if ("" === e && this.peekStartsWith(";"))
                    throw new P(4009,id);
                return this.capture(e),
                new xu(ud(e),this.parseMatrixParams())
            }
            parseMatrixParams() {
                const e = {};
                for (; this.consumeOptional(";"); )
                    this.parseParam(e);
                return e
            }
            parseParam(e) {
                const n = ld(this.remaining);
                if (!n)
                    return;
                this.capture(n);
                let r = "";
                if (this.consumeOptional("=")) {
                    const i = ld(this.remaining);
                    i && (r = i,
                    this.capture(r))
                }
                e[ud(n)] = ud(r)
            }
            parseQueryParam(e) {
                const n = function P2(t) {
                    const e = t.match(R2);
                    return e ? e[0] : ""
                }(this.remaining);
                if (!n)
                    return;
                this.capture(n);
                let r = "";
                if (this.consumeOptional("=")) {
                    const s = function N2(t) {
                        const e = t.match(O2);
                        return e ? e[0] : ""
                    }(this.remaining);
                    s && (r = s,
                    this.capture(r))
                }
                const i = zE(n)
                  , o = zE(r);
                if (e.hasOwnProperty(i)) {
                    let s = e[i];
                    Array.isArray(s) || (s = [s],
                    e[i] = s),
                    s.push(o)
                } else
                    e[i] = o
            }
            parseParens(e) {
                const n = {};
                for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0; ) {
                    const r = ld(this.remaining)
                      , i = this.remaining[r.length];
                    if ("/" !== i && ")" !== i && ";" !== i)
                        throw new P(4010,id);
                    let o;
                    r.indexOf(":") > -1 ? (o = r.slice(0, r.indexOf(":")),
                    this.capture(o),
                    this.capture(":")) : e && (o = re);
                    const s = this.parseChildren();
                    n[o] = 1 === Object.keys(s).length ? s[re] : new le([],s),
                    this.consumeOptional("//")
                }
                return n
            }
            peekStartsWith(e) {
                return this.remaining.startsWith(e)
            }
            consumeOptional(e) {
                return !!this.peekStartsWith(e) && (this.remaining = this.remaining.substring(e.length),
                !0)
            }
            capture(e) {
                if (!this.consumeOptional(e))
                    throw new P(4011,id)
            }
        }
        function Rg(t) {
            return t.segments.length > 0 ? new le([],{
                [re]: t
            }) : t
        }
        function cd(t) {
            const e = {};
            for (const r of Object.keys(t.children)) {
                const o = cd(t.children[r]);
                (o.segments.length > 0 || o.hasChildren()) && (e[r] = o)
            }
            return function L2(t) {
                if (1 === t.numberOfChildren && t.children[re]) {
                    const e = t.children[re];
                    return new le(t.segments.concat(e.segments),e.children)
                }
                return t
            }(new le(t.segments,e))
        }
        function jo(t) {
            return t instanceof Xi
        }
        const Pg = !1;
        function B2(t, e, n, r, i) {
            if (0 === n.length)
                return Qs(e.root, e.root, e.root, r, i);
            const o = function QE(t) {
                if ("string" == typeof t[0] && 1 === t.length && "/" === t[0])
                    return new ZE(!0,0,t);
                let e = 0
                  , n = !1;
                const r = t.reduce((i,o,s)=>{
                    if ("object" == typeof o && null != o) {
                        if (o.outlets) {
                            const a = {};
                            return Lt(o.outlets, (u,l)=>{
                                a[l] = "string" == typeof u ? u.split("/") : u
                            }
                            ),
                            [...i, {
                                outlets: a
                            }]
                        }
                        if (o.segmentPath)
                            return [...i, o.segmentPath]
                    }
                    return "string" != typeof o ? [...i, o] : 0 === s ? (o.split("/").forEach((a,u)=>{
                        0 == u && "." === a || (0 == u && "" === a ? n = !0 : ".." === a ? e++ : "" != a && i.push(a))
                    }
                    ),
                    i) : [...i, o]
                }
                , []);
                return new ZE(n,e,r)
            }(n);
            return o.toRoot() ? Qs(e.root, e.root, new le([],{}), r, i) : function s(u) {
                const l = function V2(t, e, n, r) {
                    if (t.isAbsolute)
                        return new Ks(e.root,!0,0);
                    if (-1 === r)
                        return new Ks(n,n === e.root,0);
                    return function KE(t, e, n) {
                        let r = t
                          , i = e
                          , o = n;
                        for (; o > i; ) {
                            if (o -= i,
                            r = r.parent,
                            !r)
                                throw new P(4005,Pg && "Invalid number of '../'");
                            i = r.segments.length
                        }
                        return new Ks(r,!1,i - o)
                    }(n, r + (Ru(t.commands[0]) ? 0 : 1), t.numberOfDoubleDots)
                }(o, e, t.snapshot?._urlSegment, u)
                  , c = l.processChildren ? Xs(l.segmentGroup, l.index, o.commands) : Og(l.segmentGroup, l.index, o.commands);
                return Qs(e.root, l.segmentGroup, c, r, i)
            }(t.snapshot?._lastPathIndex)
        }
        function Ru(t) {
            return "object" == typeof t && null != t && !t.outlets && !t.segmentPath
        }
        function Pu(t) {
            return "object" == typeof t && null != t && t.outlets
        }
        function Qs(t, e, n, r, i) {
            let s, o = {};
            r && Lt(r, (u,l)=>{
                o[l] = Array.isArray(u) ? u.map(c=>`${c}`) : `${u}`
            }
            ),
            s = t === e ? n : YE(t, e, n);
            const a = Rg(cd(s));
            return new Xi(a,o,i)
        }
        function YE(t, e, n) {
            const r = {};
            return Lt(t.children, (i,o)=>{
                r[o] = i === e ? n : YE(i, e, n)
            }
            ),
            new le(t.segments,r)
        }
        class ZE {
            constructor(e, n, r) {
                if (this.isAbsolute = e,
                this.numberOfDoubleDots = n,
                this.commands = r,
                e && r.length > 0 && Ru(r[0]))
                    throw new P(4003,Pg && "Root segment cannot have matrix parameters");
                const i = r.find(Pu);
                if (i && i !== LE(r))
                    throw new P(4004,Pg && "{outlets:{}} has to be the last command")
            }
            toRoot() {
                return this.isAbsolute && 1 === this.commands.length && "/" == this.commands[0]
            }
        }
        class Ks {
            constructor(e, n, r) {
                this.segmentGroup = e,
                this.processChildren = n,
                this.index = r
            }
        }
        function Og(t, e, n) {
            if (t || (t = new le([],{})),
            0 === t.segments.length && t.hasChildren())
                return Xs(t, e, n);
            const r = function U2(t, e, n) {
                let r = 0
                  , i = e;
                const o = {
                    match: !1,
                    pathIndex: 0,
                    commandIndex: 0
                };
                for (; i < t.segments.length; ) {
                    if (r >= n.length)
                        return o;
                    const s = t.segments[i]
                      , a = n[r];
                    if (Pu(a))
                        break;
                    const u = `${a}`
                      , l = r < n.length - 1 ? n[r + 1] : null;
                    if (i > 0 && void 0 === u)
                        break;
                    if (u && l && "object" == typeof l && void 0 === l.outlets) {
                        if (!JE(u, l, s))
                            return o;
                        r += 2
                    } else {
                        if (!JE(u, {}, s))
                            return o;
                        r++
                    }
                    i++
                }
                return {
                    match: !0,
                    pathIndex: i,
                    commandIndex: r
                }
            }(t, e, n)
              , i = n.slice(r.commandIndex);
            if (r.match && r.pathIndex < t.segments.length) {
                const o = new le(t.segments.slice(0, r.pathIndex),{});
                return o.children[re] = new le(t.segments.slice(r.pathIndex),t.children),
                Xs(o, 0, i)
            }
            return r.match && 0 === i.length ? new le(t.segments,{}) : r.match && !t.hasChildren() ? Ng(t, e, n) : r.match ? Xs(t, 0, i) : Ng(t, e, n)
        }
        function Xs(t, e, n) {
            if (0 === n.length)
                return new le(t.segments,{});
            {
                const r = function $2(t) {
                    return Pu(t[0]) ? t[0].outlets : {
                        [re]: t
                    }
                }(n)
                  , i = {};
                if (!r[re] && t.children[re] && 1 === t.numberOfChildren && 0 === t.children[re].segments.length) {
                    const o = Xs(t.children[re], e, n);
                    return new le(t.segments,o.children)
                }
                return Lt(r, (o,s)=>{
                    "string" == typeof o && (o = [o]),
                    null !== o && (i[s] = Og(t.children[s], e, o))
                }
                ),
                Lt(t.children, (o,s)=>{
                    void 0 === r[s] && (i[s] = o)
                }
                ),
                new le(t.segments,i)
            }
        }
        function Ng(t, e, n) {
            const r = t.segments.slice(0, e);
            let i = 0;
            for (; i < n.length; ) {
                const o = n[i];
                if (Pu(o)) {
                    const u = H2(o.outlets);
                    return new le(r,u)
                }
                if (0 === i && Ru(n[0])) {
                    r.push(new xu(t.segments[e].path,XE(n[0]))),
                    i++;
                    continue
                }
                const s = Pu(o) ? o.outlets[re] : `${o}`
                  , a = i < n.length - 1 ? n[i + 1] : null;
                s && a && Ru(a) ? (r.push(new xu(s,XE(a))),
                i += 2) : (r.push(new xu(s,{})),
                i++)
            }
            return new le(r,{})
        }
        function H2(t) {
            const e = {};
            return Lt(t, (n,r)=>{
                "string" == typeof n && (n = [n]),
                null !== n && (e[r] = Ng(new le([],{}), 0, n))
            }
            ),
            e
        }
        function XE(t) {
            const e = {};
            return Lt(t, (n,r)=>e[r] = `${n}`),
            e
        }
        function JE(t, e, n) {
            return t == n.path && Yr(e, n.parameters)
        }
        const Ou = "imperative";
        class Zr {
            constructor(e, n) {
                this.id = e,
                this.url = n
            }
        }
        class kg extends Zr {
            constructor(e, n, r="imperative", i=null) {
                super(e, n),
                this.type = 0,
                this.navigationTrigger = r,
                this.restoredState = i
            }
            toString() {
                return `NavigationStart(id: ${this.id}, url: '${this.url}')`
            }
        }
        class Vo extends Zr {
            constructor(e, n, r) {
                super(e, n),
                this.urlAfterRedirects = r,
                this.type = 1
            }
            toString() {
                return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
            }
        }
        class dd extends Zr {
            constructor(e, n, r, i) {
                super(e, n),
                this.reason = r,
                this.code = i,
                this.type = 2
            }
            toString() {
                return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
            }
        }
        class fd extends Zr {
            constructor(e, n, r, i) {
                super(e, n),
                this.reason = r,
                this.code = i,
                this.type = 16
            }
        }
        class Lg extends Zr {
            constructor(e, n, r, i) {
                super(e, n),
                this.error = r,
                this.target = i,
                this.type = 3
            }
            toString() {
                return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
            }
        }
        class z2 extends Zr {
            constructor(e, n, r, i) {
                super(e, n),
                this.urlAfterRedirects = r,
                this.state = i,
                this.type = 4
            }
            toString() {
                return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }
        class G2 extends Zr {
            constructor(e, n, r, i) {
                super(e, n),
                this.urlAfterRedirects = r,
                this.state = i,
                this.type = 7
            }
            toString() {
                return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }
        class W2 extends Zr {
            constructor(e, n, r, i, o) {
                super(e, n),
                this.urlAfterRedirects = r,
                this.state = i,
                this.shouldActivate = o,
                this.type = 8
            }
            toString() {
                return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
            }
        }
        class q2 extends Zr {
            constructor(e, n, r, i) {
                super(e, n),
                this.urlAfterRedirects = r,
                this.state = i,
                this.type = 5
            }
            toString() {
                return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }
        class Y2 extends Zr {
            constructor(e, n, r, i) {
                super(e, n),
                this.urlAfterRedirects = r,
                this.state = i,
                this.type = 6
            }
            toString() {
                return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }
        class Z2 {
            constructor(e) {
                this.route = e,
                this.type = 9
            }
            toString() {
                return `RouteConfigLoadStart(path: ${this.route.path})`
            }
        }
        class Q2 {
            constructor(e) {
                this.route = e,
                this.type = 10
            }
            toString() {
                return `RouteConfigLoadEnd(path: ${this.route.path})`
            }
        }
        class K2 {
            constructor(e) {
                this.snapshot = e,
                this.type = 11
            }
            toString() {
                return `ChildActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }
        class X2 {
            constructor(e) {
                this.snapshot = e,
                this.type = 12
            }
            toString() {
                return `ChildActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }
        class J2 {
            constructor(e) {
                this.snapshot = e,
                this.type = 13
            }
            toString() {
                return `ActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }
        class eB {
            constructor(e) {
                this.snapshot = e,
                this.type = 14
            }
            toString() {
                return `ActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }
        class eb {
            constructor(e, n, r) {
                this.routerEvent = e,
                this.position = n,
                this.anchor = r,
                this.type = 15
            }
            toString() {
                return `Scroll(anchor: '${this.anchor}', position: '${this.position ? `${this.position[0]}, ${this.position[1]}` : null}')`
            }
        }
        let rB = (()=>{
            class t {
                createUrlTree(n, r, i, o, s, a) {
                    return B2(n || r.root, i, o, s, a)
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac
            }),
            t
        }
        )()
          , oB = (()=>{
            class t {
            }
            return t.\u0275fac = function(n) {
                return new (n || t)
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: function(e) {
                    return rB.\u0275fac(e)
                },
                providedIn: "root"
            }),
            t
        }
        )();
        class tb {
            constructor(e) {
                this._root = e
            }
            get root() {
                return this._root.value
            }
            parent(e) {
                const n = this.pathFromRoot(e);
                return n.length > 1 ? n[n.length - 2] : null
            }
            children(e) {
                const n = Bg(e, this._root);
                return n ? n.children.map(r=>r.value) : []
            }
            firstChild(e) {
                const n = Bg(e, this._root);
                return n && n.children.length > 0 ? n.children[0].value : null
            }
            siblings(e) {
                const n = jg(e, this._root);
                return n.length < 2 ? [] : n[n.length - 2].children.map(i=>i.value).filter(i=>i !== e)
            }
            pathFromRoot(e) {
                return jg(e, this._root).map(n=>n.value)
            }
        }
        function Bg(t, e) {
            if (t === e.value)
                return e;
            for (const n of e.children) {
                const r = Bg(t, n);
                if (r)
                    return r
            }
            return null
        }
        function jg(t, e) {
            if (t === e.value)
                return [e];
            for (const n of e.children) {
                const r = jg(t, n);
                if (r.length)
                    return r.unshift(e),
                    r
            }
            return []
        }
        class Ii {
            constructor(e, n) {
                this.value = e,
                this.children = n
            }
            toString() {
                return `TreeNode(${this.value})`
            }
        }
        function Js(t) {
            const e = {};
            return t && t.children.forEach(n=>e[n.value.outlet] = n),
            e
        }
        class nb extends tb {
            constructor(e, n) {
                super(e),
                this.snapshot = n,
                Vg(this, e)
            }
            toString() {
                return this.snapshot.toString()
            }
        }
        function rb(t, e) {
            const n = function sB(t, e) {
                const s = new hd([],{},{},"",{},re,e,null,t.root,-1,{});
                return new ob("",new Ii(s,[]))
            }(t, e)
              , r = new Tr([new xu("",{})])
              , i = new Tr({})
              , o = new Tr({})
              , s = new Tr({})
              , a = new Tr("")
              , u = new ea(r,i,s,a,o,re,e,n.root);
            return u.snapshot = n.root,
            new nb(new Ii(u,[]),n)
        }
        class ea {
            constructor(e, n, r, i, o, s, a, u) {
                this.url = e,
                this.params = n,
                this.queryParams = r,
                this.fragment = i,
                this.data = o,
                this.outlet = s,
                this.component = a,
                this.title = this.data?.pipe(me(l=>l[Mu])) ?? U(void 0),
                this._futureSnapshot = u
            }
            get routeConfig() {
                return this._futureSnapshot.routeConfig
            }
            get root() {
                return this._routerState.root
            }
            get parent() {
                return this._routerState.parent(this)
            }
            get firstChild() {
                return this._routerState.firstChild(this)
            }
            get children() {
                return this._routerState.children(this)
            }
            get pathFromRoot() {
                return this._routerState.pathFromRoot(this)
            }
            get paramMap() {
                return this._paramMap || (this._paramMap = this.params.pipe(me(e=>Zs(e)))),
                this._paramMap
            }
            get queryParamMap() {
                return this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(me(e=>Zs(e)))),
                this._queryParamMap
            }
            toString() {
                return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`
            }
        }
        function ib(t, e="emptyOnly") {
            const n = t.pathFromRoot;
            let r = 0;
            if ("always" !== e)
                for (r = n.length - 1; r >= 1; ) {
                    const i = n[r]
                      , o = n[r - 1];
                    if (i.routeConfig && "" === i.routeConfig.path)
                        r--;
                    else {
                        if (o.component)
                            break;
                        r--
                    }
                }
            return function aB(t) {
                return t.reduce((e,n)=>({
                    params: {
                        ...e.params,
                        ...n.params
                    },
                    data: {
                        ...e.data,
                        ...n.data
                    },
                    resolve: {
                        ...n.data,
                        ...e.resolve,
                        ...n.routeConfig?.data,
                        ...n._resolvedData
                    }
                }), {
                    params: {},
                    data: {},
                    resolve: {}
                })
            }(n.slice(r))
        }
        class hd {
            get title() {
                return this.data?.[Mu]
            }
            constructor(e, n, r, i, o, s, a, u, l, c, d) {
                this.url = e,
                this.params = n,
                this.queryParams = r,
                this.fragment = i,
                this.data = o,
                this.outlet = s,
                this.component = a,
                this.routeConfig = u,
                this._urlSegment = l,
                this._lastPathIndex = c,
                this._resolve = d
            }
            get root() {
                return this._routerState.root
            }
            get parent() {
                return this._routerState.parent(this)
            }
            get firstChild() {
                return this._routerState.firstChild(this)
            }
            get children() {
                return this._routerState.children(this)
            }
            get pathFromRoot() {
                return this._routerState.pathFromRoot(this)
            }
            get paramMap() {
                return this._paramMap || (this._paramMap = Zs(this.params)),
                this._paramMap
            }
            get queryParamMap() {
                return this._queryParamMap || (this._queryParamMap = Zs(this.queryParams)),
                this._queryParamMap
            }
            toString() {
                return `Route(url:'${this.url.map(r=>r.toString()).join("/")}', path:'${this.routeConfig ? this.routeConfig.path : ""}')`
            }
        }
        class ob extends tb {
            constructor(e, n) {
                super(n),
                this.url = e,
                Vg(this, n)
            }
            toString() {
                return sb(this._root)
            }
        }
        function Vg(t, e) {
            e.value._routerState = t,
            e.children.forEach(n=>Vg(t, n))
        }
        function sb(t) {
            const e = t.children.length > 0 ? ` { ${t.children.map(sb).join(", ")} } ` : "";
            return `${t.value}${e}`
        }
        function $g(t) {
            if (t.snapshot) {
                const e = t.snapshot
                  , n = t._futureSnapshot;
                t.snapshot = n,
                Yr(e.queryParams, n.queryParams) || t.queryParams.next(n.queryParams),
                e.fragment !== n.fragment && t.fragment.next(n.fragment),
                Yr(e.params, n.params) || t.params.next(n.params),
                function C2(t, e) {
                    if (t.length !== e.length)
                        return !1;
                    for (let n = 0; n < t.length; ++n)
                        if (!Yr(t[n], e[n]))
                            return !1;
                    return !0
                }(e.url, n.url) || t.url.next(n.url),
                Yr(e.data, n.data) || t.data.next(n.data)
            } else
                t.snapshot = t._futureSnapshot,
                t.data.next(t._futureSnapshot.data)
        }
        function Ug(t, e) {
            const n = Yr(t.params, e.params) && function S2(t, e) {
                return Bo(t, e) && t.every((n,r)=>Yr(n.parameters, e[r].parameters))
            }(t.url, e.url);
            return n && !(!t.parent != !e.parent) && (!t.parent || Ug(t.parent, e.parent))
        }
        function Nu(t, e, n) {
            if (n && t.shouldReuseRoute(e.value, n.value.snapshot)) {
                const r = n.value;
                r._futureSnapshot = e.value;
                const i = function lB(t, e, n) {
                    return e.children.map(r=>{
                        for (const i of n.children)
                            if (t.shouldReuseRoute(r.value, i.value.snapshot))
                                return Nu(t, r, i);
                        return Nu(t, r)
                    }
                    )
                }(t, e, n);
                return new Ii(r,i)
            }
            {
                if (t.shouldAttach(e.value)) {
                    const o = t.retrieve(e.value);
                    if (null !== o) {
                        const s = o.route;
                        return s.value._futureSnapshot = e.value,
                        s.children = e.children.map(a=>Nu(t, a)),
                        s
                    }
                }
                const r = function cB(t) {
                    return new ea(new Tr(t.url),new Tr(t.params),new Tr(t.queryParams),new Tr(t.fragment),new Tr(t.data),t.outlet,t.component,t)
                }(e.value)
                  , i = e.children.map(o=>Nu(t, o));
                return new Ii(r,i)
            }
        }
        const Hg = "ngNavigationCancelingError";
        function ab(t, e) {
            const {redirectTo: n, navigationBehaviorOptions: r} = jo(e) ? {
                redirectTo: e,
                navigationBehaviorOptions: void 0
            } : e
              , i = ub(!1, 0, e);
            return i.url = n,
            i.navigationBehaviorOptions = r,
            i
        }
        function ub(t, e, n) {
            const r = new Error("NavigationCancelingError: " + (t || ""));
            return r[Hg] = !0,
            r.cancellationCode = e,
            n && (r.url = n),
            r
        }
        function lb(t) {
            return cb(t) && jo(t.url)
        }
        function cb(t) {
            return t && t[Hg]
        }
        class dB {
            constructor() {
                this.outlet = null,
                this.route = null,
                this.resolver = null,
                this.injector = null,
                this.children = new ku,
                this.attachRef = null
            }
        }
        let ku = (()=>{
            class t {
                constructor() {
                    this.contexts = new Map
                }
                onChildOutletCreated(n, r) {
                    const i = this.getOrCreateContext(n);
                    i.outlet = r,
                    this.contexts.set(n, i)
                }
                onChildOutletDestroyed(n) {
                    const r = this.getContext(n);
                    r && (r.outlet = null,
                    r.attachRef = null)
                }
                onOutletDeactivated() {
                    const n = this.contexts;
                    return this.contexts = new Map,
                    n
                }
                onOutletReAttached(n) {
                    this.contexts = n
                }
                getOrCreateContext(n) {
                    let r = this.getContext(n);
                    return r || (r = new dB,
                    this.contexts.set(n, r)),
                    r
                }
                getContext(n) {
                    return this.contexts.get(n) || null
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac,
                providedIn: "root"
            }),
            t
        }
        )();
        const pd = !1;
        let db = (()=>{
            class t {
                constructor() {
                    this.activated = null,
                    this._activatedRoute = null,
                    this.name = re,
                    this.activateEvents = new an,
                    this.deactivateEvents = new an,
                    this.attachEvents = new an,
                    this.detachEvents = new an,
                    this.parentContexts = De(ku),
                    this.location = De(wr),
                    this.changeDetector = De(Wp),
                    this.environmentInjector = De(_i)
                }
                ngOnChanges(n) {
                    if (n.name) {
                        const {firstChange: r, previousValue: i} = n.name;
                        if (r)
                            return;
                        this.isTrackedInParentContexts(i) && (this.deactivate(),
                        this.parentContexts.onChildOutletDestroyed(i)),
                        this.initializeOutletWithName()
                    }
                }
                ngOnDestroy() {
                    this.isTrackedInParentContexts(this.name) && this.parentContexts.onChildOutletDestroyed(this.name)
                }
                isTrackedInParentContexts(n) {
                    return this.parentContexts.getContext(n)?.outlet === this
                }
                ngOnInit() {
                    this.initializeOutletWithName()
                }
                initializeOutletWithName() {
                    if (this.parentContexts.onChildOutletCreated(this.name, this),
                    this.activated)
                        return;
                    const n = this.parentContexts.getContext(this.name);
                    n?.route && (n.attachRef ? this.attach(n.attachRef, n.route) : this.activateWith(n.route, n.injector))
                }
                get isActivated() {
                    return !!this.activated
                }
                get component() {
                    if (!this.activated)
                        throw new P(4012,pd);
                    return this.activated.instance
                }
                get activatedRoute() {
                    if (!this.activated)
                        throw new P(4012,pd);
                    return this._activatedRoute
                }
                get activatedRouteData() {
                    return this._activatedRoute ? this._activatedRoute.snapshot.data : {}
                }
                detach() {
                    if (!this.activated)
                        throw new P(4012,pd);
                    this.location.detach();
                    const n = this.activated;
                    return this.activated = null,
                    this._activatedRoute = null,
                    this.detachEvents.emit(n.instance),
                    n
                }
                attach(n, r) {
                    this.activated = n,
                    this._activatedRoute = r,
                    this.location.insert(n.hostView),
                    this.attachEvents.emit(n.instance)
                }
                deactivate() {
                    if (this.activated) {
                        const n = this.component;
                        this.activated.destroy(),
                        this.activated = null,
                        this._activatedRoute = null,
                        this.deactivateEvents.emit(n)
                    }
                }
                activateWith(n, r) {
                    if (this.isActivated)
                        throw new P(4013,pd);
                    this._activatedRoute = n;
                    const i = this.location
                      , s = n.snapshot.component
                      , a = this.parentContexts.getOrCreateContext(this.name).children
                      , u = new fB(n,a,i.injector);
                    if (r && function hB(t) {
                        return !!t.resolveComponentFactory
                    }(r)) {
                        const l = r.resolveComponentFactory(s);
                        this.activated = i.createComponent(l, i.length, u)
                    } else
                        this.activated = i.createComponent(s, {
                            index: i.length,
                            injector: u,
                            environmentInjector: r ?? this.environmentInjector
                        });
                    this.changeDetector.markForCheck(),
                    this.activateEvents.emit(this.activated.instance)
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)
            }
            ,
            t.\u0275dir = en({
                type: t,
                selectors: [["router-outlet"]],
                inputs: {
                    name: "name"
                },
                outputs: {
                    activateEvents: "activate",
                    deactivateEvents: "deactivate",
                    attachEvents: "attach",
                    detachEvents: "detach"
                },
                exportAs: ["outlet"],
                standalone: !0,
                features: [So]
            }),
            t
        }
        )();
        class fB {
            constructor(e, n, r) {
                this.route = e,
                this.childContexts = n,
                this.parent = r
            }
            get(e, n) {
                return e === ea ? this.route : e === ku ? this.childContexts : this.parent.get(e, n)
            }
        }
        let zg = (()=>{
            class t {
            }
            return t.\u0275fac = function(n) {
                return new (n || t)
            }
            ,
            t.\u0275cmp = jr({
                type: t,
                selectors: [["ng-component"]],
                standalone: !0,
                features: [_C],
                decls: 1,
                vars: 0,
                template: function(n, r) {
                    1 & n && xe(0, "router-outlet")
                },
                dependencies: [db],
                encapsulation: 2
            }),
            t
        }
        )();
        function fb(t, e) {
            return t.providers && !t._injector && (t._injector = Ac(t.providers, e, `Route: ${t.path}`)),
            t._injector ?? e
        }
        function Wg(t) {
            const e = t.children && t.children.map(Wg)
              , n = e ? {
                ...t,
                children: e
            } : {
                ...t
            };
            return !n.component && !n.loadComponent && (e || n.loadChildren) && n.outlet && n.outlet !== re && (n.component = zg),
            n
        }
        function or(t) {
            return t.outlet || re
        }
        function hb(t, e) {
            const n = t.filter(r=>or(r) === e);
            return n.push(...t.filter(r=>or(r) !== e)),
            n
        }
        function Lu(t) {
            if (!t)
                return null;
            if (t.routeConfig?._injector)
                return t.routeConfig._injector;
            for (let e = t.parent; e; e = e.parent) {
                const n = e.routeConfig;
                if (n?._loadedInjector)
                    return n._loadedInjector;
                if (n?._injector)
                    return n._injector
            }
            return null
        }
        class _B {
            constructor(e, n, r, i) {
                this.routeReuseStrategy = e,
                this.futureState = n,
                this.currState = r,
                this.forwardEvent = i
            }
            activate(e) {
                const n = this.futureState._root
                  , r = this.currState ? this.currState._root : null;
                this.deactivateChildRoutes(n, r, e),
                $g(this.futureState.root),
                this.activateChildRoutes(n, r, e)
            }
            deactivateChildRoutes(e, n, r) {
                const i = Js(n);
                e.children.forEach(o=>{
                    const s = o.value.outlet;
                    this.deactivateRoutes(o, i[s], r),
                    delete i[s]
                }
                ),
                Lt(i, (o,s)=>{
                    this.deactivateRouteAndItsChildren(o, r)
                }
                )
            }
            deactivateRoutes(e, n, r) {
                const i = e.value
                  , o = n ? n.value : null;
                if (i === o)
                    if (i.component) {
                        const s = r.getContext(i.outlet);
                        s && this.deactivateChildRoutes(e, n, s.children)
                    } else
                        this.deactivateChildRoutes(e, n, r);
                else
                    o && this.deactivateRouteAndItsChildren(n, r)
            }
            deactivateRouteAndItsChildren(e, n) {
                e.value.component && this.routeReuseStrategy.shouldDetach(e.value.snapshot) ? this.detachAndStoreRouteSubtree(e, n) : this.deactivateRouteAndOutlet(e, n)
            }
            detachAndStoreRouteSubtree(e, n) {
                const r = n.getContext(e.value.outlet)
                  , i = r && e.value.component ? r.children : n
                  , o = Js(e);
                for (const s of Object.keys(o))
                    this.deactivateRouteAndItsChildren(o[s], i);
                if (r && r.outlet) {
                    const s = r.outlet.detach()
                      , a = r.children.onOutletDeactivated();
                    this.routeReuseStrategy.store(e.value.snapshot, {
                        componentRef: s,
                        route: e,
                        contexts: a
                    })
                }
            }
            deactivateRouteAndOutlet(e, n) {
                const r = n.getContext(e.value.outlet)
                  , i = r && e.value.component ? r.children : n
                  , o = Js(e);
                for (const s of Object.keys(o))
                    this.deactivateRouteAndItsChildren(o[s], i);
                r && (r.outlet && (r.outlet.deactivate(),
                r.children.onOutletDeactivated()),
                r.attachRef = null,
                r.resolver = null,
                r.route = null)
            }
            activateChildRoutes(e, n, r) {
                const i = Js(n);
                e.children.forEach(o=>{
                    this.activateRoutes(o, i[o.value.outlet], r),
                    this.forwardEvent(new eB(o.value.snapshot))
                }
                ),
                e.children.length && this.forwardEvent(new X2(e.value.snapshot))
            }
            activateRoutes(e, n, r) {
                const i = e.value
                  , o = n ? n.value : null;
                if ($g(i),
                i === o)
                    if (i.component) {
                        const s = r.getOrCreateContext(i.outlet);
                        this.activateChildRoutes(e, n, s.children)
                    } else
                        this.activateChildRoutes(e, n, r);
                else if (i.component) {
                    const s = r.getOrCreateContext(i.outlet);
                    if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
                        const a = this.routeReuseStrategy.retrieve(i.snapshot);
                        this.routeReuseStrategy.store(i.snapshot, null),
                        s.children.onOutletReAttached(a.contexts),
                        s.attachRef = a.componentRef,
                        s.route = a.route.value,
                        s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                        $g(a.route.value),
                        this.activateChildRoutes(e, null, s.children)
                    } else {
                        const a = Lu(i.snapshot)
                          , u = a?.get(su) ?? null;
                        s.attachRef = null,
                        s.route = i,
                        s.resolver = u,
                        s.injector = a,
                        s.outlet && s.outlet.activateWith(i, s.injector),
                        this.activateChildRoutes(e, null, s.children)
                    }
                } else
                    this.activateChildRoutes(e, null, r)
            }
        }
        class pb {
            constructor(e) {
                this.path = e,
                this.route = this.path[this.path.length - 1]
            }
        }
        class gd {
            constructor(e, n) {
                this.component = e,
                this.route = n
            }
        }
        function yB(t, e, n) {
            const r = t._root;
            return Bu(r, e ? e._root : null, n, [r.value])
        }
        function ta(t, e) {
            const n = Symbol()
              , r = e.get(t, n);
            return r === n ? "function" != typeof t || function iI(t) {
                return null !== Al(t)
            }(t) ? e.get(t) : t : r
        }
        function Bu(t, e, n, r, i={
            canDeactivateChecks: [],
            canActivateChecks: []
        }) {
            const o = Js(e);
            return t.children.forEach(s=>{
                (function CB(t, e, n, r, i={
                    canDeactivateChecks: [],
                    canActivateChecks: []
                }) {
                    const o = t.value
                      , s = e ? e.value : null
                      , a = n ? n.getContext(t.value.outlet) : null;
                    if (s && o.routeConfig === s.routeConfig) {
                        const u = function wB(t, e, n) {
                            if ("function" == typeof n)
                                return n(t, e);
                            switch (n) {
                            case "pathParamsChange":
                                return !Bo(t.url, e.url);
                            case "pathParamsOrQueryParamsChange":
                                return !Bo(t.url, e.url) || !Yr(t.queryParams, e.queryParams);
                            case "always":
                                return !0;
                            case "paramsOrQueryParamsChange":
                                return !Ug(t, e) || !Yr(t.queryParams, e.queryParams);
                            default:
                                return !Ug(t, e)
                            }
                        }(s, o, o.routeConfig.runGuardsAndResolvers);
                        u ? i.canActivateChecks.push(new pb(r)) : (o.data = s.data,
                        o._resolvedData = s._resolvedData),
                        Bu(t, e, o.component ? a ? a.children : null : n, r, i),
                        u && a && a.outlet && a.outlet.isActivated && i.canDeactivateChecks.push(new gd(a.outlet.component,s))
                    } else
                        s && ju(e, a, i),
                        i.canActivateChecks.push(new pb(r)),
                        Bu(t, null, o.component ? a ? a.children : null : n, r, i)
                }
                )(s, o[s.value.outlet], n, r.concat([s.value]), i),
                delete o[s.value.outlet]
            }
            ),
            Lt(o, (s,a)=>ju(s, n.getContext(a), i)),
            i
        }
        function ju(t, e, n) {
            const r = Js(t)
              , i = t.value;
            Lt(r, (o,s)=>{
                ju(o, i.component ? e ? e.children.getContext(s) : null : e, n)
            }
            ),
            n.canDeactivateChecks.push(new gd(i.component && e && e.outlet && e.outlet.isActivated ? e.outlet.component : null,i))
        }
        function Vu(t) {
            return "function" == typeof t
        }
        function qg(t) {
            return t instanceof nd || "EmptyError" === t?.name
        }
        const md = Symbol("INITIAL_VALUE");
        function na() {
            return qr(t=>ME(t.map(e=>e.pipe(Ys(1), function p2(...t) {
                const e = Na(t);
                return Mt((n,r)=>{
                    (e ? Tg(t, n, e) : Tg(t, n)).subscribe(r)
                }
                )
            }(md)))).pipe(me(e=>{
                for (const n of e)
                    if (!0 !== n) {
                        if (n === md)
                            return md;
                        if (!1 === n || n instanceof Xi)
                            return n
                    }
                return !0
            }
            ), Yi(e=>e !== md), Ys(1)))
        }
        function gb(t) {
            return function sT(...t) {
                return CD(t)
            }(qt(e=>{
                if (jo(e))
                    throw ab(0, e)
            }
            ), me(e=>!0 === e))
        }
        const Yg = {
            matched: !1,
            consumedSegments: [],
            remainingSegments: [],
            parameters: {},
            positionalParamSegments: {}
        };
        function mb(t, e, n, r, i) {
            const o = Zg(t, e, n);
            return o.matched ? function jB(t, e, n, r) {
                const i = e.canMatch;
                return i && 0 !== i.length ? U(i.map(s=>{
                    const a = ta(s, t);
                    return Ki(function MB(t) {
                        return t && Vu(t.canMatch)
                    }(a) ? a.canMatch(e, n) : t.runInContext(()=>a(e, n)))
                }
                )).pipe(na(), gb()) : U(!0)
            }(r = fb(e, r), e, n).pipe(me(s=>!0 === s ? o : {
                ...Yg
            })) : U(o)
        }
        function Zg(t, e, n) {
            if ("" === e.path)
                return "full" === e.pathMatch && (t.hasChildren() || n.length > 0) ? {
                    ...Yg
                } : {
                    matched: !0,
                    consumedSegments: [],
                    remainingSegments: n,
                    parameters: {},
                    positionalParamSegments: {}
                };
            const i = (e.matcher || v2)(n, t, e);
            if (!i)
                return {
                    ...Yg
                };
            const o = {};
            Lt(i.posParams, (a,u)=>{
                o[u] = a.path
            }
            );
            const s = i.consumed.length > 0 ? {
                ...o,
                ...i.consumed[i.consumed.length - 1].parameters
            } : o;
            return {
                matched: !0,
                consumedSegments: i.consumed,
                remainingSegments: n.slice(i.consumed.length),
                parameters: s,
                positionalParamSegments: i.posParams ?? {}
            }
        }
        function Dd(t, e, n, r) {
            if (n.length > 0 && function UB(t, e, n) {
                return n.some(r=>_d(t, e, r) && or(r) !== re)
            }(t, n, r)) {
                const o = new le(e,function $B(t, e, n, r) {
                    const i = {};
                    i[re] = r,
                    r._sourceSegment = t,
                    r._segmentIndexShift = e.length;
                    for (const o of n)
                        if ("" === o.path && or(o) !== re) {
                            const s = new le([],{});
                            s._sourceSegment = t,
                            s._segmentIndexShift = e.length,
                            i[or(o)] = s
                        }
                    return i
                }(t, e, r, new le(n,t.children)));
                return o._sourceSegment = t,
                o._segmentIndexShift = e.length,
                {
                    segmentGroup: o,
                    slicedSegments: []
                }
            }
            if (0 === n.length && function HB(t, e, n) {
                return n.some(r=>_d(t, e, r))
            }(t, n, r)) {
                const o = new le(t.segments,function VB(t, e, n, r, i) {
                    const o = {};
                    for (const s of r)
                        if (_d(t, n, s) && !i[or(s)]) {
                            const a = new le([],{});
                            a._sourceSegment = t,
                            a._segmentIndexShift = e.length,
                            o[or(s)] = a
                        }
                    return {
                        ...i,
                        ...o
                    }
                }(t, e, n, r, t.children));
                return o._sourceSegment = t,
                o._segmentIndexShift = e.length,
                {
                    segmentGroup: o,
                    slicedSegments: n
                }
            }
            const i = new le(t.segments,t.children);
            return i._sourceSegment = t,
            i._segmentIndexShift = e.length,
            {
                segmentGroup: i,
                slicedSegments: n
            }
        }
        function _d(t, e, n) {
            return (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) && "" === n.path
        }
        function Db(t, e, n, r) {
            return !!(or(t) === r || r !== re && _d(e, n, t)) && ("**" === t.path || Zg(e, t, n).matched)
        }
        function _b(t, e, n) {
            return 0 === e.length && !t.children[n]
        }
        const yd = !1;
        class vd {
            constructor(e) {
                this.segmentGroup = e || null
            }
        }
        class yb {
            constructor(e) {
                this.urlTree = e
            }
        }
        function $u(t) {
            return Iu(new vd(t))
        }
        function vb(t) {
            return Iu(new yb(t))
        }
        class qB {
            constructor(e, n, r, i, o) {
                this.injector = e,
                this.configLoader = n,
                this.urlSerializer = r,
                this.urlTree = i,
                this.config = o,
                this.allowRedirects = !0
            }
            apply() {
                const e = Dd(this.urlTree.root, [], [], this.config).segmentGroup
                  , n = new le(e.segments,e.children);
                return this.expandSegmentGroup(this.injector, this.config, n, re).pipe(me(o=>this.createUrlTree(cd(o), this.urlTree.queryParams, this.urlTree.fragment))).pipe(Qi(o=>{
                    if (o instanceof yb)
                        return this.allowRedirects = !1,
                        this.match(o.urlTree);
                    throw o instanceof vd ? this.noMatchError(o) : o
                }
                ))
            }
            match(e) {
                return this.expandSegmentGroup(this.injector, this.config, e.root, re).pipe(me(i=>this.createUrlTree(cd(i), e.queryParams, e.fragment))).pipe(Qi(i=>{
                    throw i instanceof vd ? this.noMatchError(i) : i
                }
                ))
            }
            noMatchError(e) {
                return new P(4002,yd)
            }
            createUrlTree(e, n, r) {
                const i = Rg(e);
                return new Xi(i,n,r)
            }
            expandSegmentGroup(e, n, r, i) {
                return 0 === r.segments.length && r.hasChildren() ? this.expandChildren(e, n, r).pipe(me(o=>new le([],o))) : this.expandSegment(e, r, n, r.segments, i, !0)
            }
            expandChildren(e, n, r) {
                const i = [];
                for (const o of Object.keys(r.children))
                    "primary" === o ? i.unshift(o) : i.push(o);
                return vt(i).pipe(Lo(o=>{
                    const s = r.children[o]
                      , a = hb(n, o);
                    return this.expandSegmentGroup(e, a, s, o).pipe(me(u=>({
                        segment: u,
                        outlet: o
                    })))
                }
                ), PE((o,s)=>(o[s.outlet] = s.segment,
                o), {}), OE())
            }
            expandSegment(e, n, r, i, o, s) {
                return vt(r).pipe(Lo(a=>this.expandSegmentAgainstRoute(e, n, r, a, i, o, s).pipe(Qi(l=>{
                    if (l instanceof vd)
                        return U(null);
                    throw l
                }
                ))), Zi(a=>!!a), Qi((a,u)=>{
                    if (qg(a))
                        return _b(n, i, o) ? U(new le([],{})) : $u(n);
                    throw a
                }
                ))
            }
            expandSegmentAgainstRoute(e, n, r, i, o, s, a) {
                return Db(i, n, o, s) ? void 0 === i.redirectTo ? this.matchSegmentAgainstRoute(e, n, i, o, s) : a && this.allowRedirects ? this.expandSegmentAgainstRouteUsingRedirect(e, n, r, i, o, s) : $u(n) : $u(n)
            }
            expandSegmentAgainstRouteUsingRedirect(e, n, r, i, o, s) {
                return "**" === i.path ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(e, r, i, s) : this.expandRegularSegmentAgainstRouteUsingRedirect(e, n, r, i, o, s)
            }
            expandWildCardWithParamsAgainstRouteUsingRedirect(e, n, r, i) {
                const o = this.applyRedirectCommands([], r.redirectTo, {});
                return r.redirectTo.startsWith("/") ? vb(o) : this.lineralizeSegments(r, o).pipe(Ot(s=>{
                    const a = new le(s,{});
                    return this.expandSegment(e, a, n, s, i, !1)
                }
                ))
            }
            expandRegularSegmentAgainstRouteUsingRedirect(e, n, r, i, o, s) {
                const {matched: a, consumedSegments: u, remainingSegments: l, positionalParamSegments: c} = Zg(n, i, o);
                if (!a)
                    return $u(n);
                const d = this.applyRedirectCommands(u, i.redirectTo, c);
                return i.redirectTo.startsWith("/") ? vb(d) : this.lineralizeSegments(i, d).pipe(Ot(f=>this.expandSegment(e, n, r, f.concat(l), s, !1)))
            }
            matchSegmentAgainstRoute(e, n, r, i, o) {
                return "**" === r.path ? (e = fb(r, e),
                r.loadChildren ? (r._loadedRoutes ? U({
                    routes: r._loadedRoutes,
                    injector: r._loadedInjector
                }) : this.configLoader.loadChildren(e, r)).pipe(me(a=>(r._loadedRoutes = a.routes,
                r._loadedInjector = a.injector,
                new le(i,{})))) : U(new le(i,{}))) : mb(n, r, i, e).pipe(qr(({matched: s, consumedSegments: a, remainingSegments: u})=>s ? this.getChildConfig(e = r._injector ?? e, r, i).pipe(Ot(c=>{
                    const d = c.injector ?? e
                      , f = c.routes
                      , {segmentGroup: h, slicedSegments: p} = Dd(n, a, u, f)
                      , g = new le(h.segments,h.children);
                    if (0 === p.length && g.hasChildren())
                        return this.expandChildren(d, f, g).pipe(me(D=>new le(a,D)));
                    if (0 === f.length && 0 === p.length)
                        return U(new le(a,{}));
                    const m = or(r) === o;
                    return this.expandSegment(d, g, f, p, m ? re : o, !0).pipe(me(y=>new le(a.concat(y.segments),y.children)))
                }
                )) : $u(n)))
            }
            getChildConfig(e, n, r) {
                return n.children ? U({
                    routes: n.children,
                    injector: e
                }) : n.loadChildren ? void 0 !== n._loadedRoutes ? U({
                    routes: n._loadedRoutes,
                    injector: n._loadedInjector
                }) : function BB(t, e, n, r) {
                    const i = e.canLoad;
                    return void 0 === i || 0 === i.length ? U(!0) : U(i.map(s=>{
                        const a = ta(s, t);
                        return Ki(function bB(t) {
                            return t && Vu(t.canLoad)
                        }(a) ? a.canLoad(e, n) : t.runInContext(()=>a(e, n)))
                    }
                    )).pipe(na(), gb())
                }(e, n, r).pipe(Ot(i=>i ? this.configLoader.loadChildren(e, n).pipe(qt(o=>{
                    n._loadedRoutes = o.routes,
                    n._loadedInjector = o.injector
                }
                )) : function GB(t) {
                    return Iu(ub(yd, 3))
                }())) : U({
                    routes: [],
                    injector: e
                })
            }
            lineralizeSegments(e, n) {
                let r = []
                  , i = n.root;
                for (; ; ) {
                    if (r = r.concat(i.segments),
                    0 === i.numberOfChildren)
                        return U(r);
                    if (i.numberOfChildren > 1 || !i.children[re])
                        return e.redirectTo,
                        Iu(new P(4e3,yd));
                    i = i.children[re]
                }
            }
            applyRedirectCommands(e, n, r) {
                return this.applyRedirectCreateUrlTree(n, this.urlSerializer.parse(n), e, r)
            }
            applyRedirectCreateUrlTree(e, n, r, i) {
                const o = this.createSegmentGroup(e, n.root, r, i);
                return new Xi(o,this.createQueryParams(n.queryParams, this.urlTree.queryParams),n.fragment)
            }
            createQueryParams(e, n) {
                const r = {};
                return Lt(e, (i,o)=>{
                    if ("string" == typeof i && i.startsWith(":")) {
                        const a = i.substring(1);
                        r[o] = n[a]
                    } else
                        r[o] = i
                }
                ),
                r
            }
            createSegmentGroup(e, n, r, i) {
                const o = this.createSegments(e, n.segments, r, i);
                let s = {};
                return Lt(n.children, (a,u)=>{
                    s[u] = this.createSegmentGroup(e, a, r, i)
                }
                ),
                new le(o,s)
            }
            createSegments(e, n, r, i) {
                return n.map(o=>o.path.startsWith(":") ? this.findPosParam(e, o, i) : this.findOrReturn(o, r))
            }
            findPosParam(e, n, r) {
                const i = r[n.path.substring(1)];
                if (!i)
                    throw new P(4001,yd);
                return i
            }
            findOrReturn(e, n) {
                let r = 0;
                for (const i of n) {
                    if (i.path === e.path)
                        return n.splice(r),
                        i;
                    r++
                }
                return e
            }
        }
        class ZB {
        }
        class XB {
            constructor(e, n, r, i, o, s, a) {
                this.injector = e,
                this.rootComponentType = n,
                this.config = r,
                this.urlTree = i,
                this.url = o,
                this.paramsInheritanceStrategy = s,
                this.urlSerializer = a
            }
            recognize() {
                const e = Dd(this.urlTree.root, [], [], this.config.filter(n=>void 0 === n.redirectTo)).segmentGroup;
                return this.processSegmentGroup(this.injector, this.config, e, re).pipe(me(n=>{
                    if (null === n)
                        return null;
                    const r = new hd([],Object.freeze({}),Object.freeze({
                        ...this.urlTree.queryParams
                    }),this.urlTree.fragment,{},re,this.rootComponentType,null,this.urlTree.root,-1,{})
                      , i = new Ii(r,n)
                      , o = new ob(this.url,i);
                    return this.inheritParamsAndData(o._root),
                    o
                }
                ))
            }
            inheritParamsAndData(e) {
                const n = e.value
                  , r = ib(n, this.paramsInheritanceStrategy);
                n.params = Object.freeze(r.params),
                n.data = Object.freeze(r.data),
                e.children.forEach(i=>this.inheritParamsAndData(i))
            }
            processSegmentGroup(e, n, r, i) {
                return 0 === r.segments.length && r.hasChildren() ? this.processChildren(e, n, r) : this.processSegment(e, n, r, r.segments, i)
            }
            processChildren(e, n, r) {
                return vt(Object.keys(r.children)).pipe(Lo(i=>{
                    const o = r.children[i]
                      , s = hb(n, i);
                    return this.processSegmentGroup(e, s, o, i)
                }
                ), PE((i,o)=>i && o ? (i.push(...o),
                i) : null), function D2(t, e=!1) {
                    return Mt((n,r)=>{
                        let i = 0;
                        n.subscribe(xt(r, o=>{
                            const s = t(o, i++);
                            (s || e) && r.next(o),
                            !s && r.complete()
                        }
                        ))
                    }
                    )
                }(i=>null !== i), rd(null), OE(), me(i=>{
                    if (null === i)
                        return null;
                    const o = wb(i);
                    return function JB(t) {
                        t.sort((e,n)=>e.value.outlet === re ? -1 : n.value.outlet === re ? 1 : e.value.outlet.localeCompare(n.value.outlet))
                    }(o),
                    o
                }
                ))
            }
            processSegment(e, n, r, i, o) {
                return vt(n).pipe(Lo(s=>this.processSegmentAgainstRoute(s._injector ?? e, s, r, i, o)), Zi(s=>!!s), Qi(s=>{
                    if (qg(s))
                        return _b(r, i, o) ? U([]) : U(null);
                    throw s
                }
                ))
            }
            processSegmentAgainstRoute(e, n, r, i, o) {
                if (n.redirectTo || !Db(n, r, i, o))
                    return U(null);
                let s;
                if ("**" === n.path) {
                    const a = i.length > 0 ? LE(i).parameters : {}
                      , u = bb(r) + i.length;
                    s = U({
                        snapshot: new hd(i,a,Object.freeze({
                            ...this.urlTree.queryParams
                        }),this.urlTree.fragment,Sb(n),or(n),n.component ?? n._loadedComponent ?? null,n,Eb(r),u,Tb(n)),
                        consumedSegments: [],
                        remainingSegments: []
                    })
                } else
                    s = mb(r, n, i, e).pipe(me(({matched: a, consumedSegments: u, remainingSegments: l, parameters: c})=>{
                        if (!a)
                            return null;
                        const d = bb(r) + u.length;
                        return {
                            snapshot: new hd(u,c,Object.freeze({
                                ...this.urlTree.queryParams
                            }),this.urlTree.fragment,Sb(n),or(n),n.component ?? n._loadedComponent ?? null,n,Eb(r),d,Tb(n)),
                            consumedSegments: u,
                            remainingSegments: l
                        }
                    }
                    ));
                return s.pipe(qr(a=>{
                    if (null === a)
                        return U(null);
                    const {snapshot: u, consumedSegments: l, remainingSegments: c} = a;
                    e = n._injector ?? e;
                    const d = n._loadedInjector ?? e
                      , f = function e3(t) {
                        return t.children ? t.children : t.loadChildren ? t._loadedRoutes : []
                    }(n)
                      , {segmentGroup: h, slicedSegments: p} = Dd(r, l, c, f.filter(m=>void 0 === m.redirectTo));
                    if (0 === p.length && h.hasChildren())
                        return this.processChildren(d, f, h).pipe(me(m=>null === m ? null : [new Ii(u,m)]));
                    if (0 === f.length && 0 === p.length)
                        return U([new Ii(u,[])]);
                    const g = or(n) === o;
                    return this.processSegment(d, f, h, p, g ? re : o).pipe(me(m=>null === m ? null : [new Ii(u,m)]))
                }
                ))
            }
        }
        function t3(t) {
            const e = t.value.routeConfig;
            return e && "" === e.path && void 0 === e.redirectTo
        }
        function wb(t) {
            const e = []
              , n = new Set;
            for (const r of t) {
                if (!t3(r)) {
                    e.push(r);
                    continue
                }
                const i = e.find(o=>r.value.routeConfig === o.value.routeConfig);
                void 0 !== i ? (i.children.push(...r.children),
                n.add(i)) : e.push(r)
            }
            for (const r of n) {
                const i = wb(r.children);
                e.push(new Ii(r.value,i))
            }
            return e.filter(r=>!n.has(r))
        }
        function Eb(t) {
            let e = t;
            for (; e._sourceSegment; )
                e = e._sourceSegment;
            return e
        }
        function bb(t) {
            let e = t
              , n = e._segmentIndexShift ?? 0;
            for (; e._sourceSegment; )
                e = e._sourceSegment,
                n += e._segmentIndexShift ?? 0;
            return n - 1
        }
        function Sb(t) {
            return t.data || {}
        }
        function Tb(t) {
            return t.resolve || {}
        }
        function Ib(t) {
            return "string" == typeof t.title || null === t.title
        }
        function Qg(t) {
            return qr(e=>{
                const n = t(e);
                return n ? vt(n).pipe(me(()=>e)) : U(e)
            }
            )
        }
        const ra = new K("ROUTES");
        let Kg = (()=>{
            class t {
                constructor() {
                    this.componentLoaders = new WeakMap,
                    this.childrenLoaders = new WeakMap,
                    this.compiler = De(aw)
                }
                loadComponent(n) {
                    if (this.componentLoaders.get(n))
                        return this.componentLoaders.get(n);
                    if (n._loadedComponent)
                        return U(n._loadedComponent);
                    this.onLoadStartListener && this.onLoadStartListener(n);
                    const r = Ki(n.loadComponent()).pipe(me(xb), qt(o=>{
                        this.onLoadEndListener && this.onLoadEndListener(n),
                        n._loadedComponent = o
                    }
                    ), xg(()=>{
                        this.componentLoaders.delete(n)
                    }
                    ))
                      , i = new FE(r,()=>new ui).pipe(Ig());
                    return this.componentLoaders.set(n, i),
                    i
                }
                loadChildren(n, r) {
                    if (this.childrenLoaders.get(r))
                        return this.childrenLoaders.get(r);
                    if (r._loadedRoutes)
                        return U({
                            routes: r._loadedRoutes,
                            injector: r._loadedInjector
                        });
                    this.onLoadStartListener && this.onLoadStartListener(r);
                    const o = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(me(a=>{
                        this.onLoadEndListener && this.onLoadEndListener(r);
                        let u, l, c = !1;
                        Array.isArray(a) ? l = a : (u = a.create(n).injector,
                        l = kE(u.get(ra, [], G.Self | G.Optional)));
                        return {
                            routes: l.map(Wg),
                            injector: u
                        }
                    }
                    ), xg(()=>{
                        this.childrenLoaders.delete(r)
                    }
                    ))
                      , s = new FE(o,()=>new ui).pipe(Ig());
                    return this.childrenLoaders.set(r, s),
                    s
                }
                loadModuleFactoryOrRoutes(n) {
                    return Ki(n()).pipe(me(xb), Ot(r=>r instanceof mC || Array.isArray(r) ? U(r) : vt(this.compiler.compileModuleAsync(r))))
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac,
                providedIn: "root"
            }),
            t
        }
        )();
        function xb(t) {
            return function l3(t) {
                return t && "object" == typeof t && "default"in t
            }(t) ? t.default : t
        }
        let wd = (()=>{
            class t {
                get hasRequestedNavigation() {
                    return 0 !== this.navigationId
                }
                constructor() {
                    this.currentNavigation = null,
                    this.lastSuccessfulNavigation = null,
                    this.events = new ui,
                    this.configLoader = De(Kg),
                    this.environmentInjector = De(_i),
                    this.urlSerializer = De(Au),
                    this.rootContexts = De(ku),
                    this.navigationId = 0,
                    this.afterPreactivation = ()=>U(void 0),
                    this.rootComponentType = null,
                    this.configLoader.onLoadEndListener = i=>this.events.next(new Q2(i)),
                    this.configLoader.onLoadStartListener = i=>this.events.next(new Z2(i))
                }
                complete() {
                    this.transitions?.complete()
                }
                handleNavigationRequest(n) {
                    const r = ++this.navigationId;
                    this.transitions?.next({
                        ...this.transitions.value,
                        ...n,
                        id: r
                    })
                }
                setupNavigations(n) {
                    return this.transitions = new Tr({
                        id: 0,
                        targetPageId: 0,
                        currentUrlTree: n.currentUrlTree,
                        currentRawUrl: n.currentUrlTree,
                        extractedUrl: n.urlHandlingStrategy.extract(n.currentUrlTree),
                        urlAfterRedirects: n.urlHandlingStrategy.extract(n.currentUrlTree),
                        rawUrl: n.currentUrlTree,
                        extras: {},
                        resolve: null,
                        reject: null,
                        promise: Promise.resolve(!0),
                        source: Ou,
                        restoredState: null,
                        currentSnapshot: n.routerState.snapshot,
                        targetSnapshot: null,
                        currentRouterState: n.routerState,
                        targetRouterState: null,
                        guards: {
                            canActivateChecks: [],
                            canDeactivateChecks: []
                        },
                        guardsResult: null
                    }),
                    this.transitions.pipe(Yi(r=>0 !== r.id), me(r=>({
                        ...r,
                        extractedUrl: n.urlHandlingStrategy.extract(r.rawUrl)
                    })), qr(r=>{
                        let i = !1
                          , o = !1;
                        return U(r).pipe(qt(s=>{
                            this.currentNavigation = {
                                id: s.id,
                                initialUrl: s.rawUrl,
                                extractedUrl: s.extractedUrl,
                                trigger: s.source,
                                extras: s.extras,
                                previousNavigation: this.lastSuccessfulNavigation ? {
                                    ...this.lastSuccessfulNavigation,
                                    previousNavigation: null
                                } : null
                            }
                        }
                        ), qr(s=>{
                            const a = n.browserUrlTree.toString()
                              , u = !n.navigated || s.extractedUrl.toString() !== a || a !== n.currentUrlTree.toString();
                            if (!u && "reload" !== (s.extras.onSameUrlNavigation ?? n.onSameUrlNavigation)) {
                                const c = "";
                                return this.events.next(new fd(s.id,n.serializeUrl(r.rawUrl),c,0)),
                                n.rawUrlTree = s.rawUrl,
                                s.resolve(null),
                                kr
                            }
                            if (n.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))
                                return Ab(s.source) && (n.browserUrlTree = s.extractedUrl),
                                U(s).pipe(qr(c=>{
                                    const d = this.transitions?.getValue();
                                    return this.events.next(new kg(c.id,this.urlSerializer.serialize(c.extractedUrl),c.source,c.restoredState)),
                                    d !== this.transitions?.getValue() ? kr : Promise.resolve(c)
                                }
                                ), function YB(t, e, n, r) {
                                    return qr(i=>function WB(t, e, n, r, i) {
                                        return new qB(t,e,n,r,i).apply()
                                    }(t, e, n, i.extractedUrl, r).pipe(me(o=>({
                                        ...i,
                                        urlAfterRedirects: o
                                    }))))
                                }(this.environmentInjector, this.configLoader, this.urlSerializer, n.config), qt(c=>{
                                    this.currentNavigation = {
                                        ...this.currentNavigation,
                                        finalUrl: c.urlAfterRedirects
                                    },
                                    r.urlAfterRedirects = c.urlAfterRedirects
                                }
                                ), function r3(t, e, n, r, i) {
                                    return Ot(o=>function KB(t, e, n, r, i, o, s="emptyOnly") {
                                        return new XB(t,e,n,r,i,s,o).recognize().pipe(qr(a=>null === a ? function QB(t) {
                                            return new yt(e=>e.error(t))
                                        }(new ZB) : U(a)))
                                    }(t, e, n, o.urlAfterRedirects, r.serialize(o.urlAfterRedirects), r, i).pipe(me(s=>({
                                        ...o,
                                        targetSnapshot: s
                                    }))))
                                }(this.environmentInjector, this.rootComponentType, n.config, this.urlSerializer, n.paramsInheritanceStrategy), qt(c=>{
                                    if (r.targetSnapshot = c.targetSnapshot,
                                    "eager" === n.urlUpdateStrategy) {
                                        if (!c.extras.skipLocationChange) {
                                            const f = n.urlHandlingStrategy.merge(c.urlAfterRedirects, c.rawUrl);
                                            n.setBrowserUrl(f, c)
                                        }
                                        n.browserUrlTree = c.urlAfterRedirects
                                    }
                                    const d = new z2(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot);
                                    this.events.next(d)
                                }
                                ));
                            if (u && n.urlHandlingStrategy.shouldProcessUrl(n.rawUrlTree)) {
                                const {id: c, extractedUrl: d, source: f, restoredState: h, extras: p} = s
                                  , g = new kg(c,this.urlSerializer.serialize(d),f,h);
                                this.events.next(g);
                                const m = rb(d, this.rootComponentType).snapshot;
                                return U(r = {
                                    ...s,
                                    targetSnapshot: m,
                                    urlAfterRedirects: d,
                                    extras: {
                                        ...p,
                                        skipLocationChange: !1,
                                        replaceUrl: !1
                                    }
                                })
                            }
                            {
                                const c = "";
                                return this.events.next(new fd(s.id,n.serializeUrl(r.extractedUrl),c,1)),
                                n.rawUrlTree = s.rawUrl,
                                s.resolve(null),
                                kr
                            }
                        }
                        ), qt(s=>{
                            const a = new G2(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot);
                            this.events.next(a)
                        }
                        ), me(s=>r = {
                            ...s,
                            guards: yB(s.targetSnapshot, s.currentSnapshot, this.rootContexts)
                        }), function AB(t, e) {
                            return Ot(n=>{
                                const {targetSnapshot: r, currentSnapshot: i, guards: {canActivateChecks: o, canDeactivateChecks: s}} = n;
                                return 0 === s.length && 0 === o.length ? U({
                                    ...n,
                                    guardsResult: !0
                                }) : function FB(t, e, n, r) {
                                    return vt(t).pipe(Ot(i=>function LB(t, e, n, r, i) {
                                        const o = e && e.routeConfig ? e.routeConfig.canDeactivate : null;
                                        if (!o || 0 === o.length)
                                            return U(!0);
                                        const s = o.map(a=>{
                                            const u = Lu(e) ?? i
                                              , l = ta(a, u);
                                            return Ki(function IB(t) {
                                                return t && Vu(t.canDeactivate)
                                            }(l) ? l.canDeactivate(t, e, n, r) : u.runInContext(()=>l(t, e, n, r))).pipe(Zi())
                                        }
                                        );
                                        return U(s).pipe(na())
                                    }(i.component, i.route, n, e, r)), Zi(i=>!0 !== i, !0))
                                }(s, r, i, t).pipe(Ot(a=>a && function EB(t) {
                                    return "boolean" == typeof t
                                }(a) ? function RB(t, e, n, r) {
                                    return vt(e).pipe(Lo(i=>Tg(function OB(t, e) {
                                        return null !== t && e && e(new K2(t)),
                                        U(!0)
                                    }(i.route.parent, r), function PB(t, e) {
                                        return null !== t && e && e(new J2(t)),
                                        U(!0)
                                    }(i.route, r), function kB(t, e, n) {
                                        const r = e[e.length - 1]
                                          , o = e.slice(0, e.length - 1).reverse().map(s=>function vB(t) {
                                            const e = t.routeConfig ? t.routeConfig.canActivateChild : null;
                                            return e && 0 !== e.length ? {
                                                node: t,
                                                guards: e
                                            } : null
                                        }(s)).filter(s=>null !== s).map(s=>AE(()=>U(s.guards.map(u=>{
                                            const l = Lu(s.node) ?? n
                                              , c = ta(u, l);
                                            return Ki(function TB(t) {
                                                return t && Vu(t.canActivateChild)
                                            }(c) ? c.canActivateChild(r, t) : l.runInContext(()=>c(r, t))).pipe(Zi())
                                        }
                                        )).pipe(na())));
                                        return U(o).pipe(na())
                                    }(t, i.path, n), function NB(t, e, n) {
                                        const r = e.routeConfig ? e.routeConfig.canActivate : null;
                                        if (!r || 0 === r.length)
                                            return U(!0);
                                        const i = r.map(o=>AE(()=>{
                                            const s = Lu(e) ?? n
                                              , a = ta(o, s);
                                            return Ki(function SB(t) {
                                                return t && Vu(t.canActivate)
                                            }(a) ? a.canActivate(e, t) : s.runInContext(()=>a(e, t))).pipe(Zi())
                                        }
                                        ));
                                        return U(i).pipe(na())
                                    }(t, i.route, n))), Zi(i=>!0 !== i, !0))
                                }(r, o, t, e) : U(a)), me(a=>({
                                    ...n,
                                    guardsResult: a
                                })))
                            }
                            )
                        }(this.environmentInjector, s=>this.events.next(s)), qt(s=>{
                            if (r.guardsResult = s.guardsResult,
                            jo(s.guardsResult))
                                throw ab(0, s.guardsResult);
                            const a = new W2(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot,!!s.guardsResult);
                            this.events.next(a)
                        }
                        ), Yi(s=>!!s.guardsResult || (n.restoreHistory(s),
                        this.cancelNavigationTransition(s, "", 3),
                        !1)), Qg(s=>{
                            if (s.guards.canActivateChecks.length)
                                return U(s).pipe(qt(a=>{
                                    const u = new q2(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);
                                    this.events.next(u)
                                }
                                ), qr(a=>{
                                    let u = !1;
                                    return U(a).pipe(function i3(t, e) {
                                        return Ot(n=>{
                                            const {targetSnapshot: r, guards: {canActivateChecks: i}} = n;
                                            if (!i.length)
                                                return U(n);
                                            let o = 0;
                                            return vt(i).pipe(Lo(s=>function o3(t, e, n, r) {
                                                const i = t.routeConfig
                                                  , o = t._resolve;
                                                return void 0 !== i?.title && !Ib(i) && (o[Mu] = i.title),
                                                function s3(t, e, n, r) {
                                                    const i = function a3(t) {
                                                        return [...Object.keys(t), ...Object.getOwnPropertySymbols(t)]
                                                    }(t);
                                                    if (0 === i.length)
                                                        return U({});
                                                    const o = {};
                                                    return vt(i).pipe(Ot(s=>function u3(t, e, n, r) {
                                                        const i = Lu(e) ?? r
                                                          , o = ta(t, i);
                                                        return Ki(o.resolve ? o.resolve(e, n) : i.runInContext(()=>o(e, n)))
                                                    }(t[s], e, n, r).pipe(Zi(), qt(a=>{
                                                        o[s] = a
                                                    }
                                                    ))), Mg(1), function _2(t) {
                                                        return me(()=>t)
                                                    }(o), Qi(s=>qg(s) ? kr : Iu(s)))
                                                }(o, t, e, r).pipe(me(s=>(t._resolvedData = s,
                                                t.data = ib(t, n).resolve,
                                                i && Ib(i) && (t.data[Mu] = i.title),
                                                null)))
                                            }(s.route, r, t, e)), qt(()=>o++), Mg(1), Ot(s=>o === i.length ? U(n) : kr))
                                        }
                                        )
                                    }(n.paramsInheritanceStrategy, this.environmentInjector), qt({
                                        next: ()=>u = !0,
                                        complete: ()=>{
                                            u || (n.restoreHistory(a),
                                            this.cancelNavigationTransition(a, "", 2))
                                        }
                                    }))
                                }
                                ), qt(a=>{
                                    const u = new Y2(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);
                                    this.events.next(u)
                                }
                                ))
                        }
                        ), Qg(s=>{
                            const a = u=>{
                                const l = [];
                                u.routeConfig?.loadComponent && !u.routeConfig._loadedComponent && l.push(this.configLoader.loadComponent(u.routeConfig).pipe(qt(c=>{
                                    u.component = c
                                }
                                ), me(()=>{}
                                )));
                                for (const c of u.children)
                                    l.push(...a(c));
                                return l
                            }
                            ;
                            return ME(a(s.targetSnapshot.root)).pipe(rd(), Ys(1))
                        }
                        ), Qg(()=>this.afterPreactivation()), me(s=>{
                            const a = function uB(t, e, n) {
                                const r = Nu(t, e._root, n ? n._root : void 0);
                                return new nb(r,e)
                            }(n.routeReuseStrategy, s.targetSnapshot, s.currentRouterState);
                            return r = {
                                ...s,
                                targetRouterState: a
                            }
                        }
                        ), qt(s=>{
                            n.currentUrlTree = s.urlAfterRedirects,
                            n.rawUrlTree = n.urlHandlingStrategy.merge(s.urlAfterRedirects, s.rawUrl),
                            n.routerState = s.targetRouterState,
                            "deferred" === n.urlUpdateStrategy && (s.extras.skipLocationChange || n.setBrowserUrl(n.rawUrlTree, s),
                            n.browserUrlTree = s.urlAfterRedirects)
                        }
                        ), ((t,e,n)=>me(r=>(new _B(e,r.targetRouterState,r.currentRouterState,n).activate(t),
                        r)))(this.rootContexts, n.routeReuseStrategy, s=>this.events.next(s)), Ys(1), qt({
                            next: s=>{
                                i = !0,
                                this.lastSuccessfulNavigation = this.currentNavigation,
                                n.navigated = !0,
                                this.events.next(new Vo(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(n.currentUrlTree))),
                                n.titleStrategy?.updateTitle(s.targetRouterState.snapshot),
                                s.resolve(!0)
                            }
                            ,
                            complete: ()=>{
                                i = !0
                            }
                        }), xg(()=>{
                            i || o || this.cancelNavigationTransition(r, "", 1),
                            this.currentNavigation?.id === r.id && (this.currentNavigation = null)
                        }
                        ), Qi(s=>{
                            if (o = !0,
                            cb(s)) {
                                lb(s) || (n.navigated = !0,
                                n.restoreHistory(r, !0));
                                const a = new dd(r.id,this.urlSerializer.serialize(r.extractedUrl),s.message,s.cancellationCode);
                                if (this.events.next(a),
                                lb(s)) {
                                    const u = n.urlHandlingStrategy.merge(s.url, n.rawUrlTree)
                                      , l = {
                                        skipLocationChange: r.extras.skipLocationChange,
                                        replaceUrl: "eager" === n.urlUpdateStrategy || Ab(r.source)
                                    };
                                    n.scheduleNavigation(u, Ou, null, l, {
                                        resolve: r.resolve,
                                        reject: r.reject,
                                        promise: r.promise
                                    })
                                } else
                                    r.resolve(!1)
                            } else {
                                n.restoreHistory(r, !0);
                                const a = new Lg(r.id,this.urlSerializer.serialize(r.extractedUrl),s,r.targetSnapshot ?? void 0);
                                this.events.next(a);
                                try {
                                    r.resolve(n.errorHandler(s))
                                } catch (u) {
                                    r.reject(u)
                                }
                            }
                            return kr
                        }
                        ))
                    }
                    ))
                }
                cancelNavigationTransition(n, r, i) {
                    const o = new dd(n.id,this.urlSerializer.serialize(n.extractedUrl),r,i);
                    this.events.next(o),
                    n.resolve(!1)
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac,
                providedIn: "root"
            }),
            t
        }
        )();
        function Ab(t) {
            return t !== Ou
        }
        let Fb = (()=>{
            class t {
                buildTitle(n) {
                    let r, i = n.root;
                    for (; void 0 !== i; )
                        r = this.getResolvedTitleForRoute(i) ?? r,
                        i = i.children.find(o=>o.outlet === re);
                    return r
                }
                getResolvedTitleForRoute(n) {
                    return n.data[Mu]
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: function() {
                    return De(c3)
                },
                providedIn: "root"
            }),
            t
        }
        )()
          , c3 = (()=>{
            class t extends Fb {
                constructor(n) {
                    super(),
                    this.title = n
                }
                updateTitle(n) {
                    const r = this.buildTitle(n);
                    void 0 !== r && this.title.setTitle(r)
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)(W(SE))
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac,
                providedIn: "root"
            }),
            t
        }
        )()
          , d3 = (()=>{
            class t {
            }
            return t.\u0275fac = function(n) {
                return new (n || t)
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: function() {
                    return De(h3)
                },
                providedIn: "root"
            }),
            t
        }
        )();
        class f3 {
            shouldDetach(e) {
                return !1
            }
            store(e, n) {}
            shouldAttach(e) {
                return !1
            }
            retrieve(e) {
                return null
            }
            shouldReuseRoute(e, n) {
                return e.routeConfig === n.routeConfig
            }
        }
        let h3 = (()=>{
            class t extends f3 {
            }
            return t.\u0275fac = function() {
                let e;
                return function(r) {
                    return (e || (e = function L_(t) {
                        return di(()=>{
                            const e = t.prototype.constructor
                              , n = e[hi] || eh(e)
                              , r = Object.prototype;
                            let i = Object.getPrototypeOf(t.prototype).constructor;
                            for (; i && i !== r; ) {
                                const o = i[hi] || eh(i);
                                if (o && o !== n)
                                    return o;
                                i = Object.getPrototypeOf(i)
                            }
                            return o=>new o
                        }
                        )
                    }(t)))(r || t)
                }
            }(),
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac,
                providedIn: "root"
            }),
            t
        }
        )();
        const Ed = new K("",{
            providedIn: "root",
            factory: ()=>({})
        });
        let g3 = (()=>{
            class t {
            }
            return t.\u0275fac = function(n) {
                return new (n || t)
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: function() {
                    return De(m3)
                },
                providedIn: "root"
            }),
            t
        }
        )()
          , m3 = (()=>{
            class t {
                shouldProcessUrl(n) {
                    return !0
                }
                extract(n) {
                    return n
                }
                merge(n, r) {
                    return n
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac,
                providedIn: "root"
            }),
            t
        }
        )();
        function D3(t) {
            throw t
        }
        function _3(t, e, n) {
            return e.parse("/")
        }
        const y3 = {
            paths: "exact",
            fragment: "ignored",
            matrixParams: "ignored",
            queryParams: "exact"
        }
          , v3 = {
            paths: "subset",
            fragment: "ignored",
            matrixParams: "ignored",
            queryParams: "subset"
        };
        let Bn = (()=>{
            class t {
                get navigationId() {
                    return this.navigationTransitions.navigationId
                }
                get browserPageId() {
                    if ("computed" === this.canceledNavigationResolution)
                        return this.location.getState()?.\u0275routerPageId
                }
                get events() {
                    return this.navigationTransitions.events
                }
                constructor() {
                    this.disposed = !1,
                    this.currentPageId = 0,
                    this.console = De(UO),
                    this.isNgZoneEnabled = !1,
                    this.options = De(Ed, {
                        optional: !0
                    }) || {},
                    this.errorHandler = this.options.errorHandler || D3,
                    this.malformedUriErrorHandler = this.options.malformedUriErrorHandler || _3,
                    this.navigated = !1,
                    this.lastSuccessfulId = -1,
                    this.urlHandlingStrategy = De(g3),
                    this.routeReuseStrategy = De(d3),
                    this.urlCreationStrategy = De(oB),
                    this.titleStrategy = De(Fb),
                    this.onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore",
                    this.paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || "emptyOnly",
                    this.urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred",
                    this.canceledNavigationResolution = this.options.canceledNavigationResolution || "replace",
                    this.config = kE(De(ra, {
                        optional: !0
                    }) ?? []),
                    this.navigationTransitions = De(wd),
                    this.urlSerializer = De(Au),
                    this.location = De(tg),
                    this.isNgZoneEnabled = De(st)instanceof st && st.isInAngularZone(),
                    this.resetConfig(this.config),
                    this.currentUrlTree = new Xi,
                    this.rawUrlTree = this.currentUrlTree,
                    this.browserUrlTree = this.currentUrlTree,
                    this.routerState = rb(this.currentUrlTree, null),
                    this.navigationTransitions.setupNavigations(this).subscribe(n=>{
                        this.lastSuccessfulId = n.id,
                        this.currentPageId = this.browserPageId ?? 0
                    }
                    , n=>{
                        this.console.warn(`Unhandled Navigation Error: ${n}`)
                    }
                    )
                }
                resetRootComponentType(n) {
                    this.routerState.root.component = n,
                    this.navigationTransitions.rootComponentType = n
                }
                initialNavigation() {
                    if (this.setUpLocationChangeListener(),
                    !this.navigationTransitions.hasRequestedNavigation) {
                        const n = this.location.getState();
                        this.navigateToSyncWithBrowser(this.location.path(!0), Ou, n)
                    }
                }
                setUpLocationChangeListener() {
                    this.locationSubscription || (this.locationSubscription = this.location.subscribe(n=>{
                        const r = "popstate" === n.type ? "popstate" : "hashchange";
                        "popstate" === r && setTimeout(()=>{
                            this.navigateToSyncWithBrowser(n.url, r, n.state)
                        }
                        , 0)
                    }
                    ))
                }
                navigateToSyncWithBrowser(n, r, i) {
                    const o = {
                        replaceUrl: !0
                    }
                      , s = i?.navigationId ? i : null;
                    if (i) {
                        const u = {
                            ...i
                        };
                        delete u.navigationId,
                        delete u.\u0275routerPageId,
                        0 !== Object.keys(u).length && (o.state = u)
                    }
                    const a = this.parseUrl(n);
                    this.scheduleNavigation(a, r, s, o)
                }
                get url() {
                    return this.serializeUrl(this.currentUrlTree)
                }
                getCurrentNavigation() {
                    return this.navigationTransitions.currentNavigation
                }
                resetConfig(n) {
                    this.config = n.map(Wg),
                    this.navigated = !1,
                    this.lastSuccessfulId = -1
                }
                ngOnDestroy() {
                    this.dispose()
                }
                dispose() {
                    this.navigationTransitions.complete(),
                    this.locationSubscription && (this.locationSubscription.unsubscribe(),
                    this.locationSubscription = void 0),
                    this.disposed = !0
                }
                createUrlTree(n, r={}) {
                    const {relativeTo: i, queryParams: o, fragment: s, queryParamsHandling: a, preserveFragment: u} = r
                      , l = u ? this.currentUrlTree.fragment : s;
                    let c = null;
                    switch (a) {
                    case "merge":
                        c = {
                            ...this.currentUrlTree.queryParams,
                            ...o
                        };
                        break;
                    case "preserve":
                        c = this.currentUrlTree.queryParams;
                        break;
                    default:
                        c = o || null
                    }
                    return null !== c && (c = this.removeEmptyProps(c)),
                    this.urlCreationStrategy.createUrlTree(i, this.routerState, this.currentUrlTree, n, c, l ?? null)
                }
                navigateByUrl(n, r={
                    skipLocationChange: !1
                }) {
                    const i = jo(n) ? n : this.parseUrl(n)
                      , o = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
                    return this.scheduleNavigation(o, Ou, null, r)
                }
                navigate(n, r={
                    skipLocationChange: !1
                }) {
                    return function C3(t) {
                        for (let e = 0; e < t.length; e++) {
                            const n = t[e];
                            if (null == n)
                                throw new P(4008,false)
                        }
                    }(n),
                    this.navigateByUrl(this.createUrlTree(n, r), r)
                }
                serializeUrl(n) {
                    return this.urlSerializer.serialize(n)
                }
                parseUrl(n) {
                    let r;
                    try {
                        r = this.urlSerializer.parse(n)
                    } catch (i) {
                        r = this.malformedUriErrorHandler(i, this.urlSerializer, n)
                    }
                    return r
                }
                isActive(n, r) {
                    let i;
                    if (i = !0 === r ? {
                        ...y3
                    } : !1 === r ? {
                        ...v3
                    } : r,
                    jo(n))
                        return jE(this.currentUrlTree, n, i);
                    const o = this.parseUrl(n);
                    return jE(this.currentUrlTree, o, i)
                }
                removeEmptyProps(n) {
                    return Object.keys(n).reduce((r,i)=>{
                        const o = n[i];
                        return null != o && (r[i] = o),
                        r
                    }
                    , {})
                }
                scheduleNavigation(n, r, i, o, s) {
                    if (this.disposed)
                        return Promise.resolve(!1);
                    let a, u, l, c;
                    return s ? (a = s.resolve,
                    u = s.reject,
                    l = s.promise) : l = new Promise((d,f)=>{
                        a = d,
                        u = f
                    }
                    ),
                    c = "computed" === this.canceledNavigationResolution ? i && i.\u0275routerPageId ? i.\u0275routerPageId : (this.browserPageId ?? 0) + 1 : 0,
                    this.navigationTransitions.handleNavigationRequest({
                        targetPageId: c,
                        source: r,
                        restoredState: i,
                        currentUrlTree: this.currentUrlTree,
                        currentRawUrl: this.currentUrlTree,
                        rawUrl: n,
                        extras: o,
                        resolve: a,
                        reject: u,
                        promise: l,
                        currentSnapshot: this.routerState.snapshot,
                        currentRouterState: this.routerState
                    }),
                    l.catch(d=>Promise.reject(d))
                }
                setBrowserUrl(n, r) {
                    const i = this.urlSerializer.serialize(n);
                    if (this.location.isCurrentPathEqualTo(i) || r.extras.replaceUrl) {
                        const s = {
                            ...r.extras.state,
                            ...this.generateNgRouterState(r.id, this.browserPageId)
                        };
                        this.location.replaceState(i, "", s)
                    } else {
                        const o = {
                            ...r.extras.state,
                            ...this.generateNgRouterState(r.id, r.targetPageId)
                        };
                        this.location.go(i, "", o)
                    }
                }
                restoreHistory(n, r=!1) {
                    if ("computed" === this.canceledNavigationResolution) {
                        const o = this.currentPageId - (this.browserPageId ?? this.currentPageId);
                        0 !== o ? this.location.historyGo(o) : this.currentUrlTree === this.getCurrentNavigation()?.finalUrl && 0 === o && (this.resetState(n),
                        this.browserUrlTree = n.currentUrlTree,
                        this.resetUrlToCurrentUrlTree())
                    } else
                        "replace" === this.canceledNavigationResolution && (r && this.resetState(n),
                        this.resetUrlToCurrentUrlTree())
                }
                resetState(n) {
                    this.routerState = n.currentRouterState,
                    this.currentUrlTree = n.currentUrlTree,
                    this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, n.rawUrl)
                }
                resetUrlToCurrentUrlTree() {
                    this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), "", this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId))
                }
                generateNgRouterState(n, r) {
                    return "computed" === this.canceledNavigationResolution ? {
                        navigationId: n,
                        \u0275routerPageId: r
                    } : {
                        navigationId: n
                    }
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac,
                providedIn: "root"
            }),
            t
        }
        )();
        class Rb {
        }
        let b3 = (()=>{
            class t {
                constructor(n, r, i, o, s) {
                    this.router = n,
                    this.injector = i,
                    this.preloadingStrategy = o,
                    this.loader = s
                }
                setUpPreloading() {
                    this.subscription = this.router.events.pipe(Yi(n=>n instanceof Vo), Lo(()=>this.preload())).subscribe(()=>{}
                    )
                }
                preload() {
                    return this.processRoutes(this.injector, this.router.config)
                }
                ngOnDestroy() {
                    this.subscription && this.subscription.unsubscribe()
                }
                processRoutes(n, r) {
                    const i = [];
                    for (const o of r) {
                        o.providers && !o._injector && (o._injector = Ac(o.providers, n, `Route: ${o.path}`));
                        const s = o._injector ?? n
                          , a = o._loadedInjector ?? s;
                        (o.loadChildren && !o._loadedRoutes && void 0 === o.canLoad || o.loadComponent && !o._loadedComponent) && i.push(this.preloadConfig(s, o)),
                        (o.children || o._loadedRoutes) && i.push(this.processRoutes(a, o.children ?? o._loadedRoutes))
                    }
                    return vt(i).pipe(us())
                }
                preloadConfig(n, r) {
                    return this.preloadingStrategy.preload(r, ()=>{
                        let i;
                        i = r.loadChildren && void 0 === r.canLoad ? this.loader.loadChildren(n, r) : U(null);
                        const o = i.pipe(Ot(s=>null === s ? U(void 0) : (r._loadedRoutes = s.routes,
                        r._loadedInjector = s.injector,
                        this.processRoutes(s.injector ?? n, s.routes))));
                        return r.loadComponent && !r._loadedComponent ? vt([o, this.loader.loadComponent(r)]).pipe(us()) : o
                    }
                    )
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)(W(Bn),W(aw),W(_i),W(Rb),W(Kg))
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac,
                providedIn: "root"
            }),
            t
        }
        )();
        const em = new K("");
        let Pb = (()=>{
            class t {
                constructor(n, r, i, o, s={}) {
                    this.urlSerializer = n,
                    this.transitions = r,
                    this.viewportScroller = i,
                    this.zone = o,
                    this.options = s,
                    this.lastId = 0,
                    this.lastSource = "imperative",
                    this.restoredId = 0,
                    this.store = {},
                    s.scrollPositionRestoration = s.scrollPositionRestoration || "disabled",
                    s.anchorScrolling = s.anchorScrolling || "disabled"
                }
                init() {
                    "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.setHistoryScrollRestoration("manual"),
                    this.routerEventsSubscription = this.createScrollEvents(),
                    this.scrollEventsSubscription = this.consumeScrollEvents()
                }
                createScrollEvents() {
                    return this.transitions.events.subscribe(n=>{
                        n instanceof kg ? (this.store[this.lastId] = this.viewportScroller.getScrollPosition(),
                        this.lastSource = n.navigationTrigger,
                        this.restoredId = n.restoredState ? n.restoredState.navigationId : 0) : n instanceof Vo && (this.lastId = n.id,
                        this.scheduleScrollEvent(n, this.urlSerializer.parse(n.urlAfterRedirects).fragment))
                    }
                    )
                }
                consumeScrollEvents() {
                    return this.transitions.events.subscribe(n=>{
                        n instanceof eb && (n.position ? "top" === this.options.scrollPositionRestoration ? this.viewportScroller.scrollToPosition([0, 0]) : "enabled" === this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition(n.position) : n.anchor && "enabled" === this.options.anchorScrolling ? this.viewportScroller.scrollToAnchor(n.anchor) : "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition([0, 0]))
                    }
                    )
                }
                scheduleScrollEvent(n, r) {
                    this.zone.runOutsideAngular(()=>{
                        setTimeout(()=>{
                            this.zone.run(()=>{
                                this.transitions.events.next(new eb(n,"popstate" === this.lastSource ? this.store[this.restoredId] : null,r))
                            }
                            )
                        }
                        , 0)
                    }
                    )
                }
                ngOnDestroy() {
                    this.routerEventsSubscription?.unsubscribe(),
                    this.scrollEventsSubscription?.unsubscribe()
                }
            }
            return t.\u0275fac = function(n) {
                !function hv() {
                    throw new Error("invalid")
                }()
            }
            ,
            t.\u0275prov = Q({
                token: t,
                factory: t.\u0275fac
            }),
            t
        }
        )();
        var jn = (()=>((jn = jn || {})[jn.COMPLETE = 0] = "COMPLETE",
        jn[jn.FAILED = 1] = "FAILED",
        jn[jn.REDIRECTING = 2] = "REDIRECTING",
        jn))();
        const ia = !1;
        function Ji(t, e) {
            return {
                \u0275kind: t,
                \u0275providers: e
            }
        }
        const tm = new K("",{
            providedIn: "root",
            factory: ()=>!1
        });
        function Nb() {
            const t = De(vi);
            return e=>{
                const n = t.get(Lc);
                if (e !== n.components[0])
                    return;
                const r = t.get(Bn)
                  , i = t.get(kb);
                1 === t.get(nm) && r.initialNavigation(),
                t.get(Lb, null, G.Optional)?.setUpPreloading(),
                t.get(em, null, G.Optional)?.init(),
                r.resetRootComponentType(n.componentTypes[0]),
                i.closed || (i.next(),
                i.complete(),
                i.unsubscribe())
            }
        }
        const kb = new K(ia ? "bootstrap done indicator" : "",{
            factory: ()=>new ui
        })
          , nm = new K(ia ? "initial navigation" : "",{
            providedIn: "root",
            factory: ()=>1
        });
        function x3() {
            let t = [];
            return t = ia ? [{
                provide: uc,
                multi: !0,
                useFactory: ()=>{
                    const e = De(Bn);
                    return ()=>e.events.subscribe(n=>{
                        console.group?.(`Router Event: ${n.constructor.name}`),
                        console.log(function tB(t) {
                            if (!("type"in t))
                                return `Unknown Router Event: ${t.constructor.name}`;
                            switch (t.type) {
                            case 14:
                                return `ActivationEnd(path: '${t.snapshot.routeConfig?.path || ""}')`;
                            case 13:
                                return `ActivationStart(path: '${t.snapshot.routeConfig?.path || ""}')`;
                            case 12:
                                return `ChildActivationEnd(path: '${t.snapshot.routeConfig?.path || ""}')`;
                            case 11:
                                return `ChildActivationStart(path: '${t.snapshot.routeConfig?.path || ""}')`;
                            case 8:
                                return `GuardsCheckEnd(id: ${t.id}, url: '${t.url}', urlAfterRedirects: '${t.urlAfterRedirects}', state: ${t.state}, shouldActivate: ${t.shouldActivate})`;
                            case 7:
                                return `GuardsCheckStart(id: ${t.id}, url: '${t.url}', urlAfterRedirects: '${t.urlAfterRedirects}', state: ${t.state})`;
                            case 2:
                                return `NavigationCancel(id: ${t.id}, url: '${t.url}')`;
                            case 16:
                                return `NavigationSkipped(id: ${t.id}, url: '${t.url}')`;
                            case 1:
                                return `NavigationEnd(id: ${t.id}, url: '${t.url}', urlAfterRedirects: '${t.urlAfterRedirects}')`;
                            case 3:
                                return `NavigationError(id: ${t.id}, url: '${t.url}', error: ${t.error})`;
                            case 0:
                                return `NavigationStart(id: ${t.id}, url: '${t.url}')`;
                            case 6:
                                return `ResolveEnd(id: ${t.id}, url: '${t.url}', urlAfterRedirects: '${t.urlAfterRedirects}', state: ${t.state})`;
                            case 5:
                                return `ResolveStart(id: ${t.id}, url: '${t.url}', urlAfterRedirects: '${t.urlAfterRedirects}', state: ${t.state})`;
                            case 10:
                                return `RouteConfigLoadEnd(path: ${t.route.path})`;
                            case 9:
                                return `RouteConfigLoadStart(path: ${t.route.path})`;
                            case 4:
                                return `RoutesRecognized(id: ${t.id}, url: '${t.url}', urlAfterRedirects: '${t.urlAfterRedirects}', state: ${t.state})`;
                            case 15:
                                return `Scroll(anchor: '${t.anchor}', position: '${t.position ? `${t.position[0]}, ${t.position[1]}` : null}')`
                            }
                        }(n)),
                        console.log(n),
                        console.groupEnd?.()
                    }
                    )
                }
            }] : [],
            Ji(1, t)
        }
        const Lb = new K(ia ? "router preloader" : "");
        function A3(t) {
            return Ji(0, [{
                provide: Lb,
                useExisting: b3
            }, {
                provide: Rb,
                useExisting: t
            }])
        }
        const Uu = !1
          , Bb = new K(Uu ? "router duplicate forRoot guard" : "ROUTER_FORROOT_GUARD")
          , F3 = [tg, {
            provide: Au,
            useClass: Ag
        }, Bn, ku, {
            provide: ea,
            useFactory: function Ob(t) {
                return t.routerState.root
            },
            deps: [Bn]
        }, Kg, Uu ? {
            provide: tm,
            useValue: !0
        } : []];
        function R3() {
            return new gw("Router",Bn)
        }
        let jb = (()=>{
            class t {
                constructor(n) {}
                static forRoot(n, r) {
                    return {
                        ngModule: t,
                        providers: [F3, Uu && r?.enableTracing ? x3().\u0275providers : [], {
                            provide: ra,
                            multi: !0,
                            useValue: n
                        }, {
                            provide: Bb,
                            useFactory: k3,
                            deps: [[Bn, new Qa, new Ka]]
                        }, {
                            provide: Ed,
                            useValue: r || {}
                        }, r?.useHash ? {
                            provide: ko,
                            useClass: xN
                        } : {
                            provide: ko,
                            useClass: Bw
                        }, {
                            provide: em,
                            useFactory: ()=>{
                                const t = De(Qk)
                                  , e = De(st)
                                  , n = De(Ed)
                                  , r = De(wd)
                                  , i = De(Au);
                                return n.scrollOffset && t.setOffset(n.scrollOffset),
                                new Pb(i,r,t,e,n)
                            }
                        }, r?.preloadingStrategy ? A3(r.preloadingStrategy).\u0275providers : [], {
                            provide: gw,
                            multi: !0,
                            useFactory: R3
                        }, r?.initialNavigation ? L3(r) : [], [{
                            provide: Vb,
                            useFactory: Nb
                        }, {
                            provide: pw,
                            multi: !0,
                            useExisting: Vb
                        }]]
                    }
                }
                static forChild(n) {
                    return {
                        ngModule: t,
                        providers: [{
                            provide: ra,
                            multi: !0,
                            useValue: n
                        }]
                    }
                }
            }
            return t.\u0275fac = function(n) {
                return new (n || t)(W(Bb, 8))
            }
            ,
            t.\u0275mod = $i({
                type: t
            }),
            t.\u0275inj = ci({
                imports: [zg]
            }),
            t
        }
        )();
        function k3(t) {
            if (Uu && t)
                throw new P(4007,"The Router was provided more than once. This can happen if 'forRoot' is used outside of the root injector. Lazy loaded modules should use RouterModule.forChild() instead.");
            return "guarded"
        }
        function L3(t) {
            return ["disabled" === t.initialNavigation ? Ji(3, [{
                provide: Oc,
                multi: !0,
                useFactory: ()=>{
                    const e = De(Bn);
                    return ()=>{
                        e.setUpLocationChangeListener()
                    }
                }
            }, {
                provide: nm,
                useValue: 2
            }]).\u0275providers : [], "enabledBlocking" === t.initialNavigation ? Ji(2, [{
                provide: nm,
                useValue: 0
            }, {
                provide: Oc,
                multi: !0,
                deps: [vi],
                useFactory: e=>{
                    const n = e.get(IN, Promise.resolve());
                    return ()=>n.then(()=>new Promise(r=>{
                        const i = e.get(Bn)
                          , o = e.get(kb);
                        (function S3(t, e) {
                            t.events.pipe(Yi(n=>n instanceof Vo || n instanceof dd || n instanceof Lg || n instanceof fd), me(n=>n instanceof Vo || n instanceof fd ? jn.COMPLETE : n instanceof dd && (0 === n.code || 1 === n.code) ? jn.REDIRECTING : jn.FAILED), Yi(n=>n !== jn.REDIRECTING), Ys(1)).subscribe(()=>{
                                e()
                            }
                            )
                        }
                        )(i, ()=>{
                            r(!0)
                        }
                        ),
                        e.get(wd).afterPreactivation = ()=>(r(!0),
                        o.closed ? U(void 0) : o),
                        i.initialNavigation()
                    }
                    ))
                }
            }]).\u0275providers : []]
        }
        const Vb = new K(Uu ? "Router Initializer" : "")
          , j3 = [];
        let V3 = (()=>{
            class t {
                static #e = this.\u0275fac = function(r) {
                    return new (r || t)
                }
                ;
                static #t = this.\u0275mod = $i({
                    type: t
                });
                static #n = this.\u0275inj = ci({
                    imports: [jb.forRoot(j3), jb]
                })
            }
            return t
        }
        )();
        function Mi(t) {
            if (void 0 === t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }
        function $b(t, e) {
            t.prototype = Object.create(e.prototype),
            t.prototype.constructor = t,
            t.__proto__ = e
        }
        var rm, Yt, gt, qe, ar, um, lm, Yb, Kb, ca, Qu, u, l, c, d, f, h, t, e, n, r, i, o, s, a, p, Vn = {
            autoSleep: 120,
            force3D: "auto",
            nullTargetWarn: 1,
            units: {
                lineHeight: ""
            }
        }, oa = {
            duration: .5,
            overwrite: !1,
            delay: 0
        }, sr = 1e8, Oe = 1 / sr, im = 2 * Math.PI, $3 = im / 4, U3 = 0, Ub = Math.sqrt, H3 = Math.cos, z3 = Math.sin, At = function(e) {
            return "string" == typeof e
        }, Je = function(e) {
            return "function" == typeof e
        }, xi = function(e) {
            return "number" == typeof e
        }, om = function(e) {
            return typeof e > "u"
        }, Qr = function(e) {
            return "object" == typeof e
        }, Sn = function(e) {
            return !1 !== e
        }, Hb = function() {
            return typeof window < "u"
        }, bd = function(e) {
            return Je(e) || At(e)
        }, zb = "function" == typeof ArrayBuffer && ArrayBuffer.isView || function() {}
        , Zt = Array.isArray, sm = /(?:-?\.?\d|\.)+/gi, Gb = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, sa = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, am = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Wb = /[+-]=-?[.\d]+/, qb = /[^,'"\[\]\s]+/gi, G3 = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, $n = {}, Sd = {}, Zb = function(e) {
            return (Sd = Uo(e, $n)) && zn
        }, cm = function(e, n) {
            return console.warn("Invalid property", e, "set to", n, "Missing plugin? gsap.registerPlugin()")
        }, Td = function(e, n) {
            return !n && console.warn(e)
        }, Qb = function(e, n) {
            return e && ($n[e] = n) && Sd && (Sd[e] = n) || $n
        }, Hu = function() {
            return 0
        }, W3 = {
            suppressEvents: !0,
            isStart: !0,
            kill: !1
        }, Id = {
            suppressEvents: !0,
            kill: !1
        }, q3 = {
            suppressEvents: !0
        }, dm = {}, eo = [], fm = {}, Un = {}, hm = {}, Xb = 30, Md = [], pm = "", gm = function(e) {
            var r, i, n = e[0];
            if (Qr(n) || Je(n) || (e = [e]),
            !(r = (n._gsap || {}).harness)) {
                for (i = Md.length; i-- && !Md[i].targetTest(n); )
                    ;
                r = Md[i]
            }
            for (i = e.length; i--; )
                e[i] && (e[i]._gsap || (e[i]._gsap = new SS(e[i],r))) || e.splice(i, 1);
            return e
        }, $o = function(e) {
            return e._gsap || gm(cr(e))[0]._gsap
        }, Jb = function(e, n, r) {
            return (r = e[n]) && Je(r) ? e[n]() : om(r) && e.getAttribute && e.getAttribute(n) || r
        }, Tn = function(e, n) {
            return (e = e.split(",")).forEach(n) || e
        }, lt = function(e) {
            return Math.round(1e5 * e) / 1e5 || 0
        }, Bt = function(e) {
            return Math.round(1e7 * e) / 1e7 || 0
        }, aa = function(e, n) {
            var r = n.charAt(0)
              , i = parseFloat(n.substr(2));
            return e = parseFloat(e),
            "+" === r ? e + i : "-" === r ? e - i : "*" === r ? e * i : e / i
        }, Y3 = function(e, n) {
            for (var r = n.length, i = 0; e.indexOf(n[i]) < 0 && ++i < r; )
                ;
            return i < r
        }, xd = function() {
            var r, i, e = eo.length, n = eo.slice(0);
            for (fm = {},
            eo.length = 0,
            r = 0; r < e; r++)
                (i = n[r]) && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0)
        }, eS = function(e, n, r, i) {
            eo.length && !Yt && xd(),
            e.render(n, r, i || Yt && n < 0 && (e._initted || e._startAt)),
            eo.length && !Yt && xd()
        }, tS = function(e) {
            var n = parseFloat(e);
            return (n || 0 === n) && (e + "").match(qb).length < 2 ? n : At(e) ? e.trim() : e
        }, nS = function(e) {
            return e
        }, ur = function(e, n) {
            for (var r in n)
                r in e || (e[r] = n[r]);
            return e
        }, Uo = function(e, n) {
            for (var r in n)
                e[r] = n[r];
            return e
        }, rS = function t(e, n) {
            for (var r in n)
                "__proto__" !== r && "constructor" !== r && "prototype" !== r && (e[r] = Qr(n[r]) ? t(e[r] || (e[r] = {}), n[r]) : n[r]);
            return e
        }, Ad = function(e, n) {
            var i, r = {};
            for (i in e)
                i in n || (r[i] = e[i]);
            return r
        }, zu = function(e) {
            var n = e.parent || qe
              , r = e.keyframes ? function(e) {
                return function(n, r) {
                    for (var i in r)
                        i in n || "duration" === i && e || "ease" === i || (n[i] = r[i])
                }
            }(Zt(e.keyframes)) : ur;
            if (Sn(e.inherit))
                for (; n; )
                    r(e, n.vars.defaults),
                    n = n.parent || n._dp;
            return e
        }, iS = function(e, n, r, i, o) {
            void 0 === r && (r = "_first"),
            void 0 === i && (i = "_last");
            var a, s = e[i];
            if (o)
                for (a = n[o]; s && s[o] > a; )
                    s = s._prev;
            return s ? (n._next = s._next,
            s._next = n) : (n._next = e[r],
            e[r] = n),
            n._next ? n._next._prev = n : e[i] = n,
            n._prev = s,
            n.parent = n._dp = e,
            n
        }, Fd = function(e, n, r, i) {
            void 0 === r && (r = "_first"),
            void 0 === i && (i = "_last");
            var o = n._prev
              , s = n._next;
            o ? o._next = s : e[r] === n && (e[r] = s),
            s ? s._prev = o : e[i] === n && (e[i] = o),
            n._next = n._prev = n.parent = null
        }, to = function(e, n) {
            e.parent && (!n || e.parent.autoRemoveChildren) && e.parent.remove(e),
            e._act = 0
        }, Ho = function(e, n) {
            if (e && (!n || n._end > e._dur || n._start < 0))
                for (var r = e; r; )
                    r._dirty = 1,
                    r = r.parent;
            return e
        }, K3 = function(e) {
            for (var n = e.parent; n && n.parent; )
                n._dirty = 1,
                n.totalDuration(),
                n = n.parent;
            return e
        }, mm = function(e, n, r, i) {
            return e._startAt && (Yt ? e._startAt.revert(Id) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(n, !0, i))
        }, X3 = function t(e) {
            return !e || e._ts && t(e.parent)
        }, oS = function(e) {
            return e._repeat ? ua(e._tTime, e = e.duration() + e._rDelay) * e : 0
        }, ua = function(e, n) {
            var r = Math.floor(e /= n);
            return e && r === e ? r - 1 : r
        }, Rd = function(e, n) {
            return (e - n._start) * n._ts + (n._ts >= 0 ? 0 : n._dirty ? n.totalDuration() : n._tDur)
        }, Pd = function(e) {
            return e._end = Bt(e._start + (e._tDur / Math.abs(e._ts || e._rts || Oe) || 0))
        }, Od = function(e, n) {
            var r = e._dp;
            return r && r.smoothChildTiming && e._ts && (e._start = Bt(r._time - (e._ts > 0 ? n / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - n) / -e._ts)),
            Pd(e),
            r._dirty || Ho(r, e)),
            e
        }, sS = function(e, n) {
            var r;
            if ((n._time || n._initted && !n._dur) && (r = Rd(e.rawTime(), n),
            (!n._dur || Wu(0, n.totalDuration(), r) - n._tTime > Oe) && n.render(r, !0)),
            Ho(e, n)._dp && e._initted && e._time >= e._dur && e._ts) {
                if (e._dur < e.duration())
                    for (r = e; r._dp; )
                        r.rawTime() >= 0 && r.totalTime(r._tTime),
                        r = r._dp;
                e._zTime = -Oe
            }
        }, Kr = function(e, n, r, i) {
            return n.parent && to(n),
            n._start = Bt((xi(r) ? r : r || e !== qe ? lr(e, r, n) : e._time) + n._delay),
            n._end = Bt(n._start + (n.totalDuration() / Math.abs(n.timeScale()) || 0)),
            iS(e, n, "_first", "_last", e._sort ? "_start" : 0),
            Dm(n) || (e._recent = n),
            i || sS(e, n),
            e._ts < 0 && Od(e, e._tTime),
            e
        }, aS = function(e, n) {
            return ($n.ScrollTrigger || cm("scrollTrigger", n)) && $n.ScrollTrigger.create(n, e)
        }, uS = function(e, n, r, i, o) {
            return Tm(e, n, o),
            e._initted ? !r && e._pt && !Yt && (e._dur && !1 !== e.vars.lazy || !e._dur && e.vars.lazy) && Kb !== Hn.frame ? (eo.push(e),
            e._lazy = [o, i],
            1) : void 0 : 1
        }, J3 = function t(e) {
            var n = e.parent;
            return n && n._ts && n._initted && !n._lock && (n.rawTime() < 0 || t(n))
        }, Dm = function(e) {
            var n = e.data;
            return "isFromStart" === n || "isStart" === n
        }, la = function(e, n, r, i) {
            var o = e._repeat
              , s = Bt(n) || 0
              , a = e._tTime / e._tDur;
            return a && !i && (e._time *= s / e._dur),
            e._dur = s,
            e._tDur = o ? o < 0 ? 1e10 : Bt(s * (o + 1) + e._rDelay * o) : s,
            a > 0 && !i && Od(e, e._tTime = e._tDur * a),
            e.parent && Pd(e),
            r || Ho(e.parent, e),
            e
        }, lS = function(e) {
            return e instanceof In ? Ho(e) : la(e, e._dur)
        }, nj = {
            _start: 0,
            endTime: Hu,
            totalDuration: Hu
        }, lr = function t(e, n, r) {
            var a, u, l, i = e.labels, o = e._recent || nj, s = e.duration() >= sr ? o.endTime(!1) : e._dur;
            return At(n) && (isNaN(n) || n in i) ? (u = n.charAt(0),
            l = "%" === n.substr(-1),
            a = n.indexOf("="),
            "<" === u || ">" === u ? (a >= 0 && (n = n.replace(/=/, "")),
            ("<" === u ? o._start : o.endTime(o._repeat >= 0)) + (parseFloat(n.substr(1)) || 0) * (l ? (a < 0 ? o : r).totalDuration() / 100 : 1)) : a < 0 ? (n in i || (i[n] = s),
            i[n]) : (u = parseFloat(n.charAt(a - 1) + n.substr(a + 1)),
            l && r && (u = u / 100 * (Zt(r) ? r[0] : r).totalDuration()),
            a > 1 ? t(e, n.substr(0, a - 1), r) + u : s + u)) : null == n ? s : +n
        }, Gu = function(e, n, r) {
            var a, u, i = xi(n[1]), o = (i ? 2 : 1) + (e < 2 ? 0 : 1), s = n[o];
            if (i && (s.duration = n[1]),
            s.parent = r,
            e) {
                for (a = s,
                u = r; u && !("immediateRender"in a); )
                    a = u.vars.defaults || {},
                    u = Sn(u.vars.inherit) && u.parent;
                s.immediateRender = Sn(a.immediateRender),
                e < 2 ? s.runBackwards = 1 : s.startAt = n[o - 1]
            }
            return new St(n[0],s,n[o + 1])
        }, no = function(e, n) {
            return e || 0 === e ? n(e) : n
        }, Wu = function(e, n, r) {
            return r < e ? e : r > n ? n : r
        }, Qt = function(e, n) {
            return At(e) && (n = G3.exec(e)) ? n[1] : ""
        }, _m = [].slice, cS = function(e, n) {
            return e && Qr(e) && "length"in e && (!n && !e.length || e.length - 1 in e && Qr(e[0])) && !e.nodeType && e !== ar
        }, cr = function(e, n, r) {
            return gt && !n && gt.selector ? gt.selector(e) : !At(e) || r || !um && da() ? Zt(e) ? function(e, n, r) {
                return void 0 === r && (r = []),
                e.forEach(function(i) {
                    var o;
                    return At(i) && !n || cS(i, 1) ? (o = r).push.apply(o, cr(i)) : r.push(i)
                }) || r
            }(e, r) : cS(e) ? _m.call(e, 0) : e ? [e] : [] : _m.call((n || lm).querySelectorAll(e), 0)
        }, ym = function(e) {
            return e = cr(e)[0] || Td("Invalid scope") || {},
            function(n) {
                var r = e.current || e.nativeElement || e;
                return cr(n, r.querySelectorAll ? r : r === e ? Td("Invalid scope") || lm.createElement("div") : e)
            }
        }, dS = function(e) {
            return e.sort(function() {
                return .5 - Math.random()
            })
        }, fS = function(e) {
            if (Je(e))
                return e;
            var n = Qr(e) ? e : {
                each: e
            }
              , r = zo(n.ease)
              , i = n.from || 0
              , o = parseFloat(n.base) || 0
              , s = {}
              , a = i > 0 && i < 1
              , u = isNaN(i) || a
              , l = n.axis
              , c = i
              , d = i;
            return At(i) ? c = d = {
                center: .5,
                edges: .5,
                end: 1
            }[i] || 0 : !a && u && (c = i[0],
            d = i[1]),
            function(f, h, p) {
                var _, y, D, v, w, S, E, x, M, g = (p || n).length, m = s[g];
                if (!m) {
                    if (!(M = "auto" === n.grid ? 0 : (n.grid || [1, sr])[1])) {
                        for (E = -sr; E < (E = p[M++].getBoundingClientRect().left) && M < g; )
                            ;
                        M--
                    }
                    for (m = s[g] = [],
                    _ = u ? Math.min(M, g) * c - .5 : i % M,
                    y = M === sr ? 0 : u ? g * d / M - .5 : i / M | 0,
                    E = 0,
                    x = sr,
                    S = 0; S < g; S++)
                        D = S % M - _,
                        v = y - (S / M | 0),
                        m[S] = w = l ? Math.abs("y" === l ? v : D) : Ub(D * D + v * v),
                        w > E && (E = w),
                        w < x && (x = w);
                    "random" === i && dS(m),
                    m.max = E - x,
                    m.min = x,
                    m.v = g = (parseFloat(n.amount) || parseFloat(n.each) * (M > g ? g - 1 : l ? "y" === l ? g / M : M : Math.max(M, g / M)) || 0) * ("edges" === i ? -1 : 1),
                    m.b = g < 0 ? o - g : o,
                    m.u = Qt(n.amount || n.each) || 0,
                    r = r && g < 0 ? wS(r) : r
                }
                return g = (m[f] - m.min) / m.max || 0,
                Bt(m.b + (r ? r(g) : g) * m.v) + m.u
            }
        }, vm = function(e) {
            var n = Math.pow(10, ((e + "").split(".")[1] || "").length);
            return function(r) {
                var i = Bt(Math.round(parseFloat(r) / e) * e * n);
                return (i - i % 1) / n + (xi(r) ? 0 : Qt(r))
            }
        }, hS = function(e, n) {
            var i, o, r = Zt(e);
            return !r && Qr(e) && (i = r = e.radius || sr,
            e.values ? (e = cr(e.values),
            (o = !xi(e[0])) && (i *= i)) : e = vm(e.increment)),
            no(n, r ? Je(e) ? function(s) {
                return o = e(s),
                Math.abs(o - s) <= i ? o : s
            }
            : function(s) {
                for (var f, h, a = parseFloat(o ? s.x : s), u = parseFloat(o ? s.y : 0), l = sr, c = 0, d = e.length; d--; )
                    (f = o ? (f = e[d].x - a) * f + (h = e[d].y - u) * h : Math.abs(e[d] - a)) < l && (l = f,
                    c = d);
                return c = !i || l <= i ? e[c] : s,
                o || c === s || xi(s) ? c : c + Qt(s)
            }
            : vm(e))
        }, pS = function(e, n, r, i) {
            return no(Zt(e) ? !n : !0 === r ? !!(r = 0) : !i, function() {
                return Zt(e) ? e[~~(Math.random() * e.length)] : (r = r || 1e-5) && (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((e - r / 2 + Math.random() * (n - e + .99 * r)) / r) * r * i) / i
            })
        }, gS = function(e, n, r) {
            return no(r, function(i) {
                return e[~~n(i)]
            })
        }, qu = function(e) {
            for (var i, o, s, a, n = 0, r = ""; ~(i = e.indexOf("random(", n)); )
                s = e.indexOf(")", i),
                a = "[" === e.charAt(i + 7),
                o = e.substr(i + 7, s - i - 7).match(a ? qb : sm),
                r += e.substr(n, i - n) + pS(a ? o : +o[0], a ? 0 : +o[1], +o[2] || 1e-5),
                n = s + 1;
            return r + e.substr(n, e.length - n)
        }, mS = function(e, n, r, i, o) {
            var s = n - e
              , a = i - r;
            return no(o, function(u) {
                return r + ((u - e) / s * a || 0)
            })
        }, DS = function(e, n, r) {
            var s, a, u, i = e.labels, o = sr;
            for (s in i)
                (a = i[s] - n) < 0 == !!r && a && o > (a = Math.abs(a)) && (u = s,
                o = a);
            return u
        }, dr = function(e, n, r) {
            var u, l, c, i = e.vars, o = i[n], s = gt, a = e._ctx;
            if (o)
                return u = i[n + "Params"],
                l = i.callbackScope || e,
                r && eo.length && xd(),
                a && (gt = a),
                c = u ? o.apply(l, u) : o.call(l),
                gt = s,
                c
        }, Yu = function(e) {
            return to(e),
            e.scrollTrigger && e.scrollTrigger.kill(!!Yt),
            e.progress() < 1 && dr(e, "onInterrupt"),
            e
        }, dj = function(e) {
            var n = (e = !e.name && e.default || e).name
              , r = Je(e)
              , i = n && !r && e.init ? function() {
                this._props = []
            }
            : e
              , o = {
                init: Hu,
                render: xm,
                add: bm,
                kill: Ij,
                modifier: Tj,
                rawVars: 0
            }
              , s = {
                targetTest: 0,
                get: 0,
                getSetter: Mm,
                aliases: {},
                register: 0
            };
            if (da(),
            e !== i) {
                if (Un[n])
                    return;
                ur(i, ur(Ad(e, o), s)),
                Uo(i.prototype, Uo(o, Ad(e, s))),
                Un[i.prop = n] = i,
                e.targetTest && (Md.push(i),
                dm[n] = 1),
                n = ("css" === n ? "CSS" : n.charAt(0).toUpperCase() + n.substr(1)) + "Plugin"
            }
            Qb(n, i),
            e.register && e.register(zn, i, Mn)
        }, Ne = 255, Zu = {
            aqua: [0, Ne, Ne],
            lime: [0, Ne, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, Ne],
            navy: [0, 0, 128],
            white: [Ne, Ne, Ne],
            olive: [128, 128, 0],
            yellow: [Ne, Ne, 0],
            orange: [Ne, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [Ne, 0, 0],
            pink: [Ne, 192, 203],
            cyan: [0, Ne, Ne],
            transparent: [Ne, Ne, Ne, 0]
        }, Cm = function(e, n, r) {
            return (6 * (e += e < 0 ? 1 : e > 1 ? -1 : 0) < 1 ? n + (r - n) * e * 6 : e < .5 ? r : 3 * e < 2 ? n + (r - n) * (2 / 3 - e) * 6 : n) * Ne + .5 | 0
        }, _S = function(e, n, r) {
            var o, s, a, u, l, c, d, f, h, p, i = e ? xi(e) ? [e >> 16, e >> 8 & Ne, e & Ne] : 0 : Zu.black;
            if (!i) {
                if ("," === e.substr(-1) && (e = e.substr(0, e.length - 1)),
                Zu[e])
                    i = Zu[e];
                else if ("#" === e.charAt(0)) {
                    if (e.length < 6 && (o = e.charAt(1),
                    s = e.charAt(2),
                    a = e.charAt(3),
                    e = "#" + o + o + s + s + a + a + (5 === e.length ? e.charAt(4) + e.charAt(4) : "")),
                    9 === e.length)
                        return [(i = parseInt(e.substr(1, 6), 16)) >> 16, i >> 8 & Ne, i & Ne, parseInt(e.substr(7), 16) / 255];
                    i = [(e = parseInt(e.substr(1), 16)) >> 16, e >> 8 & Ne, e & Ne]
                } else if ("hsl" === e.substr(0, 3))
                    if (i = p = e.match(sm),
                    n) {
                        if (~e.indexOf("="))
                            return i = e.match(Gb),
                            r && i.length < 4 && (i[3] = 1),
                            i
                    } else
                        u = +i[0] % 360 / 360,
                        l = +i[1] / 100,
                        o = 2 * (c = +i[2] / 100) - (s = c <= .5 ? c * (l + 1) : c + l - c * l),
                        i.length > 3 && (i[3] *= 1),
                        i[0] = Cm(u + 1 / 3, o, s),
                        i[1] = Cm(u, o, s),
                        i[2] = Cm(u - 1 / 3, o, s);
                else
                    i = e.match(sm) || Zu.transparent;
                i = i.map(Number)
            }
            return n && !p && (o = i[0] / Ne,
            s = i[1] / Ne,
            a = i[2] / Ne,
            c = ((d = Math.max(o, s, a)) + (f = Math.min(o, s, a))) / 2,
            d === f ? u = l = 0 : (h = d - f,
            l = c > .5 ? h / (2 - d - f) : h / (d + f),
            u = d === o ? (s - a) / h + (s < a ? 6 : 0) : d === s ? (a - o) / h + 2 : (o - s) / h + 4,
            u *= 60),
            i[0] = ~~(u + .5),
            i[1] = ~~(100 * l + .5),
            i[2] = ~~(100 * c + .5)),
            r && i.length < 4 && (i[3] = 1),
            i
        }, yS = function(e) {
            var n = []
              , r = []
              , i = -1;
            return e.split(ro).forEach(function(o) {
                var s = o.match(sa) || [];
                n.push.apply(n, s),
                r.push(i += s.length + 1)
            }),
            n.c = r,
            n
        }, vS = function(e, n, r) {
            var u, l, c, d, i = "", o = (e + i).match(ro), s = n ? "hsla(" : "rgba(", a = 0;
            if (!o)
                return e;
            if (o = o.map(function(f) {
                return (f = _S(f, n, 1)) && s + (n ? f[0] + "," + f[1] + "%," + f[2] + "%," + f[3] : f.join(",")) + ")"
            }),
            r && (c = yS(e),
            (u = r.c).join(i) !== c.c.join(i)))
                for (d = (l = e.replace(ro, "1").split(sa)).length - 1; a < d; a++)
                    i += l[a] + (~u.indexOf(a) ? o.shift() || s + "0,0,0,0)" : (c.length ? c : o.length ? o : r).shift());
            if (!l)
                for (d = (l = e.split(ro)).length - 1; a < d; a++)
                    i += l[a] + o[a];
            return i + l[d]
        }, ro = function() {
            var e, t = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
            for (e in Zu)
                t += "|" + e + "\\b";
            return new RegExp(t + ")","gi")
        }(), fj = /hsl[a]?\(/, CS = function(e) {
            var r, n = e.join(" ");
            if (ro.lastIndex = 0,
            ro.test(n))
                return r = fj.test(n),
                e[1] = vS(e[1], r),
                e[0] = vS(e[0], r, yS(e[1])),
                !0
        }, Hn = (t = Date.now,
        e = 500,
        n = 33,
        r = t(),
        i = r,
        s = o = 1e3 / 240,
        p = function g(m) {
            var D, v, w, S, _ = t() - i, y = !0 === m;
            if (_ > e && (r += _ - n),
            ((D = (w = (i += _) - r) - s) > 0 || y) && (S = ++d.frame,
            f = w - 1e3 * d.time,
            d.time = w /= 1e3,
            s += D + (D >= o ? 4 : o - D),
            v = 1),
            y || (u = l(g)),
            v)
                for (h = 0; h < a.length; h++)
                    a[h](w, f, S, m)
        }
        ,
        d = {
            time: 0,
            frame: 0,
            tick: function() {
                p(!0)
            },
            deltaRatio: function(m) {
                return f / (1e3 / (m || 60))
            },
            wake: function() {
                Yb && (!um && Hb() && (ar = um = window,
                lm = ar.document || {},
                $n.gsap = zn,
                (ar.gsapVersions || (ar.gsapVersions = [])).push(zn.version),
                Zb(Sd || ar.GreenSockGlobals || !ar.gsap && ar || {}),
                c = ar.requestAnimationFrame),
                u && d.sleep(),
                l = c || function(m) {
                    return setTimeout(m, s - 1e3 * d.time + 1 | 0)
                }
                ,
                Qu = 1,
                p(2))
            },
            sleep: function() {
                (c ? ar.cancelAnimationFrame : clearTimeout)(u),
                Qu = 0,
                l = Hu
            },
            lagSmoothing: function(m, _) {
                e = m || 1 / 0,
                n = Math.min(_ || 33, e)
            },
            fps: function(m) {
                s = 1e3 * d.time + (o = 1e3 / (m || 240))
            },
            add: function(m, _, y) {
                var D = _ ? function(v, w, S, E) {
                    m(v, w, S, E),
                    d.remove(D)
                }
                : m;
                return d.remove(m),
                a[y ? "unshift" : "push"](D),
                da(),
                D
            },
            remove: function(m, _) {
                ~(_ = a.indexOf(m)) && a.splice(_, 1) && h >= _ && h--
            },
            _listeners: a = []
        }), da = function() {
            return !Qu && Hn.wake()
        }, _e = {}, hj = /^[\d.\-M][\d.\-,\s]/, pj = /["']/g, gj = function(e) {
            for (var a, u, l, n = {}, r = e.substr(1, e.length - 3).split(":"), i = r[0], o = 1, s = r.length; o < s; o++)
                u = r[o],
                a = o !== s - 1 ? u.lastIndexOf(",") : u.length,
                l = u.substr(0, a),
                n[i] = isNaN(l) ? l.replace(pj, "").trim() : +l,
                i = u.substr(a + 1).trim();
            return n
        }, wS = function(e) {
            return function(n) {
                return 1 - e(1 - n)
            }
        }, ES = function t(e, n) {
            for (var i, r = e._first; r; )
                r instanceof In ? t(r, n) : r.vars.yoyoEase && (!r._yoyo || !r._repeat) && r._yoyo !== n && (r.timeline ? t(r.timeline, n) : (i = r._ease,
                r._ease = r._yEase,
                r._yEase = i,
                r._yoyo = n)),
                r = r._next
        }, zo = function(e, n) {
            return e && (Je(e) ? e : _e[e] || function(e) {
                var n = (e + "").split("(")
                  , r = _e[n[0]];
                return r && n.length > 1 && r.config ? r.config.apply(null, ~e.indexOf("{") ? [gj(n[1])] : function(e) {
                    var n = e.indexOf("(") + 1
                      , r = e.indexOf(")")
                      , i = e.indexOf("(", n);
                    return e.substring(n, ~i && i < r ? e.indexOf(")", r + 1) : r)
                }(e).split(",").map(tS)) : _e._CE && hj.test(e) ? _e._CE("", e) : r
            }(e)) || n
        }, Go = function(e, n, r, i) {
            void 0 === r && (r = function(u) {
                return 1 - n(1 - u)
            }
            ),
            void 0 === i && (i = function(u) {
                return u < .5 ? n(2 * u) / 2 : 1 - n(2 * (1 - u)) / 2
            }
            );
            var s, o = {
                easeIn: n,
                easeOut: r,
                easeInOut: i
            };
            return Tn(e, function(a) {
                for (var u in _e[a] = $n[a] = o,
                _e[s = a.toLowerCase()] = r,
                o)
                    _e[s + ("easeIn" === u ? ".in" : "easeOut" === u ? ".out" : ".inOut")] = _e[a + "." + u] = o[u]
            }),
            o
        }, bS = function(e) {
            return function(n) {
                return n < .5 ? (1 - e(1 - 2 * n)) / 2 : .5 + e(2 * (n - .5)) / 2
            }
        }, wm = function t(e, n, r) {
            var i = n >= 1 ? n : 1
              , o = (r || (e ? .3 : .45)) / (n < 1 ? n : 1)
              , s = o / im * (Math.asin(1 / i) || 0)
              , a = function(c) {
                return 1 === c ? 1 : i * Math.pow(2, -10 * c) * z3((c - s) * o) + 1
            }
              , u = "out" === e ? a : "in" === e ? function(l) {
                return 1 - a(1 - l)
            }
            : bS(a);
            return o = im / o,
            u.config = function(l, c) {
                return t(e, l, c)
            }
            ,
            u
        }, Em = function t(e, n) {
            void 0 === n && (n = 1.70158);
            var r = function(s) {
                return s ? --s * s * ((n + 1) * s + n) + 1 : 0
            }
              , i = "out" === e ? r : "in" === e ? function(o) {
                return 1 - r(1 - o)
            }
            : bS(r);
            return i.config = function(o) {
                return t(e, o)
            }
            ,
            i
        };
        Tn("Linear,Quad,Cubic,Quart,Quint,Strong", function(t, e) {
            var n = e < 5 ? e + 1 : e;
            Go(t + ",Power" + (n - 1), e ? function(r) {
                return Math.pow(r, n)
            }
            : function(r) {
                return r
            }
            , function(r) {
                return 1 - Math.pow(1 - r, n)
            }, function(r) {
                return r < .5 ? Math.pow(2 * r, n) / 2 : 1 - Math.pow(2 * (1 - r), n) / 2
            })
        }),
        _e.Linear.easeNone = _e.none = _e.Linear.easeIn,
        Go("Elastic", wm("in"), wm("out"), wm()),
        function(t, e) {
            var o = function(a) {
                return a < .36363636363636365 ? t * a * a : a < .7272727272727273 ? t * Math.pow(a - 1.5 / e, 2) + .75 : a < .9090909090909092 ? t * (a -= 2.25 / e) * a + .9375 : t * Math.pow(a - 2.625 / e, 2) + .984375
            };
            Go("Bounce", function(s) {
                return 1 - o(1 - s)
            }, o)
        }(7.5625, 2.75),
        Go("Expo", function(t) {
            return t ? Math.pow(2, 10 * (t - 1)) : 0
        }),
        Go("Circ", function(t) {
            return -(Ub(1 - t * t) - 1)
        }),
        Go("Sine", function(t) {
            return 1 === t ? 1 : 1 - H3(t * $3)
        }),
        Go("Back", Em("in"), Em("out"), Em()),
        _e.SteppedEase = _e.steps = $n.SteppedEase = {
            config: function(e, n) {
                void 0 === e && (e = 1);
                var r = 1 / e
                  , i = e + (n ? 0 : 1)
                  , o = n ? 1 : 0
                  , s = 1 - Oe;
                return function(a) {
                    return ((i * Wu(0, s, a) | 0) + o) * r
                }
            }
        },
        oa.ease = _e["quad.out"],
        Tn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(t) {
            return pm += t + "," + t + "Params,"
        });
        var SS = function(e, n) {
            this.id = U3++,
            e._gsap = this,
            this.target = e,
            this.harness = n,
            this.get = n ? n.get : Jb,
            this.set = n ? n.getSetter : Mm
        }
          , fa = function() {
            function t(n) {
                this.vars = n,
                this._delay = +n.delay || 0,
                (this._repeat = n.repeat === 1 / 0 ? -2 : n.repeat || 0) && (this._rDelay = n.repeatDelay || 0,
                this._yoyo = !!n.yoyo || !!n.yoyoEase),
                this._ts = 1,
                la(this, +n.duration, 1, 1),
                this.data = n.data,
                gt && (this._ctx = gt,
                gt.data.push(this)),
                Qu || Hn.wake()
            }
            var e = t.prototype;
            return e.delay = function(r) {
                return r || 0 === r ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + r - this._delay),
                this._delay = r,
                this) : this._delay
            }
            ,
            e.duration = function(r) {
                return arguments.length ? this.totalDuration(this._repeat > 0 ? r + (r + this._rDelay) * this._repeat : r) : this.totalDuration() && this._dur
            }
            ,
            e.totalDuration = function(r) {
                return arguments.length ? (this._dirty = 0,
                la(this, this._repeat < 0 ? r : (r - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
            }
            ,
            e.totalTime = function(r, i) {
                if (da(),
                !arguments.length)
                    return this._tTime;
                var o = this._dp;
                if (o && o.smoothChildTiming && this._ts) {
                    for (Od(this, r),
                    !o._dp || o.parent || sS(o, this); o && o.parent; )
                        o.parent._time !== o._start + (o._ts >= 0 ? o._tTime / o._ts : (o.totalDuration() - o._tTime) / -o._ts) && o.totalTime(o._tTime, !0),
                        o = o.parent;
                    !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && r < this._tDur || this._ts < 0 && r > 0 || !this._tDur && !r) && Kr(this._dp, this, this._start - this._delay)
                }
                return (this._tTime !== r || !this._dur && !i || this._initted && Math.abs(this._zTime) === Oe || !r && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = r),
                eS(this, r, i)),
                this
            }
            ,
            e.time = function(r, i) {
                return arguments.length ? this.totalTime(Math.min(this.totalDuration(), r + oS(this)) % (this._dur + this._rDelay) || (r ? this._dur : 0), i) : this._time
            }
            ,
            e.totalProgress = function(r, i) {
                return arguments.length ? this.totalTime(this.totalDuration() * r, i) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio
            }
            ,
            e.progress = function(r, i) {
                return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? r : 1 - r) + oS(this), i) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio
            }
            ,
            e.iteration = function(r, i) {
                var o = this.duration() + this._rDelay;
                return arguments.length ? this.totalTime(this._time + (r - 1) * o, i) : this._repeat ? ua(this._tTime, o) + 1 : 1
            }
            ,
            e.timeScale = function(r) {
                if (!arguments.length)
                    return this._rts === -Oe ? 0 : this._rts;
                if (this._rts === r)
                    return this;
                var i = this.parent && this._ts ? Rd(this.parent._time, this) : this._tTime;
                return this._rts = +r || 0,
                this._ts = this._ps || r === -Oe ? 0 : this._rts,
                this.totalTime(Wu(-this._delay, this._tDur, i), !0),
                Pd(this),
                K3(this)
            }
            ,
            e.paused = function(r) {
                return arguments.length ? (this._ps !== r && (this._ps = r,
                r ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()),
                this._ts = this._act = 0) : (da(),
                this._ts = this._rts,
                this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && Math.abs(this._zTime) !== Oe && (this._tTime -= Oe)))),
                this) : this._ps
            }
            ,
            e.startTime = function(r) {
                if (arguments.length) {
                    this._start = r;
                    var i = this.parent || this._dp;
                    return i && (i._sort || !this.parent) && Kr(i, this, r - this._delay),
                    this
                }
                return this._start
            }
            ,
            e.endTime = function(r) {
                return this._start + (Sn(r) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
            }
            ,
            e.rawTime = function(r) {
                var i = this.parent || this._dp;
                return i ? r && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Rd(i.rawTime(r), this) : this._tTime : this._tTime
            }
            ,
            e.revert = function(r) {
                void 0 === r && (r = q3);
                var i = Yt;
                return Yt = r,
                (this._initted || this._startAt) && (this.timeline && this.timeline.revert(r),
                this.totalTime(-.01, r.suppressEvents)),
                "nested" !== this.data && !1 !== r.kill && this.kill(),
                Yt = i,
                this
            }
            ,
            e.globalTime = function(r) {
                for (var i = this, o = arguments.length ? r : i.rawTime(); i; )
                    o = i._start + o / (i._ts || 1),
                    i = i._dp;
                return !this.parent && this._sat ? this._sat.vars.immediateRender ? -1 : this._sat.globalTime(r) : o
            }
            ,
            e.repeat = function(r) {
                return arguments.length ? (this._repeat = r === 1 / 0 ? -2 : r,
                lS(this)) : -2 === this._repeat ? 1 / 0 : this._repeat
            }
            ,
            e.repeatDelay = function(r) {
                if (arguments.length) {
                    var i = this._time;
                    return this._rDelay = r,
                    lS(this),
                    i ? this.time(i) : this
                }
                return this._rDelay
            }
            ,
            e.yoyo = function(r) {
                return arguments.length ? (this._yoyo = r,
                this) : this._yoyo
            }
            ,
            e.seek = function(r, i) {
                return this.totalTime(lr(this, r), Sn(i))
            }
            ,
            e.restart = function(r, i) {
                return this.play().totalTime(r ? -this._delay : 0, Sn(i))
            }
            ,
            e.play = function(r, i) {
                return null != r && this.seek(r, i),
                this.reversed(!1).paused(!1)
            }
            ,
            e.reverse = function(r, i) {
                return null != r && this.seek(r || this.totalDuration(), i),
                this.reversed(!0).paused(!1)
            }
            ,
            e.pause = function(r, i) {
                return null != r && this.seek(r, i),
                this.paused(!0)
            }
            ,
            e.resume = function() {
                return this.paused(!1)
            }
            ,
            e.reversed = function(r) {
                return arguments.length ? (!!r !== this.reversed() && this.timeScale(-this._rts || (r ? -Oe : 0)),
                this) : this._rts < 0
            }
            ,
            e.invalidate = function() {
                return this._initted = this._act = 0,
                this._zTime = -Oe,
                this
            }
            ,
            e.isActive = function() {
                var o, r = this.parent || this._dp, i = this._start;
                return !(r && !(this._ts && this._initted && r.isActive() && (o = r.rawTime(!0)) >= i && o < this.endTime(!0) - Oe))
            }
            ,
            e.eventCallback = function(r, i, o) {
                var s = this.vars;
                return arguments.length > 1 ? (i ? (s[r] = i,
                o && (s[r + "Params"] = o),
                "onUpdate" === r && (this._onUpdate = i)) : delete s[r],
                this) : s[r]
            }
            ,
            e.then = function(r) {
                var i = this;
                return new Promise(function(o) {
                    var s = Je(r) ? r : nS
                      , a = function() {
                        var l = i.then;
                        i.then = null,
                        Je(s) && (s = s(i)) && (s.then || s === i) && (i.then = l),
                        o(s),
                        i.then = l
                    };
                    i._initted && 1 === i.totalProgress() && i._ts >= 0 || !i._tTime && i._ts < 0 ? a() : i._prom = a
                }
                )
            }
            ,
            e.kill = function() {
                Yu(this)
            }
            ,
            t
        }();
        ur(fa.prototype, {
            _time: 0,
            _start: 0,
            _end: 0,
            _tTime: 0,
            _tDur: 0,
            _dirty: 0,
            _repeat: 0,
            _yoyo: !1,
            parent: null,
            _initted: !1,
            _rDelay: 0,
            _ts: 1,
            _dp: 0,
            ratio: 0,
            _zTime: -Oe,
            _prom: 0,
            _ps: !1,
            _rts: 1
        });
        var In = function(t) {
            function e(r, i) {
                var o;
                return void 0 === r && (r = {}),
                (o = t.call(this, r) || this).labels = {},
                o.smoothChildTiming = !!r.smoothChildTiming,
                o.autoRemoveChildren = !!r.autoRemoveChildren,
                o._sort = Sn(r.sortChildren),
                qe && Kr(r.parent || qe, Mi(o), i),
                r.reversed && o.reverse(),
                r.paused && o.paused(!0),
                r.scrollTrigger && aS(Mi(o), r.scrollTrigger),
                o
            }
            $b(e, t);
            var n = e.prototype;
            return n.to = function(i, o, s) {
                return Gu(0, arguments, this),
                this
            }
            ,
            n.from = function(i, o, s) {
                return Gu(1, arguments, this),
                this
            }
            ,
            n.fromTo = function(i, o, s, a) {
                return Gu(2, arguments, this),
                this
            }
            ,
            n.set = function(i, o, s) {
                return o.duration = 0,
                o.parent = this,
                zu(o).repeatDelay || (o.repeat = 0),
                o.immediateRender = !!o.immediateRender,
                new St(i,o,lr(this, s),1),
                this
            }
            ,
            n.call = function(i, o, s) {
                return Kr(this, St.delayedCall(0, i, o), s)
            }
            ,
            n.staggerTo = function(i, o, s, a, u, l, c) {
                return s.duration = o,
                s.stagger = s.stagger || a,
                s.onComplete = l,
                s.onCompleteParams = c,
                s.parent = this,
                new St(i,s,lr(this, u)),
                this
            }
            ,
            n.staggerFrom = function(i, o, s, a, u, l, c) {
                return s.runBackwards = 1,
                zu(s).immediateRender = Sn(s.immediateRender),
                this.staggerTo(i, o, s, a, u, l, c)
            }
            ,
            n.staggerFromTo = function(i, o, s, a, u, l, c, d) {
                return a.startAt = s,
                zu(a).immediateRender = Sn(a.immediateRender),
                this.staggerTo(i, o, a, u, l, c, d)
            }
            ,
            n.render = function(i, o, s) {
                var f, h, p, g, m, _, y, D, v, w, S, E, a = this._time, u = this._dirty ? this.totalDuration() : this._tDur, l = this._dur, c = i <= 0 ? 0 : Bt(i), d = this._zTime < 0 != i < 0 && (this._initted || !l);
                if (this !== qe && c > u && i >= 0 && (c = u),
                c !== this._tTime || s || d) {
                    if (a !== this._time && l && (c += this._time - a,
                    i += this._time - a),
                    f = c,
                    v = this._start,
                    _ = !(D = this._ts),
                    d && (l || (a = this._zTime),
                    (i || !o) && (this._zTime = i)),
                    this._repeat) {
                        if (S = this._yoyo,
                        m = l + this._rDelay,
                        this._repeat < -1 && i < 0)
                            return this.totalTime(100 * m + i, o, s);
                        if (f = Bt(c % m),
                        c === u ? (g = this._repeat,
                        f = l) : ((g = ~~(c / m)) && g === c / m && (f = l,
                        g--),
                        f > l && (f = l)),
                        w = ua(this._tTime, m),
                        !a && this._tTime && w !== g && (w = g),
                        S && 1 & g && (f = l - f,
                        E = 1),
                        g !== w && !this._lock) {
                            var x = S && 1 & w
                              , M = x === (S && 1 & g);
                            if (g < w && (x = !x),
                            a = x ? 0 : l,
                            this._lock = 1,
                            this.render(a || (E ? 0 : Bt(g * m)), o, !l)._lock = 0,
                            this._tTime = c,
                            !o && this.parent && dr(this, "onRepeat"),
                            this.vars.repeatRefresh && !E && (this.invalidate()._lock = 1),
                            a && a !== this._time || _ !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
                                return this;
                            if (l = this._dur,
                            u = this._tDur,
                            M && (this._lock = 2,
                            this.render(a = x ? l : -1e-4, !0),
                            this.vars.repeatRefresh && !E && this.invalidate()),
                            this._lock = 0,
                            !this._ts && !_)
                                return this;
                            ES(this, E)
                        }
                    }
                    if (this._hasPause && !this._forcing && this._lock < 2 && (y = function(e, n, r) {
                        var i;
                        if (r > n)
                            for (i = e._first; i && i._start <= r; ) {
                                if ("isPause" === i.data && i._start > n)
                                    return i;
                                i = i._next
                            }
                        else
                            for (i = e._last; i && i._start >= r; ) {
                                if ("isPause" === i.data && i._start < n)
                                    return i;
                                i = i._prev
                            }
                    }(this, Bt(a), Bt(f)),
                    y && (c -= f - (f = y._start))),
                    this._tTime = c,
                    this._time = f,
                    this._act = !D,
                    this._initted || (this._onUpdate = this.vars.onUpdate,
                    this._initted = 1,
                    this._zTime = i,
                    a = 0),
                    !a && f && !o && (dr(this, "onStart"),
                    this._tTime !== c))
                        return this;
                    if (f >= a && i >= 0)
                        for (h = this._first; h; ) {
                            if (p = h._next,
                            (h._act || f >= h._start) && h._ts && y !== h) {
                                if (h.parent !== this)
                                    return this.render(i, o, s);
                                if (h.render(h._ts > 0 ? (f - h._start) * h._ts : (h._dirty ? h.totalDuration() : h._tDur) + (f - h._start) * h._ts, o, s),
                                f !== this._time || !this._ts && !_) {
                                    y = 0,
                                    p && (c += this._zTime = -Oe);
                                    break
                                }
                            }
                            h = p
                        }
                    else {
                        h = this._last;
                        for (var A = i < 0 ? i : f; h; ) {
                            if (p = h._prev,
                            (h._act || A <= h._end) && h._ts && y !== h) {
                                if (h.parent !== this)
                                    return this.render(i, o, s);
                                if (h.render(h._ts > 0 ? (A - h._start) * h._ts : (h._dirty ? h.totalDuration() : h._tDur) + (A - h._start) * h._ts, o, s || Yt && (h._initted || h._startAt)),
                                f !== this._time || !this._ts && !_) {
                                    y = 0,
                                    p && (c += this._zTime = A ? -Oe : Oe);
                                    break
                                }
                            }
                            h = p
                        }
                    }
                    if (y && !o && (this.pause(),
                    y.render(f >= a ? 0 : -Oe)._zTime = f >= a ? 1 : -1,
                    this._ts))
                        return this._start = v,
                        Pd(this),
                        this.render(i, o, s);
                    this._onUpdate && !o && dr(this, "onUpdate", !0),
                    (c === u && this._tTime >= this.totalDuration() || !c && a) && (v === this._start || Math.abs(D) !== Math.abs(this._ts)) && (this._lock || ((i || !l) && (c === u && this._ts > 0 || !c && this._ts < 0) && to(this, 1),
                    !o && (!(i < 0) || a) && (c || a || !u) && (dr(this, c === u && i >= 0 ? "onComplete" : "onReverseComplete", !0),
                    this._prom && !(c < u && this.timeScale() > 0) && this._prom())))
                }
                return this
            }
            ,
            n.add = function(i, o) {
                var s = this;
                if (xi(o) || (o = lr(this, o, i)),
                !(i instanceof fa)) {
                    if (Zt(i))
                        return i.forEach(function(a) {
                            return s.add(a, o)
                        }),
                        this;
                    if (At(i))
                        return this.addLabel(i, o);
                    if (!Je(i))
                        return this;
                    i = St.delayedCall(0, i)
                }
                return this !== i ? Kr(this, i, o) : this
            }
            ,
            n.getChildren = function(i, o, s, a) {
                void 0 === i && (i = !0),
                void 0 === o && (o = !0),
                void 0 === s && (s = !0),
                void 0 === a && (a = -sr);
                for (var u = [], l = this._first; l; )
                    l._start >= a && (l instanceof St ? o && u.push(l) : (s && u.push(l),
                    i && u.push.apply(u, l.getChildren(!0, o, s)))),
                    l = l._next;
                return u
            }
            ,
            n.getById = function(i) {
                for (var o = this.getChildren(1, 1, 1), s = o.length; s--; )
                    if (o[s].vars.id === i)
                        return o[s]
            }
            ,
            n.remove = function(i) {
                return At(i) ? this.removeLabel(i) : Je(i) ? this.killTweensOf(i) : (Fd(this, i),
                i === this._recent && (this._recent = this._last),
                Ho(this))
            }
            ,
            n.totalTime = function(i, o) {
                return arguments.length ? (this._forcing = 1,
                !this._dp && this._ts && (this._start = Bt(Hn.time - (this._ts > 0 ? i / this._ts : (this.totalDuration() - i) / -this._ts))),
                t.prototype.totalTime.call(this, i, o),
                this._forcing = 0,
                this) : this._tTime
            }
            ,
            n.addLabel = function(i, o) {
                return this.labels[i] = lr(this, o),
                this
            }
            ,
            n.removeLabel = function(i) {
                return delete this.labels[i],
                this
            }
            ,
            n.addPause = function(i, o, s) {
                var a = St.delayedCall(0, o || Hu, s);
                return a.data = "isPause",
                this._hasPause = 1,
                Kr(this, a, lr(this, i))
            }
            ,
            n.removePause = function(i) {
                var o = this._first;
                for (i = lr(this, i); o; )
                    o._start === i && "isPause" === o.data && to(o),
                    o = o._next
            }
            ,
            n.killTweensOf = function(i, o, s) {
                for (var a = this.getTweensOf(i, s), u = a.length; u--; )
                    io !== a[u] && a[u].kill(i, o);
                return this
            }
            ,
            n.getTweensOf = function(i, o) {
                for (var c, s = [], a = cr(i), u = this._first, l = xi(o); u; )
                    u instanceof St ? Y3(u._targets, a) && (l ? (!io || u._initted && u._ts) && u.globalTime(0) <= o && u.globalTime(u.totalDuration()) > o : !o || u.isActive()) && s.push(u) : (c = u.getTweensOf(a, o)).length && s.push.apply(s, c),
                    u = u._next;
                return s
            }
            ,
            n.tweenTo = function(i, o) {
                o = o || {};
                var h, s = this, a = lr(s, i), l = o.startAt, c = o.onStart, d = o.onStartParams, f = o.immediateRender, p = St.to(s, ur({
                    ease: o.ease || "none",
                    lazy: !1,
                    immediateRender: !1,
                    time: a,
                    overwrite: "auto",
                    duration: o.duration || Math.abs((a - (l && "time"in l ? l.time : s._time)) / s.timeScale()) || Oe,
                    onStart: function() {
                        if (s.pause(),
                        !h) {
                            var m = o.duration || Math.abs((a - (l && "time"in l ? l.time : s._time)) / s.timeScale());
                            p._dur !== m && la(p, m, 0, 1).render(p._time, !0, !0),
                            h = 1
                        }
                        c && c.apply(p, d || [])
                    }
                }, o));
                return f ? p.render(0) : p
            }
            ,
            n.tweenFromTo = function(i, o, s) {
                return this.tweenTo(o, ur({
                    startAt: {
                        time: lr(this, i)
                    }
                }, s))
            }
            ,
            n.recent = function() {
                return this._recent
            }
            ,
            n.nextLabel = function(i) {
                return void 0 === i && (i = this._time),
                DS(this, lr(this, i))
            }
            ,
            n.previousLabel = function(i) {
                return void 0 === i && (i = this._time),
                DS(this, lr(this, i), 1)
            }
            ,
            n.currentLabel = function(i) {
                return arguments.length ? this.seek(i, !0) : this.previousLabel(this._time + Oe)
            }
            ,
            n.shiftChildren = function(i, o, s) {
                void 0 === s && (s = 0);
                for (var l, a = this._first, u = this.labels; a; )
                    a._start >= s && (a._start += i,
                    a._end += i),
                    a = a._next;
                if (o)
                    for (l in u)
                        u[l] >= s && (u[l] += i);
                return Ho(this)
            }
            ,
            n.invalidate = function(i) {
                var o = this._first;
                for (this._lock = 0; o; )
                    o.invalidate(i),
                    o = o._next;
                return t.prototype.invalidate.call(this, i)
            }
            ,
            n.clear = function(i) {
                void 0 === i && (i = !0);
                for (var s, o = this._first; o; )
                    s = o._next,
                    this.remove(o),
                    o = s;
                return this._dp && (this._time = this._tTime = this._pTime = 0),
                i && (this.labels = {}),
                Ho(this)
            }
            ,
            n.totalDuration = function(i) {
                var l, c, d, o = 0, s = this, a = s._last, u = sr;
                if (arguments.length)
                    return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -i : i));
                if (s._dirty) {
                    for (d = s.parent; a; )
                        l = a._prev,
                        a._dirty && a.totalDuration(),
                        (c = a._start) > u && s._sort && a._ts && !s._lock ? (s._lock = 1,
                        Kr(s, a, c - a._delay, 1)._lock = 0) : u = c,
                        c < 0 && a._ts && (o -= c,
                        (!d && !s._dp || d && d.smoothChildTiming) && (s._start += c / s._ts,
                        s._time -= c,
                        s._tTime -= c),
                        s.shiftChildren(-c, !1, -1 / 0),
                        u = 0),
                        a._end > o && a._ts && (o = a._end),
                        a = l;
                    la(s, s === qe && s._time > o ? s._time : o, 1, 1),
                    s._dirty = 0
                }
                return s._tDur
            }
            ,
            e.updateRoot = function(i) {
                if (qe._ts && (eS(qe, Rd(i, qe)),
                Kb = Hn.frame),
                Hn.frame >= Xb) {
                    Xb += Vn.autoSleep || 120;
                    var o = qe._first;
                    if ((!o || !o._ts) && Vn.autoSleep && Hn._listeners.length < 2) {
                        for (; o && !o._ts; )
                            o = o._next;
                        o || Hn.sleep()
                    }
                }
            }
            ,
            e
        }(fa);
        ur(In.prototype, {
            _lock: 0,
            _hasPause: 0,
            _forcing: 0
        });
        var io, Sm, _j = function(e, n, r, i, o, s, a) {
            var d, f, h, p, g, m, _, y, u = new Mn(this._pt,e,n,0,1,FS,null,o), l = 0, c = 0;
            for (u.b = r,
            u.e = i,
            r += "",
            (_ = ~(i += "").indexOf("random(")) && (i = qu(i)),
            s && (s(y = [r, i], e, n),
            r = y[0],
            i = y[1]),
            f = r.match(am) || []; d = am.exec(i); )
                p = d[0],
                g = i.substring(l, d.index),
                h ? h = (h + 1) % 5 : "rgba(" === g.substr(-5) && (h = 1),
                p !== f[c++] && (m = parseFloat(f[c - 1]) || 0,
                u._pt = {
                    _next: u._pt,
                    p: g || 1 === c ? g : ",",
                    s: m,
                    c: "=" === p.charAt(1) ? aa(m, p) - m : parseFloat(p) - m,
                    m: h && h < 4 ? Math.round : 0
                },
                l = am.lastIndex);
            return u.c = l < i.length ? i.substring(l, i.length) : "",
            u.fp = a,
            (Wb.test(i) || _) && (u.e = 0),
            this._pt = u,
            u
        }, bm = function(e, n, r, i, o, s, a, u, l, c) {
            Je(i) && (i = i(o || 0, e, s));
            var p, d = e[n], f = "get" !== r ? r : Je(d) ? l ? e[n.indexOf("set") || !Je(e["get" + n.substr(3)]) ? n : "get" + n.substr(3)](l) : e[n]() : d, h = Je(d) ? l ? Ej : xS : Im;
            if (At(i) && (~i.indexOf("random(") && (i = qu(i)),
            "=" === i.charAt(1) && ((p = aa(f, i) + (Qt(f) || 0)) || 0 === p) && (i = p)),
            !c || f !== i || Sm)
                return isNaN(f * i) || "" === i ? (!d && !(n in e) && cm(n, i),
                _j.call(this, e, n, f, i, h, u || Vn.stringFilter, l)) : (p = new Mn(this._pt,e,n,+f || 0,i - (f || 0),"boolean" == typeof d ? Sj : AS,0,h),
                l && (p.fp = l),
                a && p.modifier(a, this, e),
                this._pt = p)
        }, TS = function(e, n, r, i, o, s) {
            var a, u, l, c;
            if (Un[e] && !1 !== (a = new Un[e]).init(o, a.rawVars ? n[e] : function(e, n, r, i, o) {
                if (Je(e) && (e = Ku(e, o, n, r, i)),
                !Qr(e) || e.style && e.nodeType || Zt(e) || zb(e))
                    return At(e) ? Ku(e, o, n, r, i) : e;
                var a, s = {};
                for (a in e)
                    s[a] = Ku(e[a], o, n, r, i);
                return s
            }(n[e], i, o, s, r), r, i, s) && (r._pt = u = new Mn(r._pt,o,e,0,1,a.render,a,0,a.priority),
            r !== ca))
                for (l = r._ptLookup[r._targets.indexOf(o)],
                c = a._props.length; c--; )
                    l[a._props[c]] = u;
            return a
        }, Tm = function t(e, n, r) {
            var E, x, M, A, k, L, pe, ae, ne, R, j, H, T, i = e.vars, o = i.ease, s = i.startAt, a = i.immediateRender, u = i.lazy, l = i.onUpdate, c = i.onUpdateParams, d = i.callbackScope, f = i.runBackwards, h = i.yoyoEase, p = i.keyframes, g = i.autoRevert, m = e._dur, _ = e._startAt, y = e._targets, D = e.parent, v = D && "nested" === D.data ? D.vars.targets : y, w = "auto" === e._overwrite && !rm, S = e.timeline;
            if (S && (!p || !o) && (o = "none"),
            e._ease = zo(o, oa.ease),
            e._yEase = h ? wS(zo(!0 === h ? o : h, oa.ease)) : 0,
            h && e._yoyo && !e._repeat && (h = e._yEase,
            e._yEase = e._ease,
            e._ease = h),
            e._from = !S && !!i.runBackwards,
            !S || p && !i.stagger) {
                if (H = (ae = y[0] ? $o(y[0]).harness : 0) && i[ae.prop],
                E = Ad(i, dm),
                _ && (_._zTime < 0 && _.progress(1),
                n < 0 && f && a && !g ? _.render(-1, !0) : _.revert(f && m ? Id : W3),
                _._lazy = 0),
                s) {
                    if (to(e._startAt = St.set(y, ur({
                        data: "isStart",
                        overwrite: !1,
                        parent: D,
                        immediateRender: !0,
                        lazy: !_ && Sn(u),
                        startAt: null,
                        delay: 0,
                        onUpdate: l,
                        onUpdateParams: c,
                        callbackScope: d,
                        stagger: 0
                    }, s))),
                    e._startAt._dp = 0,
                    e._startAt._sat = e,
                    n < 0 && (Yt || !a && !g) && e._startAt.revert(Id),
                    a && m && n <= 0 && r <= 0)
                        return void (n && (e._zTime = n))
                } else if (f && m && !_)
                    if (n && (a = !1),
                    M = ur({
                        overwrite: !1,
                        data: "isFromStart",
                        lazy: a && !_ && Sn(u),
                        immediateRender: a,
                        stagger: 0,
                        parent: D
                    }, E),
                    H && (M[ae.prop] = H),
                    to(e._startAt = St.set(y, M)),
                    e._startAt._dp = 0,
                    e._startAt._sat = e,
                    n < 0 && (Yt ? e._startAt.revert(Id) : e._startAt.render(-1, !0)),
                    e._zTime = n,
                    a) {
                        if (!n)
                            return
                    } else
                        t(e._startAt, Oe, Oe);
                for (e._pt = e._ptCache = 0,
                u = m && Sn(u) || u && !m,
                x = 0; x < y.length; x++) {
                    if (pe = (k = y[x])._gsap || gm(y)[x]._gsap,
                    e._ptLookup[x] = R = {},
                    fm[pe.id] && eo.length && xd(),
                    j = v === y ? x : v.indexOf(k),
                    ae && !1 !== (ne = new ae).init(k, H || E, e, j, v) && (e._pt = A = new Mn(e._pt,k,ne.name,0,1,ne.render,ne,0,ne.priority),
                    ne._props.forEach(function(C) {
                        R[C] = A
                    }),
                    ne.priority && (L = 1)),
                    !ae || H)
                        for (M in E)
                            Un[M] && (ne = TS(M, E, e, j, k, v)) ? ne.priority && (L = 1) : R[M] = A = bm.call(e, k, M, "get", E[M], j, v, 0, i.stringFilter);
                    e._op && e._op[x] && e.kill(k, e._op[x]),
                    w && e._pt && (io = e,
                    qe.killTweensOf(k, R, e.globalTime(n)),
                    T = !e.parent,
                    io = 0),
                    e._pt && u && (fm[pe.id] = 1)
                }
                L && RS(e),
                e._onInit && e._onInit(e)
            }
            e._onUpdate = l,
            e._initted = (!e._op || e._pt) && !T,
            p && n <= 0 && S.render(sr, !0, !0)
        }, wj = function(e, n, r, i) {
            var s, a, o = n.ease || i || "power1.inOut";
            if (Zt(n))
                a = r[e] || (r[e] = []),
                n.forEach(function(u, l) {
                    return a.push({
                        t: l / (n.length - 1) * 100,
                        v: u,
                        e: o
                    })
                });
            else
                for (s in n)
                    a = r[s] || (r[s] = []),
                    "ease" === s || a.push({
                        t: parseFloat(e),
                        v: n[s],
                        e: o
                    })
        }, Ku = function(e, n, r, i, o) {
            return Je(e) ? e.call(n, r, i, o) : At(e) && ~e.indexOf("random(") ? qu(e) : e
        }, IS = pm + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", MS = {};
        Tn(IS + ",id,stagger,delay,duration,paused,scrollTrigger", function(t) {
            return MS[t] = 1
        });
        var St = function(t) {
            function e(r, i, o, s) {
                var a;
                "number" == typeof i && (o.duration = i,
                i = o,
                o = null);
                var v, w, S, E, x, M, A, k, u = (a = t.call(this, s ? i : zu(i)) || this).vars, l = u.duration, c = u.delay, d = u.immediateRender, f = u.stagger, h = u.overwrite, p = u.keyframes, g = u.defaults, m = u.scrollTrigger, _ = u.yoyoEase, y = i.parent || qe, D = (Zt(r) || zb(r) ? xi(r[0]) : "length"in i) ? [r] : cr(r);
                if (a._targets = D.length ? gm(D) : Td("GSAP target " + r + " not found. https://greensock.com", !Vn.nullTargetWarn) || [],
                a._ptLookup = [],
                a._overwrite = h,
                p || f || bd(l) || bd(c)) {
                    if (i = a.vars,
                    (v = a.timeline = new In({
                        data: "nested",
                        defaults: g || {},
                        targets: y && "nested" === y.data ? y.vars.targets : D
                    })).kill(),
                    v.parent = v._dp = Mi(a),
                    v._start = 0,
                    f || bd(l) || bd(c)) {
                        if (E = D.length,
                        A = f && fS(f),
                        Qr(f))
                            for (x in f)
                                ~IS.indexOf(x) && (k || (k = {}),
                                k[x] = f[x]);
                        for (w = 0; w < E; w++)
                            (S = Ad(i, MS)).stagger = 0,
                            _ && (S.yoyoEase = _),
                            k && Uo(S, k),
                            M = D[w],
                            S.duration = +Ku(l, Mi(a), w, M, D),
                            S.delay = (+Ku(c, Mi(a), w, M, D) || 0) - a._delay,
                            !f && 1 === E && S.delay && (a._delay = c = S.delay,
                            a._start += c,
                            S.delay = 0),
                            v.to(M, S, A ? A(w, M, D) : 0),
                            v._ease = _e.none;
                        v.duration() ? l = c = 0 : a.timeline = 0
                    } else if (p) {
                        zu(ur(v.vars.defaults, {
                            ease: "none"
                        })),
                        v._ease = zo(p.ease || i.ease || "none");
                        var pe, ae, ne, L = 0;
                        if (Zt(p))
                            p.forEach(function(R) {
                                return v.to(D, R, ">")
                            }),
                            v.duration();
                        else {
                            for (x in S = {},
                            p)
                                "ease" === x || "easeEach" === x || wj(x, p[x], S, p.easeEach);
                            for (x in S)
                                for (pe = S[x].sort(function(R, j) {
                                    return R.t - j.t
                                }),
                                L = 0,
                                w = 0; w < pe.length; w++)
                                    (ne = {
                                        ease: (ae = pe[w]).e,
                                        duration: (ae.t - (w ? pe[w - 1].t : 0)) / 100 * l
                                    })[x] = ae.v,
                                    v.to(D, ne, L),
                                    L += ne.duration;
                            v.duration() < l && v.to({}, {
                                duration: l - v.duration()
                            })
                        }
                    }
                    l || a.duration(l = v.duration())
                } else
                    a.timeline = 0;
                return !0 === h && !rm && (io = Mi(a),
                qe.killTweensOf(D),
                io = 0),
                Kr(y, Mi(a), o),
                i.reversed && a.reverse(),
                i.paused && a.paused(!0),
                (d || !l && !p && a._start === Bt(y._time) && Sn(d) && X3(Mi(a)) && "nested" !== y.data) && (a._tTime = -Oe,
                a.render(Math.max(0, -c) || 0)),
                m && aS(Mi(a), m),
                a
            }
            $b(e, t);
            var n = e.prototype;
            return n.render = function(i, o, s) {
                var f, h, p, g, m, _, y, D, v, a = this._time, u = this._tDur, l = this._dur, c = i < 0, d = i > u - Oe && !c ? u : i < Oe ? 0 : i;
                if (l) {
                    if (d !== this._tTime || !i || s || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== c) {
                        if (f = d,
                        D = this.timeline,
                        this._repeat) {
                            if (g = l + this._rDelay,
                            this._repeat < -1 && c)
                                return this.totalTime(100 * g + i, o, s);
                            if (f = Bt(d % g),
                            d === u ? (p = this._repeat,
                            f = l) : ((p = ~~(d / g)) && p === d / g && (f = l,
                            p--),
                            f > l && (f = l)),
                            (_ = this._yoyo && 1 & p) && (v = this._yEase,
                            f = l - f),
                            m = ua(this._tTime, g),
                            f === a && !s && this._initted)
                                return this._tTime = d,
                                this;
                            p !== m && (D && this._yEase && ES(D, _),
                            this.vars.repeatRefresh && !_ && !this._lock && (this._lock = s = 1,
                            this.render(Bt(g * p), !0).invalidate()._lock = 0))
                        }
                        if (!this._initted) {
                            if (uS(this, c ? i : f, s, o, d))
                                return this._tTime = 0,
                                this;
                            if (a !== this._time)
                                return this;
                            if (l !== this._dur)
                                return this.render(i, o, s)
                        }
                        if (this._tTime = d,
                        this._time = f,
                        !this._act && this._ts && (this._act = 1,
                        this._lazy = 0),
                        this.ratio = y = (v || this._ease)(f / l),
                        this._from && (this.ratio = y = 1 - y),
                        f && !a && !o && (dr(this, "onStart"),
                        this._tTime !== d))
                            return this;
                        for (h = this._pt; h; )
                            h.r(y, h.d),
                            h = h._next;
                        D && D.render(i < 0 ? i : !f && _ ? -Oe : D._dur * D._ease(f / this._dur), o, s) || this._startAt && (this._zTime = i),
                        this._onUpdate && !o && (c && mm(this, i, 0, s),
                        dr(this, "onUpdate")),
                        this._repeat && p !== m && this.vars.onRepeat && !o && this.parent && dr(this, "onRepeat"),
                        (d === this._tDur || !d) && this._tTime === d && (c && !this._onUpdate && mm(this, i, 0, !0),
                        (i || !l) && (d === this._tDur && this._ts > 0 || !d && this._ts < 0) && to(this, 1),
                        !o && (!c || a) && (d || a || _) && (dr(this, d === u ? "onComplete" : "onReverseComplete", !0),
                        this._prom && !(d < u && this.timeScale() > 0) && this._prom()))
                    }
                } else
                    !function(e, n, r, i) {
                        var l, c, d, o = e.ratio, s = n < 0 || !n && (!e._start && J3(e) && (e._initted || !Dm(e)) || (e._ts < 0 || e._dp._ts < 0) && !Dm(e)) ? 0 : 1, a = e._rDelay, u = 0;
                        if (a && e._repeat && (u = Wu(0, e._tDur, n),
                        c = ua(u, a),
                        e._yoyo && 1 & c && (s = 1 - s),
                        c !== ua(e._tTime, a) && (o = 1 - s,
                        e.vars.repeatRefresh && e._initted && e.invalidate())),
                        s !== o || Yt || i || e._zTime === Oe || !n && e._zTime) {
                            if (!e._initted && uS(e, n, i, r, u))
                                return;
                            for (d = e._zTime,
                            e._zTime = n || (r ? Oe : 0),
                            r || (r = n && !d),
                            e.ratio = s,
                            e._from && (s = 1 - s),
                            e._time = 0,
                            e._tTime = u,
                            l = e._pt; l; )
                                l.r(s, l.d),
                                l = l._next;
                            n < 0 && mm(e, n, 0, !0),
                            e._onUpdate && !r && dr(e, "onUpdate"),
                            u && e._repeat && !r && e.parent && dr(e, "onRepeat"),
                            (n >= e._tDur || n < 0) && e.ratio === s && (s && to(e, 1),
                            !r && !Yt && (dr(e, s ? "onComplete" : "onReverseComplete", !0),
                            e._prom && e._prom()))
                        } else
                            e._zTime || (e._zTime = n)
                    }(this, i, o, s);
                return this
            }
            ,
            n.targets = function() {
                return this._targets
            }
            ,
            n.invalidate = function(i) {
                return (!i || !this.vars.runBackwards) && (this._startAt = 0),
                this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0,
                this._ptLookup = [],
                this.timeline && this.timeline.invalidate(i),
                t.prototype.invalidate.call(this, i)
            }
            ,
            n.resetTo = function(i, o, s, a) {
                Qu || Hn.wake(),
                this._ts || this.play();
                var u = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
                return this._initted || Tm(this, u),
                function(e, n, r, i, o, s, a) {
                    var l, c, d, f, u = (e._pt && e._ptCache || (e._ptCache = {}))[n];
                    if (!u)
                        for (u = e._ptCache[n] = [],
                        d = e._ptLookup,
                        f = e._targets.length; f--; ) {
                            if ((l = d[f][n]) && l.d && l.d._pt)
                                for (l = l.d._pt; l && l.p !== n && l.fp !== n; )
                                    l = l._next;
                            if (!l)
                                return Sm = 1,
                                e.vars[n] = "+=0",
                                Tm(e, a),
                                Sm = 0,
                                1;
                            u.push(l)
                        }
                    for (f = u.length; f--; )
                        (l = (c = u[f])._pt || c).s = !i && 0 !== i || o ? l.s + (i || 0) + s * l.c : i,
                        l.c = r - l.s,
                        c.e && (c.e = lt(r) + Qt(c.e)),
                        c.b && (c.b = l.s + Qt(c.b))
                }(this, i, o, s, a, this._ease(u / this._dur), u) ? this.resetTo(i, o, s, a) : (Od(this, 0),
                this.parent || iS(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0),
                this.render(0))
            }
            ,
            n.kill = function(i, o) {
                if (void 0 === o && (o = "all"),
                !(i || o && "all" !== o))
                    return this._lazy = this._pt = 0,
                    this.parent ? Yu(this) : this;
                if (this.timeline) {
                    var s = this.timeline.totalDuration();
                    return this.timeline.killTweensOf(i, o, io && !0 !== io.vars.overwrite)._first || Yu(this),
                    this.parent && s !== this.timeline.totalDuration() && la(this, this._dur * this.timeline._tDur / s, 0, 1),
                    this
                }
                var d, f, h, p, g, m, _, a = this._targets, u = i ? cr(i) : a, l = this._ptLookup, c = this._pt;
                if ((!o || "all" === o) && function(e, n) {
                    for (var r = e.length, i = r === n.length; i && r-- && e[r] === n[r]; )
                        ;
                    return r < 0
                }(a, u))
                    return "all" === o && (this._pt = 0),
                    Yu(this);
                for (d = this._op = this._op || [],
                "all" !== o && (At(o) && (g = {},
                Tn(o, function(y) {
                    return g[y] = 1
                }),
                o = g),
                o = function(e, n) {
                    var o, s, a, u, r = e[0] ? $o(e[0]).harness : 0, i = r && r.aliases;
                    if (!i)
                        return n;
                    for (s in o = Uo({}, n),
                    i)
                        if (s in o)
                            for (a = (u = i[s].split(",")).length; a--; )
                                o[u[a]] = o[s];
                    return o
                }(a, o)),
                _ = a.length; _--; )
                    if (~u.indexOf(a[_]))
                        for (g in f = l[_],
                        "all" === o ? (d[_] = o,
                        p = f,
                        h = {}) : (h = d[_] = d[_] || {},
                        p = o),
                        p)
                            (m = f && f[g]) && ((!("kill"in m.d) || !0 === m.d.kill(g)) && Fd(this, m, "_pt"),
                            delete f[g]),
                            "all" !== h && (h[g] = 1);
                return this._initted && !this._pt && c && Yu(this),
                this
            }
            ,
            e.to = function(i, o) {
                return new e(i,o,arguments[2])
            }
            ,
            e.from = function(i, o) {
                return Gu(1, arguments)
            }
            ,
            e.delayedCall = function(i, o, s, a) {
                return new e(o,0,{
                    immediateRender: !1,
                    lazy: !1,
                    overwrite: !1,
                    delay: i,
                    onComplete: o,
                    onReverseComplete: o,
                    onCompleteParams: s,
                    onReverseCompleteParams: s,
                    callbackScope: a
                })
            }
            ,
            e.fromTo = function(i, o, s) {
                return Gu(2, arguments)
            }
            ,
            e.set = function(i, o) {
                return o.duration = 0,
                o.repeatDelay || (o.repeat = 0),
                new e(i,o)
            }
            ,
            e.killTweensOf = function(i, o, s) {
                return qe.killTweensOf(i, o, s)
            }
            ,
            e
        }(fa);
        ur(St.prototype, {
            _targets: [],
            _lazy: 0,
            _startAt: 0,
            _op: 0,
            _onInit: 0
        }),
        Tn("staggerTo,staggerFrom,staggerFromTo", function(t) {
            St[t] = function() {
                var e = new In
                  , n = _m.call(arguments, 0);
                return n.splice("staggerFromTo" === t ? 5 : 4, 0, 0),
                e[t].apply(e, n)
            }
        });
        var Im = function(e, n, r) {
            return e[n] = r
        }
          , xS = function(e, n, r) {
            return e[n](r)
        }
          , Ej = function(e, n, r, i) {
            return e[n](i.fp, r)
        }
          , bj = function(e, n, r) {
            return e.setAttribute(n, r)
        }
          , Mm = function(e, n) {
            return Je(e[n]) ? xS : om(e[n]) && e.setAttribute ? bj : Im
        }
          , AS = function(e, n) {
            return n.set(n.t, n.p, Math.round(1e6 * (n.s + n.c * e)) / 1e6, n)
        }
          , Sj = function(e, n) {
            return n.set(n.t, n.p, !!(n.s + n.c * e), n)
        }
          , FS = function(e, n) {
            var r = n._pt
              , i = "";
            if (!e && n.b)
                i = n.b;
            else if (1 === e && n.e)
                i = n.e;
            else {
                for (; r; )
                    i = r.p + (r.m ? r.m(r.s + r.c * e) : Math.round(1e4 * (r.s + r.c * e)) / 1e4) + i,
                    r = r._next;
                i += n.c
            }
            n.set(n.t, n.p, i, n)
        }
          , xm = function(e, n) {
            for (var r = n._pt; r; )
                r.r(e, r.d),
                r = r._next
        }
          , Tj = function(e, n, r, i) {
            for (var s, o = this._pt; o; )
                s = o._next,
                o.p === i && o.modifier(e, n, r),
                o = s
        }
          , Ij = function(e) {
            for (var r, i, n = this._pt; n; )
                i = n._next,
                n.p === e && !n.op || n.op === e ? Fd(this, n, "_pt") : n.dep || (r = 1),
                n = i;
            return !r
        }
          , Mj = function(e, n, r, i) {
            i.mSet(e, n, i.m.call(i.tween, r, i.mt), i)
        }
          , RS = function(e) {
            for (var r, i, o, s, n = e._pt; n; ) {
                for (r = n._next,
                i = o; i && i.pr > n.pr; )
                    i = i._next;
                (n._prev = i ? i._prev : s) ? n._prev._next = n : o = n,
                (n._next = i) ? i._prev = n : s = n,
                n = r
            }
            e._pt = o
        }
          , Mn = function() {
            function t(n, r, i, o, s, a, u, l, c) {
                this.t = r,
                this.s = o,
                this.c = s,
                this.p = i,
                this.r = a || AS,
                this.d = u || this,
                this.set = l || Im,
                this.pr = c || 0,
                this._next = n,
                n && (n._prev = this)
            }
            return t.prototype.modifier = function(r, i, o) {
                this.mSet = this.mSet || this.set,
                this.set = Mj,
                this.m = r,
                this.mt = o,
                this.tween = i
            }
            ,
            t
        }();
        Tn(pm + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(t) {
            return dm[t] = 1
        }),
        $n.TweenMax = $n.TweenLite = St,
        $n.TimelineLite = $n.TimelineMax = In,
        qe = new In({
            sortChildren: !1,
            defaults: oa,
            autoRemoveChildren: !0,
            id: "root",
            smoothChildTiming: !0
        }),
        Vn.stringFilter = CS;
        var ha = []
          , Nd = {}
          , xj = []
          , PS = 0
          , Am = function(e) {
            return (Nd[e] || xj).map(function(n) {
                return n()
            })
        }
          , Fm = function() {
            var e = Date.now()
              , n = [];
            e - PS > 2 && (Am("matchMediaInit"),
            ha.forEach(function(r) {
                var s, a, u, l, i = r.queries, o = r.conditions;
                for (a in i)
                    (s = ar.matchMedia(i[a]).matches) && (u = 1),
                    s !== o[a] && (o[a] = s,
                    l = 1);
                l && (r.revert(),
                u && n.push(r))
            }),
            Am("matchMediaRevert"),
            n.forEach(function(r) {
                return r.onMatch(r)
            }),
            PS = e,
            Am("matchMedia"))
        }
          , OS = function() {
            function t(n, r) {
                this.selector = r && ym(r),
                this.data = [],
                this._r = [],
                this.isReverted = !1,
                n && this.add(n)
            }
            var e = t.prototype;
            return e.add = function(r, i, o) {
                Je(r) && (o = i,
                i = r,
                r = Je);
                var s = this
                  , a = function() {
                    var d, l = gt, c = s.selector;
                    return l && l !== s && l.data.push(s),
                    o && (s.selector = ym(o)),
                    gt = s,
                    d = i.apply(s, arguments),
                    Je(d) && s._r.push(d),
                    gt = l,
                    s.selector = c,
                    s.isReverted = !1,
                    d
                };
                return s.last = a,
                r === Je ? a(s) : r ? s[r] = a : a
            }
            ,
            e.ignore = function(r) {
                var i = gt;
                gt = null,
                r(this),
                gt = i
            }
            ,
            e.getTweens = function() {
                var r = [];
                return this.data.forEach(function(i) {
                    return i instanceof t ? r.push.apply(r, i.getTweens()) : i instanceof St && !(i.parent && "nested" === i.parent.data) && r.push(i)
                }),
                r
            }
            ,
            e.clear = function() {
                this._r.length = this.data.length = 0
            }
            ,
            e.kill = function(r, i) {
                var o = this;
                if (r) {
                    var s = this.getTweens();
                    this.data.forEach(function(u) {
                        "isFlip" === u.data && (u.revert(),
                        u.getChildren(!0, !0, !1).forEach(function(l) {
                            return s.splice(s.indexOf(l), 1)
                        }))
                    }),
                    s.map(function(u) {
                        return {
                            g: u.globalTime(0),
                            t: u
                        }
                    }).sort(function(u, l) {
                        return l.g - u.g || -1
                    }).forEach(function(u) {
                        return u.t.revert(r)
                    }),
                    this.data.forEach(function(u) {
                        return !(u instanceof fa) && u.revert && u.revert(r)
                    }),
                    this._r.forEach(function(u) {
                        return u(r, o)
                    }),
                    this.isReverted = !0
                } else
                    this.data.forEach(function(u) {
                        return u.kill && u.kill()
                    });
                if (this.clear(),
                i) {
                    var a = ha.indexOf(this);
                    ~a && ha.splice(a, 1)
                }
            }
            ,
            e.revert = function(r) {
                this.kill(r || {})
            }
            ,
            t
        }()
          , Aj = function() {
            function t(n) {
                this.contexts = [],
                this.scope = n
            }
            var e = t.prototype;
            return e.add = function(r, i, o) {
                Qr(r) || (r = {
                    matches: r
                });
                var u, l, c, s = new OS(0,o || this.scope), a = s.conditions = {};
                for (l in this.contexts.push(s),
                i = s.add("onMatch", i),
                s.queries = r,
                r)
                    "all" === l ? c = 1 : (u = ar.matchMedia(r[l])) && (ha.indexOf(s) < 0 && ha.push(s),
                    (a[l] = u.matches) && (c = 1),
                    u.addListener ? u.addListener(Fm) : u.addEventListener("change", Fm));
                return c && i(s),
                this
            }
            ,
            e.revert = function(r) {
                this.kill(r || {})
            }
            ,
            e.kill = function(r) {
                this.contexts.forEach(function(i) {
                    return i.kill(r, !0)
                })
            }
            ,
            t
        }()
          , kd = {
            registerPlugin: function() {
                for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
                    n[r] = arguments[r];
                n.forEach(function(i) {
                    return dj(i)
                })
            },
            timeline: function(e) {
                return new In(e)
            },
            getTweensOf: function(e, n) {
                return qe.getTweensOf(e, n)
            },
            getProperty: function(e, n, r, i) {
                At(e) && (e = cr(e)[0]);
                var o = $o(e || {}).get
                  , s = r ? nS : tS;
                return "native" === r && (r = ""),
                e && (n ? s((Un[n] && Un[n].get || o)(e, n, r, i)) : function(a, u, l) {
                    return s((Un[a] && Un[a].get || o)(e, a, u, l))
                }
                )
            },
            quickSetter: function(e, n, r) {
                if ((e = cr(e)).length > 1) {
                    var i = e.map(function(c) {
                        return zn.quickSetter(c, n, r)
                    })
                      , o = i.length;
                    return function(c) {
                        for (var d = o; d--; )
                            i[d](c)
                    }
                }
                var s = Un[n]
                  , a = $o(e = e[0] || {})
                  , u = a.harness && (a.harness.aliases || {})[n] || n
                  , l = s ? function(c) {
                    var d = new s;
                    ca._pt = 0,
                    d.init(e, r ? c + r : c, ca, 0, [e]),
                    d.render(1, d),
                    ca._pt && xm(1, ca)
                }
                : a.set(e, u);
                return s ? l : function(c) {
                    return l(e, u, r ? c + r : c, a, 1)
                }
            },
            quickTo: function(e, n, r) {
                var i, o = zn.to(e, Uo(((i = {})[n] = "+=0.1",
                i.paused = !0,
                i), r || {})), s = function(u, l, c) {
                    return o.resetTo(n, u, l, c)
                };
                return s.tween = o,
                s
            },
            isTweening: function(e) {
                return qe.getTweensOf(e, !0).length > 0
            },
            defaults: function(e) {
                return e && e.ease && (e.ease = zo(e.ease, oa.ease)),
                rS(oa, e || {})
            },
            config: function(e) {
                return rS(Vn, e || {})
            },
            registerEffect: function(e) {
                var n = e.name
                  , r = e.effect
                  , o = e.defaults
                  , s = e.extendTimeline;
                (e.plugins || "").split(",").forEach(function(a) {
                    return a && !Un[a] && !$n[a] && Td(n + " effect requires " + a + " plugin.")
                }),
                hm[n] = function(a, u, l) {
                    return r(cr(a), ur(u || {}, o), l)
                }
                ,
                s && (In.prototype[n] = function(a, u, l) {
                    return this.add(hm[n](a, Qr(u) ? u : (l = u) && {}, this), l)
                }
                )
            },
            registerEase: function(e, n) {
                _e[e] = zo(n)
            },
            parseEase: function(e, n) {
                return arguments.length ? zo(e, n) : _e
            },
            getById: function(e) {
                return qe.getById(e)
            },
            exportRoot: function(e, n) {
                void 0 === e && (e = {});
                var i, o, r = new In(e);
                for (r.smoothChildTiming = Sn(e.smoothChildTiming),
                qe.remove(r),
                r._dp = 0,
                r._time = r._tTime = qe._time,
                i = qe._first; i; )
                    o = i._next,
                    (n || !(!i._dur && i instanceof St && i.vars.onComplete === i._targets[0])) && Kr(r, i, i._start - i._delay),
                    i = o;
                return Kr(qe, r, 0),
                r
            },
            context: function(e, n) {
                return e ? new OS(e,n) : gt
            },
            matchMedia: function(e) {
                return new Aj(e)
            },
            matchMediaRefresh: function() {
                return ha.forEach(function(e) {
                    var r, i, n = e.conditions;
                    for (i in n)
                        n[i] && (n[i] = !1,
                        r = 1);
                    r && e.revert()
                }) || Fm()
            },
            addEventListener: function(e, n) {
                var r = Nd[e] || (Nd[e] = []);
                ~r.indexOf(n) || r.push(n)
            },
            removeEventListener: function(e, n) {
                var r = Nd[e]
                  , i = r && r.indexOf(n);
                i >= 0 && r.splice(i, 1)
            },
            utils: {
                wrap: function t(e, n, r) {
                    var i = n - e;
                    return Zt(e) ? gS(e, t(0, e.length), n) : no(r, function(o) {
                        return (i + (o - e) % i) % i + e
                    })
                },
                wrapYoyo: function t(e, n, r) {
                    var i = n - e
                      , o = 2 * i;
                    return Zt(e) ? gS(e, t(0, e.length - 1), n) : no(r, function(s) {
                        return e + ((s = (o + (s - e) % o) % o || 0) > i ? o - s : s)
                    })
                },
                distribute: fS,
                random: pS,
                snap: hS,
                normalize: function(e, n, r) {
                    return mS(e, n, 0, 1, r)
                },
                getUnit: Qt,
                clamp: function(e, n, r) {
                    return no(r, function(i) {
                        return Wu(e, n, i)
                    })
                },
                splitColor: _S,
                toArray: cr,
                selector: ym,
                mapRange: mS,
                pipe: function() {
                    for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
                        n[r] = arguments[r];
                    return function(i) {
                        return n.reduce(function(o, s) {
                            return s(o)
                        }, i)
                    }
                },
                unitize: function(e, n) {
                    return function(r) {
                        return e(parseFloat(r)) + (n || Qt(r))
                    }
                },
                interpolate: function t(e, n, r, i) {
                    var o = isNaN(e + n) ? 0 : function(h) {
                        return (1 - h) * e + h * n
                    }
                    ;
                    if (!o) {
                        var u, l, c, d, f, s = At(e), a = {};
                        if (!0 === r && (i = 1) && (r = null),
                        s)
                            e = {
                                p: e
                            },
                            n = {
                                p: n
                            };
                        else if (Zt(e) && !Zt(n)) {
                            for (c = [],
                            f = (d = e.length) - 2,
                            l = 1; l < d; l++)
                                c.push(t(e[l - 1], e[l]));
                            d--,
                            o = function(p) {
                                p *= d;
                                var g = Math.min(f, ~~p);
                                return c[g](p - g)
                            }
                            ,
                            r = n
                        } else
                            i || (e = Uo(Zt(e) ? [] : {}, e));
                        if (!c) {
                            for (u in n)
                                bm.call(a, e, u, "get", n[u]);
                            o = function(p) {
                                return xm(p, a) || (s ? e.p : e)
                            }
                        }
                    }
                    return no(r, o)
                },
                shuffle: dS
            },
            install: Zb,
            effects: hm,
            ticker: Hn,
            updateRoot: In.updateRoot,
            plugins: Un,
            globalTimeline: qe,
            core: {
                PropTween: Mn,
                globals: Qb,
                Tween: St,
                Timeline: In,
                Animation: fa,
                getCache: $o,
                _removeLinkedListItem: Fd,
                reverting: function() {
                    return Yt
                },
                context: function(e) {
                    return e && gt && (gt.data.push(e),
                    e._ctx = gt),
                    gt
                },
                suppressOverwrites: function(e) {
                    return rm = e
                }
            }
        };
        Tn("to,from,fromTo,delayedCall,set,killTweensOf", function(t) {
            return kd[t] = St[t]
        }),
        Hn.add(In.updateRoot),
        ca = kd.to({}, {
            duration: 0
        });
        var Fj = function(e, n) {
            for (var r = e._pt; r && r.p !== n && r.op !== n && r.fp !== n; )
                r = r._next;
            return r
        }
          , Rm = function(e, n) {
            return {
                name: e,
                rawVars: 1,
                init: function(i, o, s) {
                    s._onInit = function(a) {
                        var u, l;
                        if (At(o) && (u = {},
                        Tn(o, function(c) {
                            return u[c] = 1
                        }),
                        o = u),
                        n) {
                            for (l in u = {},
                            o)
                                u[l] = n(o[l]);
                            o = u
                        }
                        !function(e, n) {
                            var i, o, s, r = e._targets;
                            for (i in n)
                                for (o = r.length; o--; )
                                    (s = e._ptLookup[o][i]) && (s = s.d) && (s._pt && (s = Fj(s, i)),
                                    s && s.modifier && s.modifier(n[i], e, r[o], i))
                        }(a, o)
                    }
                }
            }
        }
          , zn = kd.registerPlugin({
            name: "attr",
            init: function(e, n, r, i, o) {
                var s, a, u;
                for (s in this.tween = r,
                n)
                    u = e.getAttribute(s) || "",
                    (a = this.add(e, "setAttribute", (u || 0) + "", n[s], i, o, 0, 0, s)).op = s,
                    a.b = u,
                    this._props.push(s)
            },
            render: function(e, n) {
                for (var r = n._pt; r; )
                    Yt ? r.set(r.t, r.p, r.b, r) : r.r(e, r.d),
                    r = r._next
            }
        }, {
            name: "endArray",
            init: function(e, n) {
                for (var r = n.length; r--; )
                    this.add(e, r, e[r] || 0, n[r], 0, 0, 0, 0, 0, 1)
            }
        }, Rm("roundProps", vm), Rm("modifiers"), Rm("snap", hS)) || kd;
        St.version = In.version = zn.version = "3.11.4",
        Yb = 1,
        Hb() && da();
        var NS, oo, pa, Pm, Wo, kS, Om, US, Ai = {}, qo = 180 / Math.PI, ga = Math.PI / 180, ma = Math.atan2, LS = 1e8, Nm = /([A-Z])/g, Nj = /(left|right|width|margin|padding|x)/i, kj = /[\s,\(]\S/, Fi = {
            autoAlpha: "opacity,visibility",
            scale: "scaleX,scaleY",
            alpha: "opacity"
        }, km = function(e, n) {
            return n.set(n.t, n.p, Math.round(1e4 * (n.s + n.c * e)) / 1e4 + n.u, n)
        }, Lj = function(e, n) {
            return n.set(n.t, n.p, 1 === e ? n.e : Math.round(1e4 * (n.s + n.c * e)) / 1e4 + n.u, n)
        }, Bj = function(e, n) {
            return n.set(n.t, n.p, e ? Math.round(1e4 * (n.s + n.c * e)) / 1e4 + n.u : n.b, n)
        }, jj = function(e, n) {
            var r = n.s + n.c * e;
            n.set(n.t, n.p, ~~(r + (r < 0 ? -.5 : .5)) + n.u, n)
        }, BS = function(e, n) {
            return n.set(n.t, n.p, e ? n.e : n.b, n)
        }, jS = function(e, n) {
            return n.set(n.t, n.p, 1 !== e ? n.b : n.e, n)
        }, Vj = function(e, n, r) {
            return e.style[n] = r
        }, $j = function(e, n, r) {
            return e.style.setProperty(n, r)
        }, Uj = function(e, n, r) {
            return e._gsap[n] = r
        }, Hj = function(e, n, r) {
            return e._gsap.scaleX = e._gsap.scaleY = r
        }, zj = function(e, n, r, i, o) {
            var s = e._gsap;
            s.scaleX = s.scaleY = r,
            s.renderTransform(o, s)
        }, Gj = function(e, n, r, i, o) {
            var s = e._gsap;
            s[n] = r,
            s.renderTransform(o, s)
        }, Ye = "transform", Ir = Ye + "Origin", Wj = function(e, n) {
            var r = this
              , i = this.target
              , o = i.style;
            if (e in Ai) {
                if (this.tfm = this.tfm || {},
                "transform" !== e && (~(e = Fi[e] || e).indexOf(",") ? e.split(",").forEach(function(s) {
                    return r.tfm[s] = Ri(i, s)
                }) : this.tfm[e] = i._gsap.x ? i._gsap[e] : Ri(i, e)),
                this.props.indexOf(Ye) >= 0)
                    return;
                i._gsap.svg && (this.svgo = i.getAttribute("data-svg-origin"),
                this.props.push(Ir, n, "")),
                e = Ye
            }
            (o || n) && this.props.push(e, n, o[e])
        }, VS = function(e) {
            e.translate && (e.removeProperty("translate"),
            e.removeProperty("scale"),
            e.removeProperty("rotate"))
        }, qj = function() {
            var o, s, e = this.props, n = this.target, r = n.style, i = n._gsap;
            for (o = 0; o < e.length; o += 3)
                e[o + 1] ? n[e[o]] = e[o + 2] : e[o + 2] ? r[e[o]] = e[o + 2] : r.removeProperty(e[o].replace(Nm, "-$1").toLowerCase());
            if (this.tfm) {
                for (s in this.tfm)
                    i[s] = this.tfm[s];
                i.svg && (i.renderTransform(),
                n.setAttribute("data-svg-origin", this.svgo || "")),
                (o = Om()) && !o.isStart && !r[Ye] && (VS(r),
                i.uncache = 1)
            }
        }, $S = function(e, n) {
            var r = {
                target: e,
                props: [],
                revert: qj,
                save: Wj
            };
            return n && n.split(",").forEach(function(i) {
                return r.save(i)
            }),
            r
        }, Lm = function(e, n) {
            var r = oo.createElementNS ? oo.createElementNS((n || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : oo.createElement(e);
            return r.style ? r : oo.createElement(e)
        }, Xr = function t(e, n, r) {
            var i = getComputedStyle(e);
            return i[n] || i.getPropertyValue(n.replace(Nm, "-$1").toLowerCase()) || i.getPropertyValue(n) || !r && t(e, Da(n) || n, 1) || ""
        }, HS = "O,Moz,ms,Ms,Webkit".split(","), Da = function(e, n, r) {
            var o = (n || Wo).style
              , s = 5;
            if (e in o && !r)
                return e;
            for (e = e.charAt(0).toUpperCase() + e.substr(1); s-- && !(HS[s] + e in o); )
                ;
            return s < 0 ? null : (3 === s ? "ms" : s >= 0 ? HS[s] : "") + e
        }, Bm = function() {
            typeof window < "u" && window.document && (NS = window,
            pa = (oo = NS.document).documentElement,
            Wo = Lm("div") || {
                style: {}
            },
            Lm("div"),
            Ye = Da(Ye),
            Ir = Ye + "Origin",
            Wo.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0",
            US = !!Da("perspective"),
            Om = zn.core.reverting,
            Pm = 1)
        }, jm = function t(e) {
            var s, n = Lm("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = this.parentNode, i = this.nextSibling, o = this.style.cssText;
            if (pa.appendChild(n),
            n.appendChild(this),
            this.style.display = "block",
            e)
                try {
                    s = this.getBBox(),
                    this._gsapBBox = this.getBBox,
                    this.getBBox = t
                } catch {}
            else
                this._gsapBBox && (s = this._gsapBBox());
            return r && (i ? r.insertBefore(this, i) : r.appendChild(this)),
            pa.removeChild(n),
            this.style.cssText = o,
            s
        }, zS = function(e, n) {
            for (var r = n.length; r--; )
                if (e.hasAttribute(n[r]))
                    return e.getAttribute(n[r])
        }, GS = function(e) {
            var n;
            try {
                n = e.getBBox()
            } catch {
                n = jm.call(e, !0)
            }
            return n && (n.width || n.height) || e.getBBox === jm || (n = jm.call(e, !0)),
            !n || n.width || n.x || n.y ? n : {
                x: +zS(e, ["x", "cx", "x1"]) || 0,
                y: +zS(e, ["y", "cy", "y1"]) || 0,
                width: 0,
                height: 0
            }
        }, WS = function(e) {
            return !(!e.getCTM || e.parentNode && !e.ownerSVGElement || !GS(e))
        }, Xu = function(e, n) {
            if (n) {
                var r = e.style;
                n in Ai && n !== Ir && (n = Ye),
                r.removeProperty ? (("ms" === n.substr(0, 2) || "webkit" === n.substr(0, 6)) && (n = "-" + n),
                r.removeProperty(n.replace(Nm, "-$1").toLowerCase())) : r.removeAttribute(n)
            }
        }, so = function(e, n, r, i, o, s) {
            var a = new Mn(e._pt,n,r,0,1,s ? jS : BS);
            return e._pt = a,
            a.b = i,
            a.e = o,
            e._props.push(r),
            a
        }, qS = {
            deg: 1,
            rad: 1,
            turn: 1
        }, Yj = {
            grid: 1,
            flex: 1
        }, ao = function t(e, n, r, i) {
            var p, g, m, _, o = parseFloat(r) || 0, s = (r + "").trim().substr((o + "").length) || "px", a = Wo.style, u = Nj.test(n), l = "svg" === e.tagName.toLowerCase(), c = (l ? "client" : "offset") + (u ? "Width" : "Height"), d = 100, f = "px" === i, h = "%" === i;
            return i === s || !o || qS[i] || qS[s] ? o : ("px" !== s && !f && (o = t(e, n, r, "px")),
            _ = e.getCTM && WS(e),
            !h && "%" !== s || !Ai[n] && !~n.indexOf("adius") ? (a[u ? "width" : "height"] = d + (f ? s : i),
            g = ~n.indexOf("adius") || "em" === i && e.appendChild && !l ? e : e.parentNode,
            _ && (g = (e.ownerSVGElement || {}).parentNode),
            (!g || g === oo || !g.appendChild) && (g = oo.body),
            (m = g._gsap) && h && m.width && u && m.time === Hn.time && !m.uncache ? lt(o / m.width * d) : ((h || "%" === s) && !Yj[Xr(g, "display")] && (a.position = Xr(e, "position")),
            g === e && (a.position = "static"),
            g.appendChild(Wo),
            p = Wo[c],
            g.removeChild(Wo),
            a.position = "absolute",
            u && h && ((m = $o(g)).time = Hn.time,
            m.width = g[c]),
            lt(f ? p * o / d : p && o ? d / p * o : 0))) : (p = _ ? e.getBBox()[u ? "width" : "height"] : e[c],
            lt(h ? o / p * d : o / 100 * p)))
        }, Ri = function(e, n, r, i) {
            var o;
            return Pm || Bm(),
            n in Fi && "transform" !== n && ~(n = Fi[n]).indexOf(",") && (n = n.split(",")[0]),
            Ai[n] && "transform" !== n ? (o = el(e, i),
            o = "transformOrigin" !== n ? o[n] : o.svg ? o.origin : Bd(Xr(e, Ir)) + " " + o.zOrigin + "px") : (!(o = e.style[n]) || "auto" === o || i || ~(o + "").indexOf("calc(")) && (o = Ld[n] && Ld[n](e, n, r) || Xr(e, n) || Jb(e, n) || ("opacity" === n ? 1 : 0)),
            r && !~(o + "").trim().indexOf(" ") ? ao(e, n, o, r) + r : o
        }, Zj = function(e, n, r, i) {
            if (!r || "none" === r) {
                var o = Da(n, e, 1)
                  , s = o && Xr(e, o, 1);
                s && s !== r ? (n = o,
                r = s) : "borderColor" === n && (r = Xr(e, "borderTopColor"))
            }
            var c, d, f, h, p, g, m, _, y, D, v, a = new Mn(this._pt,e.style,n,0,1,FS), u = 0, l = 0;
            if (a.b = r,
            a.e = i,
            r += "",
            "auto" == (i += "") && (e.style[n] = i,
            i = Xr(e, n) || i,
            e.style[n] = r),
            CS(c = [r, i]),
            i = c[1],
            f = (r = c[0]).match(sa) || [],
            (i.match(sa) || []).length) {
                for (; d = sa.exec(i); )
                    m = d[0],
                    y = i.substring(u, d.index),
                    p ? p = (p + 1) % 5 : ("rgba(" === y.substr(-5) || "hsla(" === y.substr(-5)) && (p = 1),
                    m !== (g = f[l++] || "") && (h = parseFloat(g) || 0,
                    v = g.substr((h + "").length),
                    "=" === m.charAt(1) && (m = aa(h, m) + v),
                    _ = parseFloat(m),
                    D = m.substr((_ + "").length),
                    u = sa.lastIndex - D.length,
                    D || (D = D || Vn.units[n] || v,
                    u === i.length && (i += D,
                    a.e += D)),
                    v !== D && (h = ao(e, n, g, D) || 0),
                    a._pt = {
                        _next: a._pt,
                        p: y || 1 === l ? y : ",",
                        s: h,
                        c: _ - h,
                        m: p && p < 4 || "zIndex" === n ? Math.round : 0
                    });
                a.c = u < i.length ? i.substring(u, i.length) : ""
            } else
                a.r = "display" === n && "none" === i ? jS : BS;
            return Wb.test(i) && (a.e = 0),
            this._pt = a,
            a
        }, YS = {
            top: "0%",
            bottom: "100%",
            left: "0%",
            right: "100%",
            center: "50%"
        }, Qj = function(e) {
            var n = e.split(" ")
              , r = n[0]
              , i = n[1] || "50%";
            return ("top" === r || "bottom" === r || "left" === i || "right" === i) && (e = r,
            r = i,
            i = e),
            n[0] = YS[r] || r,
            n[1] = YS[i] || i,
            n.join(" ")
        }, Kj = function(e, n) {
            if (n.tween && n.tween._time === n.tween._dur) {
                var a, u, l, r = n.t, i = r.style, o = n.u, s = r._gsap;
                if ("all" === o || !0 === o)
                    i.cssText = "",
                    u = 1;
                else
                    for (l = (o = o.split(",")).length; --l > -1; )
                        Ai[a = o[l]] && (u = 1,
                        a = "transformOrigin" === a ? Ir : Ye),
                        Xu(r, a);
                u && (Xu(r, Ye),
                s && (s.svg && r.removeAttribute("transform"),
                el(r, 1),
                s.uncache = 1,
                VS(i)))
            }
        }, Ld = {
            clearProps: function(e, n, r, i, o) {
                if ("isFromStart" !== o.data) {
                    var s = e._pt = new Mn(e._pt,n,r,0,0,Kj);
                    return s.u = i,
                    s.pr = -10,
                    s.tween = o,
                    e._props.push(r),
                    1
                }
            }
        }, Ju = [1, 0, 0, 1, 0, 0], ZS = {}, QS = function(e) {
            return "matrix(1, 0, 0, 1, 0, 0)" === e || "none" === e || !e
        }, KS = function(e) {
            var n = Xr(e, Ye);
            return QS(n) ? Ju : n.substr(7).match(Gb).map(lt)
        }, Vm = function(e, n) {
            var s, a, u, l, r = e._gsap || $o(e), i = e.style, o = KS(e);
            return r.svg && e.getAttribute("transform") ? "1,0,0,1,0,0" === (o = [(u = e.transform.baseVal.consolidate().matrix).a, u.b, u.c, u.d, u.e, u.f]).join(",") ? Ju : o : (o === Ju && !e.offsetParent && e !== pa && !r.svg && (u = i.display,
            i.display = "block",
            (!(s = e.parentNode) || !e.offsetParent) && (l = 1,
            a = e.nextElementSibling,
            pa.appendChild(e)),
            o = KS(e),
            u ? i.display = u : Xu(e, "display"),
            l && (a ? s.insertBefore(e, a) : s ? s.appendChild(e) : pa.removeChild(e))),
            n && o.length > 6 ? [o[0], o[1], o[4], o[5], o[12], o[13]] : o)
        }, $m = function(e, n, r, i, o, s) {
            var S, E, M, a = e._gsap, u = o || Vm(e, !0), l = a.xOrigin || 0, c = a.yOrigin || 0, d = a.xOffset || 0, f = a.yOffset || 0, h = u[0], p = u[1], g = u[2], m = u[3], _ = u[4], y = u[5], D = n.split(" "), v = parseFloat(D[0]) || 0, w = parseFloat(D[1]) || 0;
            r ? u !== Ju && (E = h * m - p * g) && (M = v * (-p / E) + w * (h / E) - (h * y - p * _) / E,
            v = v * (m / E) + w * (-g / E) + (g * y - m * _) / E,
            w = M) : (v = (S = GS(e)).x + (~D[0].indexOf("%") ? v / 100 * S.width : v),
            w = S.y + (~(D[1] || D[0]).indexOf("%") ? w / 100 * S.height : w)),
            i || !1 !== i && a.smooth ? (a.xOffset = d + ((_ = v - l) * h + (y = w - c) * g) - _,
            a.yOffset = f + (_ * p + y * m) - y) : a.xOffset = a.yOffset = 0,
            a.xOrigin = v,
            a.yOrigin = w,
            a.smooth = !!i,
            a.origin = n,
            a.originIsAbsolute = !!r,
            e.style[Ir] = "0px 0px",
            s && (so(s, a, "xOrigin", l, v),
            so(s, a, "yOrigin", c, w),
            so(s, a, "xOffset", d, a.xOffset),
            so(s, a, "yOffset", f, a.yOffset)),
            e.setAttribute("data-svg-origin", v + " " + w)
        }, el = function(e, n) {
            var r = e._gsap || new SS(e);
            if ("x"in r && !n && !r.uncache)
                return r;
            var c, d, f, h, p, g, m, _, y, D, v, w, S, E, x, M, A, k, L, pe, ae, ne, R, j, H, T, C, Ae, ze, Fn, Fe, ge, i = e.style, o = r.scaleX < 0, s = "px", a = "deg", u = getComputedStyle(e), l = Xr(e, Ir) || "0";
            return c = d = f = g = m = _ = y = D = v = 0,
            h = p = 1,
            r.svg = !(!e.getCTM || !WS(e)),
            u.translate && (("none" !== u.translate || "none" !== u.scale || "none" !== u.rotate) && (i[Ye] = ("none" !== u.translate ? "translate3d(" + (u.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + ("none" !== u.rotate ? "rotate(" + u.rotate + ") " : "") + ("none" !== u.scale ? "scale(" + u.scale.split(" ").join(",") + ") " : "") + ("none" !== u[Ye] ? u[Ye] : "")),
            i.scale = i.rotate = i.translate = "none"),
            E = Vm(e, r.svg),
            r.svg && (r.uncache ? (H = e.getBBox(),
            l = r.xOrigin - H.x + "px " + (r.yOrigin - H.y) + "px",
            j = "") : j = !n && e.getAttribute("data-svg-origin"),
            $m(e, j || l, !!j || r.originIsAbsolute, !1 !== r.smooth, E)),
            w = r.xOrigin || 0,
            S = r.yOrigin || 0,
            E !== Ju && (k = E[0],
            L = E[1],
            pe = E[2],
            ae = E[3],
            c = ne = E[4],
            d = R = E[5],
            6 === E.length ? (h = Math.sqrt(k * k + L * L),
            p = Math.sqrt(ae * ae + pe * pe),
            g = k || L ? ma(L, k) * qo : 0,
            (y = pe || ae ? ma(pe, ae) * qo + g : 0) && (p *= Math.abs(Math.cos(y * ga))),
            r.svg && (c -= w - (w * k + S * pe),
            d -= S - (w * L + S * ae))) : (Fn = E[7],
            C = E[8],
            Ae = E[9],
            Fe = E[11],
            c = E[12],
            d = E[13],
            f = E[14],
            m = (x = ma(ge = E[6], ze = E[10])) * qo,
            x && (j = ne * (M = Math.cos(-x)) + C * (A = Math.sin(-x)),
            H = R * M + Ae * A,
            T = ge * M + ze * A,
            C = ne * -A + C * M,
            Ae = R * -A + Ae * M,
            ze = ge * -A + ze * M,
            Fe = Fn * -A + Fe * M,
            ne = j,
            R = H,
            ge = T),
            _ = (x = ma(-pe, ze)) * qo,
            x && (M = Math.cos(-x),
            Fe = ae * (A = Math.sin(-x)) + Fe * M,
            k = j = k * M - C * A,
            L = H = L * M - Ae * A,
            pe = T = pe * M - ze * A),
            g = (x = ma(L, k)) * qo,
            x && (j = k * (M = Math.cos(x)) + L * (A = Math.sin(x)),
            H = ne * M + R * A,
            L = L * M - k * A,
            R = R * M - ne * A,
            k = j,
            ne = H),
            m && Math.abs(m) + Math.abs(g) > 359.9 && (m = g = 0,
            _ = 180 - _),
            h = lt(Math.sqrt(k * k + L * L + pe * pe)),
            p = lt(Math.sqrt(R * R + ge * ge)),
            x = ma(ne, R),
            y = Math.abs(x) > 2e-4 ? x * qo : 0,
            v = Fe ? 1 / (Fe < 0 ? -Fe : Fe) : 0),
            r.svg && (j = e.getAttribute("transform"),
            r.forceCSS = e.setAttribute("transform", "") || !QS(Xr(e, Ye)),
            j && e.setAttribute("transform", j))),
            Math.abs(y) > 90 && Math.abs(y) < 270 && (o ? (h *= -1,
            y += g <= 0 ? 180 : -180,
            g += g <= 0 ? 180 : -180) : (p *= -1,
            y += y <= 0 ? 180 : -180)),
            n = n || r.uncache,
            r.x = c - ((r.xPercent = c && (!n && r.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-c) ? -50 : 0))) ? e.offsetWidth * r.xPercent / 100 : 0) + s,
            r.y = d - ((r.yPercent = d && (!n && r.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-d) ? -50 : 0))) ? e.offsetHeight * r.yPercent / 100 : 0) + s,
            r.z = f + s,
            r.scaleX = lt(h),
            r.scaleY = lt(p),
            r.rotation = lt(g) + a,
            r.rotationX = lt(m) + a,
            r.rotationY = lt(_) + a,
            r.skewX = y + a,
            r.skewY = D + a,
            r.transformPerspective = v + s,
            (r.zOrigin = parseFloat(l.split(" ")[2]) || 0) && (i[Ir] = Bd(l)),
            r.xOffset = r.yOffset = 0,
            r.force3D = Vn.force3D,
            r.renderTransform = r.svg ? Jj : US ? XS : Xj,
            r.uncache = 0,
            r
        }, Bd = function(e) {
            return (e = e.split(" "))[0] + " " + e[1]
        }, Um = function(e, n, r) {
            var i = Qt(n);
            return lt(parseFloat(n) + parseFloat(ao(e, "x", r + "px", i))) + i
        }, Xj = function(e, n) {
            n.z = "0px",
            n.rotationY = n.rotationX = "0deg",
            n.force3D = 0,
            XS(e, n)
        }, Yo = "0deg", tl = "0px", Zo = ") ", XS = function(e, n) {
            var r = n || this
              , i = r.xPercent
              , o = r.yPercent
              , s = r.x
              , a = r.y
              , u = r.z
              , l = r.rotation
              , c = r.rotationY
              , d = r.rotationX
              , f = r.skewX
              , h = r.skewY
              , p = r.scaleX
              , g = r.scaleY
              , m = r.transformPerspective
              , _ = r.force3D
              , y = r.target
              , D = r.zOrigin
              , v = ""
              , w = "auto" === _ && e && 1 !== e || !0 === _;
            if (D && (d !== Yo || c !== Yo)) {
                var M, S = parseFloat(c) * ga, E = Math.sin(S), x = Math.cos(S);
                S = parseFloat(d) * ga,
                M = Math.cos(S),
                s = Um(y, s, E * M * -D),
                a = Um(y, a, -Math.sin(S) * -D),
                u = Um(y, u, x * M * -D + D)
            }
            m !== tl && (v += "perspective(" + m + Zo),
            (i || o) && (v += "translate(" + i + "%, " + o + "%) "),
            (w || s !== tl || a !== tl || u !== tl) && (v += u !== tl || w ? "translate3d(" + s + ", " + a + ", " + u + ") " : "translate(" + s + ", " + a + Zo),
            l !== Yo && (v += "rotate(" + l + Zo),
            c !== Yo && (v += "rotateY(" + c + Zo),
            d !== Yo && (v += "rotateX(" + d + Zo),
            (f !== Yo || h !== Yo) && (v += "skew(" + f + ", " + h + Zo),
            (1 !== p || 1 !== g) && (v += "scale(" + p + ", " + g + Zo),
            y.style[Ye] = v || "translate(0, 0)"
        }, Jj = function(e, n) {
            var w, S, E, x, M, r = n || this, i = r.xPercent, o = r.yPercent, s = r.x, a = r.y, u = r.rotation, l = r.skewX, c = r.skewY, d = r.scaleX, f = r.scaleY, h = r.target, p = r.xOrigin, g = r.yOrigin, m = r.xOffset, _ = r.yOffset, y = r.forceCSS, D = parseFloat(s), v = parseFloat(a);
            u = parseFloat(u),
            l = parseFloat(l),
            (c = parseFloat(c)) && (l += c = parseFloat(c),
            u += c),
            u || l ? (u *= ga,
            l *= ga,
            w = Math.cos(u) * d,
            S = Math.sin(u) * d,
            E = Math.sin(u - l) * -f,
            x = Math.cos(u - l) * f,
            l && (c *= ga,
            M = Math.tan(l - c),
            E *= M = Math.sqrt(1 + M * M),
            x *= M,
            c && (M = Math.tan(c),
            w *= M = Math.sqrt(1 + M * M),
            S *= M)),
            w = lt(w),
            S = lt(S),
            E = lt(E),
            x = lt(x)) : (w = d,
            x = f,
            S = E = 0),
            (D && !~(s + "").indexOf("px") || v && !~(a + "").indexOf("px")) && (D = ao(h, "x", s, "px"),
            v = ao(h, "y", a, "px")),
            (p || g || m || _) && (D = lt(D + p - (p * w + g * E) + m),
            v = lt(v + g - (p * S + g * x) + _)),
            (i || o) && (M = h.getBBox(),
            D = lt(D + i / 100 * M.width),
            v = lt(v + o / 100 * M.height)),
            h.setAttribute("transform", M = "matrix(" + w + "," + S + "," + E + "," + x + "," + D + "," + v + ")"),
            y && (h.style[Ye] = M)
        }, eV = function(e, n, r, i, o) {
            var d, f, s = 360, a = At(o), l = parseFloat(o) * (a && ~o.indexOf("rad") ? qo : 1) - i, c = i + l + "deg";
            return a && ("short" === (d = o.split("_")[1]) && (l %= s) != l % 180 && (l += l < 0 ? s : -s),
            "cw" === d && l < 0 ? l = (l + s * LS) % s - ~~(l / s) * s : "ccw" === d && l > 0 && (l = (l - s * LS) % s - ~~(l / s) * s)),
            e._pt = f = new Mn(e._pt,n,r,i,l,Lj),
            f.e = c,
            f.u = "deg",
            e._props.push(r),
            f
        }, JS = function(e, n) {
            for (var r in n)
                e[r] = n[r];
            return e
        }, tV = function(e, n, r) {
            var a, u, l, c, d, f, p, i = JS({}, r._gsap), s = r.style;
            for (u in i.svg ? (l = r.getAttribute("transform"),
            r.setAttribute("transform", ""),
            s[Ye] = n,
            a = el(r, 1),
            Xu(r, Ye),
            r.setAttribute("transform", l)) : (l = getComputedStyle(r)[Ye],
            s[Ye] = n,
            a = el(r, 1),
            s[Ye] = l),
            Ai)
                (l = i[u]) !== (c = a[u]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(u) < 0 && (d = Qt(l) !== (p = Qt(c)) ? ao(r, u, l, p) : parseFloat(l),
                f = parseFloat(c),
                e._pt = new Mn(e._pt,a,u,d,f - d,km),
                e._pt.u = p || 0,
                e._props.push(u));
            JS(a, i)
        };
        Tn("padding,margin,Width,Radius", function(t, e) {
            var n = "Top"
              , r = "Right"
              , i = "Bottom"
              , o = "Left"
              , s = (e < 3 ? [n, r, i, o] : [n + o, n + r, i + r, i + o]).map(function(a) {
                return e < 2 ? t + a : "border" + a + t
            });
            Ld[e > 1 ? "border" + t : t] = function(a, u, l, c, d) {
                var f, h;
                if (arguments.length < 4)
                    return f = s.map(function(p) {
                        return Ri(a, p, l)
                    }),
                    5 === (h = f.join(" ")).split(f[0]).length ? f[0] : h;
                f = (c + "").split(" "),
                h = {},
                s.forEach(function(p, g) {
                    return h[p] = f[g] = f[g] || f[(g - 1) / 2 | 0]
                }),
                a.init(u, h, d)
            }
        });
        var e1 = {
            name: "css",
            register: Bm,
            targetTest: function(e) {
                return e.style && e.nodeType
            },
            init: function(e, n, r, i, o) {
                var l, c, d, f, h, p, g, m, _, y, D, v, w, S, E, x, s = this._props, a = e.style, u = r.vars.startAt;
                for (g in Pm || Bm(),
                this.styles = this.styles || $S(e),
                x = this.styles.props,
                this.tween = r,
                n)
                    if ("autoRound" !== g && (c = n[g],
                    !Un[g] || !TS(g, n, r, i, e, o)))
                        if (p = Ld[g],
                        "function" == (h = typeof c) && (h = typeof (c = c.call(r, i, e, o))),
                        "string" === h && ~c.indexOf("random(") && (c = qu(c)),
                        p)
                            p(this, e, g, c, r) && (E = 1);
                        else if ("--" === g.substr(0, 2))
                            l = (getComputedStyle(e).getPropertyValue(g) + "").trim(),
                            c += "",
                            ro.lastIndex = 0,
                            ro.test(l) || (m = Qt(l),
                            _ = Qt(c)),
                            _ ? m !== _ && (l = ao(e, g, l, _) + _) : m && (c += m),
                            this.add(a, "setProperty", l, c, i, o, 0, 0, g),
                            s.push(g),
                            x.push(g, 0, a[g]);
                        else if ("undefined" !== h) {
                            if (u && g in u ? (l = "function" == typeof u[g] ? u[g].call(r, i, e, o) : u[g],
                            At(l) && ~l.indexOf("random(") && (l = qu(l)),
                            Qt(l + "") || (l += Vn.units[g] || Qt(Ri(e, g)) || ""),
                            "=" === (l + "").charAt(1) && (l = Ri(e, g))) : l = Ri(e, g),
                            f = parseFloat(l),
                            (y = "string" === h && "=" === c.charAt(1) && c.substr(0, 2)) && (c = c.substr(2)),
                            d = parseFloat(c),
                            g in Fi && ("autoAlpha" === g && (1 === f && "hidden" === Ri(e, "visibility") && d && (f = 0),
                            x.push("visibility", 0, a.visibility),
                            so(this, a, "visibility", f ? "inherit" : "hidden", d ? "inherit" : "hidden", !d)),
                            "scale" !== g && "transform" !== g && ~(g = Fi[g]).indexOf(",") && (g = g.split(",")[0])),
                            D = g in Ai)
                                if (this.styles.save(g),
                                v || ((w = e._gsap).renderTransform && !n.parseTransform || el(e, n.parseTransform),
                                S = !1 !== n.smoothOrigin && w.smooth,
                                (v = this._pt = new Mn(this._pt,a,Ye,0,1,w.renderTransform,w,0,-1)).dep = 1),
                                "scale" === g)
                                    this._pt = new Mn(this._pt,w,"scaleY",w.scaleY,(y ? aa(w.scaleY, y + d) : d) - w.scaleY || 0,km),
                                    this._pt.u = 0,
                                    s.push("scaleY", g),
                                    g += "X";
                                else {
                                    if ("transformOrigin" === g) {
                                        x.push(Ir, 0, a[Ir]),
                                        c = Qj(c),
                                        w.svg ? $m(e, c, 0, S, 0, this) : ((_ = parseFloat(c.split(" ")[2]) || 0) !== w.zOrigin && so(this, w, "zOrigin", w.zOrigin, _),
                                        so(this, a, g, Bd(l), Bd(c)));
                                        continue
                                    }
                                    if ("svgOrigin" === g) {
                                        $m(e, c, 1, S, 0, this);
                                        continue
                                    }
                                    if (g in ZS) {
                                        eV(this, w, g, f, y ? aa(f, y + c) : c);
                                        continue
                                    }
                                    if ("smoothOrigin" === g) {
                                        so(this, w, "smooth", w.smooth, c);
                                        continue
                                    }
                                    if ("force3D" === g) {
                                        w[g] = c;
                                        continue
                                    }
                                    if ("transform" === g) {
                                        tV(this, c, e);
                                        continue
                                    }
                                }
                            else
                                g in a || (g = Da(g) || g);
                            if (D || (d || 0 === d) && (f || 0 === f) && !kj.test(c) && g in a)
                                d || (d = 0),
                                (m = (l + "").substr((f + "").length)) !== (_ = Qt(c) || (g in Vn.units ? Vn.units[g] : m)) && (f = ao(e, g, l, _)),
                                this._pt = new Mn(this._pt,D ? w : a,g,f,(y ? aa(f, y + d) : d) - f,D || "px" !== _ && "zIndex" !== g || !1 === n.autoRound ? km : jj),
                                this._pt.u = _ || 0,
                                m !== _ && "%" !== _ && (this._pt.b = l,
                                this._pt.r = Bj);
                            else if (g in a)
                                Zj.call(this, e, g, l, y ? y + c : c);
                            else if (g in e)
                                this.add(e, g, l || e[g], y ? y + c : c, i, o);
                            else if ("parseTransform" !== g) {
                                cm(g, c);
                                continue
                            }
                            D || (g in a ? x.push(g, 0, a[g]) : x.push(g, 1, l || e[g])),
                            s.push(g)
                        }
                E && RS(this)
            },
            render: function(e, n) {
                if (n.tween._time || !Om())
                    for (var r = n._pt; r; )
                        r.r(e, r.d),
                        r = r._next;
                else
                    n.styles.revert()
            },
            get: Ri,
            aliases: Fi,
            getSetter: function(e, n, r) {
                var i = Fi[n];
                return i && i.indexOf(",") < 0 && (n = i),
                n in Ai && n !== Ir && (e._gsap.x || Ri(e, "x")) ? r && kS === r ? "scale" === n ? Hj : Uj : (kS = r || {}) && ("scale" === n ? zj : Gj) : e.style && !om(e.style[n]) ? Vj : ~n.indexOf("-") ? $j : Mm(e, n)
            },
            core: {
                _removeProperty: Xu,
                _getMatrix: Vm
            }
        };
        zn.utils.checkPrefix = Da,
        zn.core.getStyleSaver = $S,
        function(t, e, n, r) {
            var i = Tn(t + "," + e + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", function(o) {
                Ai[o] = 1
            });
            Tn(e, function(o) {
                Vn.units[o] = "deg",
                ZS[o] = 1
            }),
            Fi[i[13]] = t + "," + e,
            Tn("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", function(o) {
                var s = o.split(":");
                Fi[s[1]] = i[s[0]]
            })
        }("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY"),
        Tn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(t) {
            Vn.units[t] = "px"
        }),
        zn.registerPlugin(e1);
        var t1 = zn.registerPlugin(e1) || zn
          , n1 = /([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/;
        function r1(t) {
            var e = t.nodeType
              , n = "";
            if (1 === e || 9 === e || 11 === e) {
                if ("string" == typeof t.textContent)
                    return t.textContent;
                for (t = t.firstChild; t; t = t.nextSibling)
                    n += r1(t)
            } else if (3 === e || 4 === e)
                return t.nodeValue;
            return n
        }
        var _a, Hm, i1, nl, o1, jd, iV = /(?:\r|\n|\t\t)/g, oV = /(?:\s\s+)/g, s1 = function(e) {
            _a = document,
            Hm = window,
            (nl = nl || e || Hm.gsap || console.warn("Please gsap.registerPlugin(SplitText)")) && (jd = nl.utils.toArray,
            o1 = nl.core.context || function() {}
            ,
            i1 = 1)
        }, sV = 1, a1 = function(e) {
            return Hm.getComputedStyle(e)
        }, zm = function(e) {
            return "absolute" === e.position || !0 === e.absolute
        }, aV = function(e, n) {
            for (var i, r = n.length; --r > -1; )
                if (e.substr(0, (i = n[r]).length) === i)
                    return i.length
        }, u1 = function(e, n) {
            void 0 === e && (e = "");
            var r = ~e.indexOf("++")
              , i = 1;
            return r && (e = e.split("++").join("")),
            function() {
                return "<" + n + " style='position:relative;display:inline-block;'" + (e ? " class='" + e + (r ? i++ : "") + "'>" : ">")
            }
        }, l1 = function t(e, n, r) {
            var i = e.nodeType;
            if (1 === i || 9 === i || 11 === i)
                for (e = e.firstChild; e; e = e.nextSibling)
                    t(e, n, r);
            else
                (3 === i || 4 === i) && (e.nodeValue = e.nodeValue.split(n).join(r))
        }, Gm = function(e, n) {
            for (var r = n.length; --r > -1; )
                e.push(n[r])
        }, c1 = function(e, n, r) {
            for (var i; e && e !== n; ) {
                if (i = e._next || e.nextSibling)
                    return i.textContent.charAt(0) === r;
                e = e.parentNode || e._parent
            }
        }, lV = function t(e) {
            var i, o, n = jd(e.childNodes), r = n.length;
            for (i = 0; i < r; i++)
                (o = n[i])._isSplit ? t(o) : i && o.previousSibling && 3 === o.previousSibling.nodeType ? (o.previousSibling.nodeValue += 3 === o.nodeType ? o.nodeValue : o.firstChild.nodeValue,
                e.removeChild(o)) : 3 !== o.nodeType && (e.insertBefore(o.firstChild, o),
                e.removeChild(o))
        }, Jr = function(e, n) {
            return parseFloat(n[e]) || 0
        }, cV = function(e, n, r, i, o, s, a) {
            var R, j, H, T, C, Ae, ze, Fn, Fe, ge, Re, ke, u = a1(e), l = Jr("paddingLeft", u), c = -999, d = Jr("borderBottomWidth", u) + Jr("borderTopWidth", u), f = Jr("borderLeftWidth", u) + Jr("borderRightWidth", u), h = Jr("paddingTop", u) + Jr("paddingBottom", u), p = Jr("paddingLeft", u) + Jr("paddingRight", u), g = Jr("fontSize", u) * (n.lineThreshold || .2), m = u.textAlign, _ = [], y = [], D = [], v = n.wordDelimiter || " ", w = n.tag ? n.tag : n.span ? "span" : "div", S = n.type || n.split || "chars,words,lines", E = o && ~S.indexOf("lines") ? [] : null, x = ~S.indexOf("words"), M = ~S.indexOf("chars"), A = zm(n), k = n.linesClass, L = ~(k || "").indexOf("++"), pe = [], ae = "flex" === u.display, ne = e.style.display;
            for (L && (k = k.split("++").join("")),
            ae && (e.style.display = "block"),
            H = (j = e.getElementsByTagName("*")).length,
            C = [],
            R = 0; R < H; R++)
                C[R] = j[R];
            if (E || A)
                for (R = 0; R < H; R++)
                    ((Ae = (T = C[R]).parentNode === e) || A || M && !x) && (ke = T.offsetTop,
                    E && Ae && Math.abs(ke - c) > g && ("BR" !== T.nodeName || 0 === R) && (E.push(ze = []),
                    c = ke),
                    A && (T._x = T.offsetLeft,
                    T._y = ke,
                    T._w = T.offsetWidth,
                    T._h = T.offsetHeight),
                    E && ((T._isSplit && Ae || !M && Ae || x && Ae || !x && T.parentNode.parentNode === e && !T.parentNode._isSplit) && (ze.push(T),
                    T._x -= l,
                    c1(T, e, v) && (T._wordEnd = !0)),
                    "BR" === T.nodeName && (T.nextSibling && "BR" === T.nextSibling.nodeName || 0 === R) && E.push([])));
            for (R = 0; R < H; R++)
                if (Ae = (T = C[R]).parentNode === e,
                "BR" !== T.nodeName)
                    if (A && (Fe = T.style,
                    !x && !Ae && (T._x += T.parentNode._x,
                    T._y += T.parentNode._y),
                    Fe.left = T._x + "px",
                    Fe.top = T._y + "px",
                    Fe.position = "absolute",
                    Fe.display = "block",
                    Fe.width = T._w + 1 + "px",
                    Fe.height = T._h + "px"),
                    !x && M)
                        if (T._isSplit)
                            for (T._next = j = T.nextSibling,
                            T.parentNode.appendChild(T); j && 3 === j.nodeType && " " === j.textContent; )
                                T._next = j.nextSibling,
                                T.parentNode.appendChild(j),
                                j = j.nextSibling;
                        else
                            T.parentNode._isSplit ? (T._parent = T.parentNode,
                            !T.previousSibling && T.firstChild && (T.firstChild._isFirst = !0),
                            T.nextSibling && " " === T.nextSibling.textContent && !T.nextSibling.nextSibling && pe.push(T.nextSibling),
                            T._next = T.nextSibling && T.nextSibling._isFirst ? null : T.nextSibling,
                            T.parentNode.removeChild(T),
                            C.splice(R--, 1),
                            H--) : Ae || (ke = !T.nextSibling && c1(T.parentNode, e, v),
                            T.parentNode._parent && T.parentNode._parent.appendChild(T),
                            ke && T.parentNode.appendChild(_a.createTextNode(" ")),
                            "span" === w && (T.style.display = "inline"),
                            _.push(T));
                    else
                        T.parentNode._isSplit && !T._isSplit && "" !== T.innerHTML ? y.push(T) : M && !T._isSplit && ("span" === w && (T.style.display = "inline"),
                        _.push(T));
                else
                    E || A ? (T.parentNode && T.parentNode.removeChild(T),
                    C.splice(R--, 1),
                    H--) : x || e.appendChild(T);
            for (R = pe.length; --R > -1; )
                pe[R].parentNode.removeChild(pe[R]);
            if (E) {
                for (A && (ge = _a.createElement(w),
                e.appendChild(ge),
                Re = ge.offsetWidth + "px",
                ke = ge.offsetParent === e ? 0 : e.offsetLeft,
                e.removeChild(ge)),
                Fe = e.style.cssText,
                e.style.cssText = "display:none;"; e.firstChild; )
                    e.removeChild(e.firstChild);
                for (Fn = " " === v && (!A || !x && !M),
                R = 0; R < E.length; R++) {
                    for (ze = E[R],
                    (ge = _a.createElement(w)).style.cssText = "display:block;text-align:" + m + ";position:" + (A ? "absolute;" : "relative;"),
                    k && (ge.className = k + (L ? R + 1 : "")),
                    D.push(ge),
                    H = ze.length,
                    j = 0; j < H; j++)
                        "BR" !== ze[j].nodeName && (ge.appendChild(T = ze[j]),
                        Fn && T._wordEnd && ge.appendChild(_a.createTextNode(" ")),
                        A && (0 === j && (ge.style.top = T._y + "px",
                        ge.style.left = l + ke + "px"),
                        T.style.top = "0px",
                        ke && (T.style.left = T._x - ke + "px")));
                    0 === H ? ge.innerHTML = "&nbsp;" : !x && !M && (lV(ge),
                    l1(ge, String.fromCharCode(160), " ")),
                    A && (ge.style.width = Re,
                    ge.style.height = T._h + "px"),
                    e.appendChild(ge)
                }
                e.style.cssText = Fe
            }
            A && (a > e.clientHeight && (e.style.height = a - h + "px",
            e.clientHeight < a && (e.style.height = a + d + "px")),
            s > e.clientWidth && (e.style.width = s - p + "px",
            e.clientWidth < s && (e.style.width = s + f + "px"))),
            ae && (ne ? e.style.display = ne : e.style.removeProperty("display")),
            Gm(r, _),
            x && Gm(i, y),
            Gm(o, D)
        }, dV = function(e, n, r, i) {
            var p, g, m, _, y, D, v, w, o = n.tag ? n.tag : n.span ? "span" : "div", a = ~(n.type || n.split || "chars,words,lines").indexOf("chars"), u = zm(n), l = n.wordDelimiter || " ", c = " " !== l ? "" : u ? "&#173; " : " ", d = "</" + o + ">", f = 1, h = n.specialChars ? "function" == typeof n.specialChars ? n.specialChars : aV : null, S = _a.createElement("div"), E = e.parentNode;
            for (E.insertBefore(S, e),
            S.textContent = e.nodeValue,
            E.removeChild(e),
            v = -1 !== (p = r1(e = S)).indexOf("<"),
            !1 !== n.reduceWhiteSpace && (p = p.replace(oV, " ").replace(iV, "")),
            v && (p = p.split("<").join("{{LT}}")),
            y = p.length,
            g = (" " === p.charAt(0) ? c : "") + r(),
            m = 0; m < y; m++)
                if (D = p.charAt(m),
                h && (w = h(p.substr(m), n.specialChars)))
                    D = p.substr(m, w || 1),
                    g += a && " " !== D ? i() + D + "</" + o + ">" : D,
                    m += w - 1;
                else if (D === l && p.charAt(m - 1) !== l && m) {
                    for (g += f ? d : "",
                    f = 0; p.charAt(m + 1) === l; )
                        g += c,
                        m++;
                    m === y - 1 ? g += c : ")" !== p.charAt(m + 1) && (g += c + r(),
                    f = 1)
                } else
                    "{" === D && "{{LT}}" === p.substr(m, 6) ? (g += a ? i() + "{{LT}}</" + o + ">" : "{{LT}}",
                    m += 5) : D.charCodeAt(0) >= 55296 && D.charCodeAt(0) <= 56319 || p.charCodeAt(m + 1) >= 65024 && p.charCodeAt(m + 1) <= 65039 ? (_ = ((p.substr(m, 12).split(n1) || [])[1] || "").length || 2,
                    g += a && " " !== D ? i() + p.substr(m, _) + "</" + o + ">" : p.substr(m, _),
                    m += _ - 1) : g += a && " " !== D ? i() + D + "</" + o + ">" : D;
            e.outerHTML = g + (f ? d : ""),
            v && l1(E, "{{LT}}", "<")
        }, fV = function t(e, n, r, i) {
            var u, l, o = jd(e.childNodes), s = o.length, a = zm(n);
            if (3 !== e.nodeType || s > 1) {
                for (n.absolute = !1,
                u = 0; u < s; u++)
                    (l = o[u])._next = l._isFirst = l._parent = l._wordEnd = null,
                    (3 !== l.nodeType || /\S+/.test(l.nodeValue)) && (a && 3 !== l.nodeType && "inline" === a1(l).display && (l.style.display = "inline-block",
                    l.style.position = "relative"),
                    l._isSplit = !0,
                    t(l, n, r, i));
                return n.absolute = a,
                void (e._isSplit = !0)
            }
            dV(e, n, r, i)
        }, Wm = function() {
            function t(n, r) {
                i1 || s1(),
                this.elements = jd(n),
                this.chars = [],
                this.words = [],
                this.lines = [],
                this._originals = [],
                this.vars = r || {},
                o1(this),
                sV && this.split(r)
            }
            var e = t.prototype;
            return e.split = function(r) {
                this.isSplit && this.revert(),
                this.vars = r = r || this.vars,
                this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
                for (var u, l, c, i = this.elements.length, o = r.tag ? r.tag : r.span ? "span" : "div", s = u1(r.wordsClass, o), a = u1(r.charsClass, o); --i > -1; )
                    this._originals[i] = (c = this.elements[i]).innerHTML,
                    u = c.clientHeight,
                    l = c.clientWidth,
                    fV(c, r, s, a),
                    cV(c, r, this.chars, this.words, this.lines, l, u);
                return this.chars.reverse(),
                this.words.reverse(),
                this.lines.reverse(),
                this.isSplit = !0,
                this
            }
            ,
            e.revert = function() {
                var r = this._originals;
                if (!r)
                    throw "revert() call wasn't scoped properly.";
                return this.elements.forEach(function(i, o) {
                    return i.innerHTML = r[o]
                }),
                this.chars = [],
                this.words = [],
                this.lines = [],
                this.isSplit = !1,
                this
            }
            ,
            t.create = function(r, i) {
                return new t(r,i)
            }
            ,
            t
        }();
        function d1(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r)
            }
        }
        Wm.version = "3.11.4",
        Wm.register = s1;
        var jt, qm, Gn, uo, lo, ya, f1, Qo, rl, h1, Pi, Mr, p1, g1 = function() {
            return jt || typeof window < "u" && (jt = window.gsap) && jt.registerPlugin && jt
        }, m1 = 1, va = [], fe = [], ei = [], il = Date.now, Ym = function(e, n) {
            return n
        }, co = function(e, n) {
            return ~ei.indexOf(e) && ei[ei.indexOf(e) + 1][n]
        }, ol = function(e) {
            return !!~h1.indexOf(e)
        }, xn = function(e, n, r, i, o) {
            return e.addEventListener(n, r, {
                passive: !i,
                capture: !!o
            })
        }, ln = function(e, n, r, i) {
            return e.removeEventListener(n, r, !!i)
        }, Vd = "scrollLeft", $d = "scrollTop", Zm = function() {
            return Pi && Pi.isPressed || fe.cache++
        }, Ud = function(e, n) {
            var r = function i(o) {
                if (o || 0 === o) {
                    m1 && (Gn.history.scrollRestoration = "manual");
                    var s = Pi && Pi.isPressed;
                    o = i.v = Math.round(o) || (Pi && Pi.iOS ? 1 : 0),
                    e(o),
                    i.cacheID = fe.cache,
                    s && Ym("ss", o)
                } else
                    (n || fe.cache !== i.cacheID || Ym("ref")) && (i.cacheID = fe.cache,
                    i.v = e());
                return i.v + i.offset
            };
            return r.offset = 0,
            e && r
        }, cn = {
            s: Vd,
            p: "left",
            p2: "Left",
            os: "right",
            os2: "Right",
            d: "width",
            d2: "Width",
            a: "x",
            sc: Ud(function(t) {
                return arguments.length ? Gn.scrollTo(t, Tt.sc()) : Gn.pageXOffset || uo[Vd] || lo[Vd] || ya[Vd] || 0
            })
        }, Tt = {
            s: $d,
            p: "top",
            p2: "Top",
            os: "bottom",
            os2: "Bottom",
            d: "height",
            d2: "Height",
            a: "y",
            op: cn,
            sc: Ud(function(t) {
                return arguments.length ? Gn.scrollTo(cn.sc(), t) : Gn.pageYOffset || uo[$d] || lo[$d] || ya[$d] || 0
            })
        }, An = function(e) {
            return jt.utils.toArray(e)[0] || ("string" == typeof e && !1 !== jt.config().nullTargetWarn ? console.warn("Element not found:", e) : null)
        }, fo = function(e, n) {
            var r = n.s
              , i = n.sc;
            ol(e) && (e = uo.scrollingElement || lo);
            var o = fe.indexOf(e)
              , s = i === Tt.sc ? 1 : 2;
            !~o && (o = fe.push(e) - 1),
            fe[o + s] || e.addEventListener("scroll", Zm);
            var a = fe[o + s]
              , u = a || (fe[o + s] = Ud(co(e, r), !0) || (ol(e) ? i : Ud(function(l) {
                return arguments.length ? e[r] = l : e[r]
            })));
            return u.target = e,
            a || (u.smooth = "smooth" === jt.getProperty(e, "scrollBehavior")),
            u
        }, Qm = function(e, n, r) {
            var i = e
              , o = e
              , s = il()
              , a = s
              , u = n || 50
              , l = Math.max(500, 3 * u)
              , c = function(p, g) {
                var m = il();
                g || m - s > u ? (o = i,
                i = p,
                a = s,
                s = m) : r ? i += p : i = o + (p - o) / (m - a) * (s - a)
            };
            return {
                update: c,
                reset: function() {
                    o = i = r ? 0 : i,
                    a = s = 0
                },
                getVelocity: function(p) {
                    var g = a
                      , m = o
                      , _ = il();
                    return (p || 0 === p) && p !== i && c(p),
                    s === a || _ - a > l ? 0 : (i + (r ? m : -m)) / ((r ? _ : s) - g) * 1e3
                }
            }
        }, sl = function(e, n) {
            return n && !e._gsapAllow && e.preventDefault(),
            e.changedTouches ? e.changedTouches[0] : e
        }, D1 = function(e) {
            var n = Math.max.apply(Math, e)
              , r = Math.min.apply(Math, e);
            return Math.abs(n) >= Math.abs(r) ? n : r
        }, _1 = function() {
            (rl = jt.core.globals().ScrollTrigger) && rl.core && function() {
                var e = rl.core
                  , n = e.bridge || {}
                  , r = e._scrollers
                  , i = e._proxies;
                r.push.apply(r, fe),
                i.push.apply(i, ei),
                fe = r,
                ei = i,
                Ym = function(s, a) {
                    return n[s](a)
                }
            }()
        }, y1 = function(e) {
            return (jt = e || g1()) && typeof document < "u" && document.body && (Gn = window,
            uo = document,
            h1 = [Gn, uo, lo = uo.documentElement, ya = uo.body],
            p1 = jt.core.context || function() {}
            ,
            Qo = "onpointerenter"in ya ? "pointer" : "mouse",
            f1 = mt.isTouch = Gn.matchMedia && Gn.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart"in Gn || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0,
            Mr = mt.eventTypes = ("ontouchstart"in lo ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown"in lo ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","),
            setTimeout(function() {
                return m1 = 0
            }, 500),
            _1(),
            qm = 1),
            qm
        };
        cn.op = Tt,
        fe.cache = 0;
        var mt = function() {
            function t(n) {
                this.init(n)
            }
            return t.prototype.init = function(r) {
                qm || y1(jt) || console.warn("Please gsap.registerPlugin(Observer)"),
                rl || _1();
                var i = r.tolerance
                  , o = r.dragMinimum
                  , s = r.type
                  , a = r.target
                  , u = r.lineHeight
                  , l = r.debounce
                  , c = r.preventDefault
                  , d = r.onStop
                  , f = r.onStopDelay
                  , h = r.ignore
                  , p = r.wheelSpeed
                  , g = r.event
                  , m = r.onDragStart
                  , _ = r.onDragEnd
                  , y = r.onDrag
                  , D = r.onPress
                  , v = r.onRelease
                  , w = r.onRight
                  , S = r.onLeft
                  , E = r.onUp
                  , x = r.onDown
                  , M = r.onChangeX
                  , A = r.onChangeY
                  , k = r.onChange
                  , L = r.onToggleX
                  , pe = r.onToggleY
                  , ae = r.onHover
                  , ne = r.onHoverEnd
                  , R = r.onMove
                  , j = r.ignoreCheck
                  , H = r.isNormalizer
                  , T = r.onGestureStart
                  , C = r.onGestureEnd
                  , Ae = r.onWheel
                  , ze = r.onEnable
                  , Fn = r.onDisable
                  , Fe = r.onClick
                  , ge = r.scrollSpeed
                  , Re = r.capture
                  , ke = r.allowClicks
                  , hn = r.lockAxis
                  , Dl = r.onLockAxis;
                this.target = a = An(a) || lo,
                this.vars = r,
                h && (h = jt.utils.toArray(h)),
                i = i || 1e-9,
                o = o || 0,
                p = p || 1,
                ge = ge || 1,
                s = s || "wheel,touch,pointer",
                l = !1 !== l,
                u || (u = parseFloat(Gn.getComputedStyle(ya).lineHeight) || 22);
                var Yn, pr, Ee, Jt, Zn, ni, pn, b = this, Ni = 0, Ze = 0, mo = fo(a, cn), Do = fo(a, Tt), Ma = mo(), gn = Do(), _l = ~s.indexOf("touch") && !~s.indexOf("pointer") && "pointerdown" === Mr[0], _o = ol(a), dt = a.ownerDocument || uo, Qn = [0, 0, 0], mn = [0, 0, 0], yl = 0, Dn = function() {
                    return yl = il()
                }, ri = function(V, F) {
                    return (b.event = V) && h && ~h.indexOf(V.target) || F && _l && "touch" !== V.pointerType || j && j(V, F)
                }, yo = function() {
                    var V = b.deltaX = D1(Qn)
                      , F = b.deltaY = D1(mn)
                      , Y = Math.abs(V) >= i
                      , Z = Math.abs(F) >= i;
                    k && (Y || Z) && k(b, V, F, Qn, mn),
                    Y && (w && b.deltaX > 0 && w(b),
                    S && b.deltaX < 0 && S(b),
                    M && M(b),
                    L && b.deltaX < 0 != Ni < 0 && L(b),
                    Ni = b.deltaX,
                    Qn[0] = Qn[1] = Qn[2] = 0),
                    Z && (x && b.deltaY > 0 && x(b),
                    E && b.deltaY < 0 && E(b),
                    A && A(b),
                    pe && b.deltaY < 0 != Ze < 0 && pe(b),
                    Ze = b.deltaY,
                    mn[0] = mn[1] = mn[2] = 0),
                    (Jt || Ee) && (R && R(b),
                    Ee && (y(b),
                    Ee = !1),
                    Jt = !1),
                    ni && !(ni = !1) && Dl && Dl(b),
                    Zn && (Ae(b),
                    Zn = !1),
                    Yn = 0
                }, xa = function(V, F, Y) {
                    Qn[Y] += V,
                    mn[Y] += F,
                    b._vx.update(V),
                    b._vy.update(F),
                    l ? Yn || (Yn = requestAnimationFrame(yo)) : yo()
                }, is = function(V, F) {
                    hn && !pn && (b.axis = pn = Math.abs(V) > Math.abs(F) ? "x" : "y",
                    ni = !0),
                    "y" !== pn && (Qn[2] += V,
                    b._vx.update(V, !0)),
                    "x" !== pn && (mn[2] += F,
                    b._vy.update(F, !0)),
                    l ? Yn || (Yn = requestAnimationFrame(yo)) : yo()
                }, os = function(V) {
                    if (!ri(V, 1)) {
                        var F = (V = sl(V, c)).clientX
                          , Y = V.clientY
                          , Z = F - b.x
                          , ie = Y - b.y
                          , Rt = b.isDragging;
                        b.x = F,
                        b.y = Y,
                        (Rt || Math.abs(b.startX - F) >= o || Math.abs(b.startY - Y) >= o) && (y && (Ee = !0),
                        Rt || (b.isDragging = !0),
                        is(Z, ie),
                        Rt || m && m(b))
                    }
                }, be = b.onPress = function(we) {
                    ri(we, 1) || (b.axis = pn = null,
                    pr.pause(),
                    b.isPressed = !0,
                    we = sl(we),
                    Ni = Ze = 0,
                    b.startX = b.x = we.clientX,
                    b.startY = b.y = we.clientY,
                    b._vx.reset(),
                    b._vy.reset(),
                    xn(H ? a : dt, Mr[1], os, c, !0),
                    b.deltaX = b.deltaY = 0,
                    D && D(b))
                }
                , ki = function(V) {
                    if (!ri(V, 1)) {
                        ln(H ? a : dt, Mr[1], os, !0);
                        var F = !isNaN(b.y - b.startY)
                          , Y = b.isDragging && (Math.abs(b.x - b.startX) > 3 || Math.abs(b.y - b.startY) > 3)
                          , Z = sl(V);
                        !Y && F && (b._vx.reset(),
                        b._vy.reset(),
                        c && ke && jt.delayedCall(.08, function() {
                            if (il() - yl > 300 && !V.defaultPrevented)
                                if (V.target.click)
                                    V.target.click();
                                else if (dt.createEvent) {
                                    var ie = dt.createEvent("MouseEvents");
                                    ie.initMouseEvent("click", !0, !0, Gn, 1, Z.screenX, Z.screenY, Z.clientX, Z.clientY, !1, !1, !1, !1, 0, null),
                                    V.target.dispatchEvent(ie)
                                }
                        })),
                        b.isDragging = b.isGesturing = b.isPressed = !1,
                        d && !H && pr.restart(!0),
                        _ && Y && _(b),
                        v && v(b, Y)
                    }
                }, Pr = function(V) {
                    return V.touches && V.touches.length > 1 && (b.isGesturing = !0) && T(V, b.isDragging)
                }, Or = function() {
                    return (b.isGesturing = !1) || C(b)
                }, ii = function(V) {
                    if (!ri(V)) {
                        var F = mo()
                          , Y = Do();
                        xa((F - Ma) * ge, (Y - gn) * ge, 1),
                        Ma = F,
                        gn = Y,
                        d && pr.restart(!0)
                    }
                }, oi = function(V) {
                    if (!ri(V)) {
                        V = sl(V, c),
                        Ae && (Zn = !0);
                        var F = (1 === V.deltaMode ? u : 2 === V.deltaMode ? Gn.innerHeight : 1) * p;
                        xa(V.deltaX * F, V.deltaY * F, 0),
                        d && !H && pr.restart(!0)
                    }
                }, ss = function(V) {
                    if (!ri(V)) {
                        var F = V.clientX
                          , Y = V.clientY
                          , Z = F - b.x
                          , ie = Y - b.y;
                        b.x = F,
                        b.y = Y,
                        Jt = !0,
                        (Z || ie) && is(Z, ie)
                    }
                }, Aa = function(V) {
                    b.event = V,
                    ae(b)
                }, Li = function(V) {
                    b.event = V,
                    ne(b)
                }, Cl = function(V) {
                    return ri(V) || sl(V, c) && Fe(b)
                };
                pr = b._dc = jt.delayedCall(f || .25, function() {
                    b._vx.reset(),
                    b._vy.reset(),
                    pr.pause(),
                    d && d(b)
                }).pause(),
                b.deltaX = b.deltaY = 0,
                b._vx = Qm(0, 50, !0),
                b._vy = Qm(0, 50, !0),
                b.scrollX = mo,
                b.scrollY = Do,
                b.isDragging = b.isGesturing = b.isPressed = !1,
                p1(this),
                b.enable = function(we) {
                    return b.isEnabled || (xn(_o ? dt : a, "scroll", Zm),
                    s.indexOf("scroll") >= 0 && xn(_o ? dt : a, "scroll", ii, c, Re),
                    s.indexOf("wheel") >= 0 && xn(a, "wheel", oi, c, Re),
                    (s.indexOf("touch") >= 0 && f1 || s.indexOf("pointer") >= 0) && (xn(a, Mr[0], be, c, Re),
                    xn(dt, Mr[2], ki),
                    xn(dt, Mr[3], ki),
                    ke && xn(a, "click", Dn, !1, !0),
                    Fe && xn(a, "click", Cl),
                    T && xn(dt, "gesturestart", Pr),
                    C && xn(dt, "gestureend", Or),
                    ae && xn(a, Qo + "enter", Aa),
                    ne && xn(a, Qo + "leave", Li),
                    R && xn(a, Qo + "move", ss)),
                    b.isEnabled = !0,
                    we && we.type && be(we),
                    ze && ze(b)),
                    b
                }
                ,
                b.disable = function() {
                    b.isEnabled && (va.filter(function(we) {
                        return we !== b && ol(we.target)
                    }).length || ln(_o ? dt : a, "scroll", Zm),
                    b.isPressed && (b._vx.reset(),
                    b._vy.reset(),
                    ln(H ? a : dt, Mr[1], os, !0)),
                    ln(_o ? dt : a, "scroll", ii, Re),
                    ln(a, "wheel", oi, Re),
                    ln(a, Mr[0], be, Re),
                    ln(dt, Mr[2], ki),
                    ln(dt, Mr[3], ki),
                    ln(a, "click", Dn, !0),
                    ln(a, "click", Cl),
                    ln(dt, "gesturestart", Pr),
                    ln(dt, "gestureend", Or),
                    ln(a, Qo + "enter", Aa),
                    ln(a, Qo + "leave", Li),
                    ln(a, Qo + "move", ss),
                    b.isEnabled = b.isPressed = b.isDragging = !1,
                    Fn && Fn(b))
                }
                ,
                b.kill = b.revert = function() {
                    b.disable();
                    var we = va.indexOf(b);
                    we >= 0 && va.splice(we, 1),
                    Pi === b && (Pi = 0)
                }
                ,
                va.push(b),
                H && ol(a) && (Pi = b),
                b.enable(g)
            }
            ,
            function hV(t, e, n) {
                e && d1(t.prototype, e),
                n && d1(t, n)
            }(t, [{
                key: "velocityX",
                get: function() {
                    return this._vx.getVelocity()
                }
            }, {
                key: "velocityY",
                get: function() {
                    return this._vy.getVelocity()
                }
            }]),
            t
        }();
        mt.version = "3.11.4",
        mt.create = function(t) {
            return new mt(t)
        }
        ,
        mt.register = y1,
        mt.getAll = function() {
            return va.slice()
        }
        ,
        mt.getById = function(t) {
            return va.filter(function(e) {
                return e.vars.id === t
            })[0]
        }
        ,
        g1() && jt.registerPlugin(mt);
        var B, Ca, ye, He, xr, et, v1, Hd, zd, wa, Gd, Wd, Kt, qd, Km, dn, C1, w1, Ea, E1, Xm, b1, Wn, S1, T1, I1, ho, Jm, eD, tD, pl, Rr, U1, ml, Yd = 1, fn = Date.now, nD = fn(), fr = 0, Zd = 0, M1 = function() {
            return qd = 1
        }, x1 = function() {
            return qd = 0
        }, ti = function(e) {
            return e
        }, al = function(e) {
            return Math.round(1e5 * e) / 1e5 || 0
        }, A1 = function() {
            return typeof window < "u"
        }, F1 = function() {
            return B || A1() && (B = window.gsap) && B.registerPlugin && B
        }, Ko = function(e) {
            return !!~v1.indexOf(e)
        }, R1 = function(e) {
            return co(e, "getBoundingClientRect") || (Ko(e) ? function() {
                return df.width = ye.innerWidth,
                df.height = ye.innerHeight,
                df
            }
            : function() {
                return Oi(e)
            }
            )
        }, po = function(e, n) {
            var r, i = n.d2, o = n.d, s = n.a;
            return (r = "scroll" + i) && (s = co(e, r)) ? s() - R1(e)()[o] : Ko(e) ? (xr[r] || et[r]) - (ye["inner" + i] || xr["client" + i] || et["client" + i]) : e[r] - e["offset" + i]
        }, Qd = function(e, n) {
            for (var r = 0; r < Ea.length; r += 3)
                (!n || ~n.indexOf(Ea[r + 1])) && e(Ea[r], Ea[r + 1], Ea[r + 2])
        }, Ar = function(e) {
            return "string" == typeof e
        }, Xt = function(e) {
            return "function" == typeof e
        }, ul = function(e) {
            return "number" == typeof e
        }, Kd = function(e) {
            return "object" == typeof e
        }, ll = function(e, n, r) {
            return e && e.progress(n ? 0 : 1) && r && e.pause()
        }, rD = function(e, n) {
            if (e.enabled) {
                var r = n(e);
                r && r.totalTime && (e.callbackAnimation = r)
            }
        }, ba = Math.abs, iD = "right", oD = "bottom", Xo = "width", Jo = "height", cl = "Right", dl = "Left", fl = "Top", hl = "Bottom", ct = "padding", hr = "margin", Sa = "Width", sD = "Height", Vt = "px", Fr = function(e) {
            return ye.getComputedStyle(e)
        }, N1 = function(e, n) {
            for (var r in n)
                r in e || (e[r] = n[r]);
            return e
        }, Oi = function(e, n) {
            var r = n && "matrix(1, 0, 0, 1, 0, 0)" !== Fr(e)[Km] && B.to(e, {
                x: 0,
                y: 0,
                xPercent: 0,
                yPercent: 0,
                rotation: 0,
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                skewX: 0,
                skewY: 0
            }).progress(1)
              , i = e.getBoundingClientRect();
            return r && r.progress(0).kill(),
            i
        }, aD = function(e, n) {
            var r = n.d2;
            return e["offset" + r] || e["client" + r] || 0
        }, k1 = function(e) {
            var o, n = [], r = e.labels, i = e.duration();
            for (o in r)
                n.push(r[o] / i);
            return n
        }, uD = function(e) {
            var n = B.utils.snap(e)
              , r = Array.isArray(e) && e.slice(0).sort(function(i, o) {
                return i - o
            });
            return r ? function(i, o, s) {
                var a;
                if (void 0 === s && (s = .001),
                !o)
                    return n(i);
                if (o > 0) {
                    for (i -= s,
                    a = 0; a < r.length; a++)
                        if (r[a] >= i)
                            return r[a];
                    return r[a - 1]
                }
                for (a = r.length,
                i += s; a--; )
                    if (r[a] <= i)
                        return r[a];
                return r[0]
            }
            : function(i, o, s) {
                void 0 === s && (s = .001);
                var a = n(i);
                return !o || Math.abs(a - i) < s || a - i < 0 == o < 0 ? a : n(o < 0 ? i - e : i + e)
            }
        }, Jd = function(e, n, r, i) {
            return r.split(",").forEach(function(o) {
                return e(n, o, i)
            })
        }, $t = function(e, n, r, i, o) {
            return e.addEventListener(n, r, {
                passive: !i,
                capture: !!o
            })
        }, Ft = function(e, n, r, i) {
            return e.removeEventListener(n, r, !!i)
        }, ef = function(e, n, r) {
            return r && r.wheelHandler && e(n, "wheel", r)
        }, L1 = {
            startColor: "green",
            endColor: "red",
            indent: 0,
            fontSize: "16px",
            fontWeight: "normal"
        }, tf = {
            toggleActions: "play",
            anticipatePin: 0
        }, nf = {
            top: 0,
            left: 0,
            center: .5,
            bottom: 1,
            right: 1
        }, rf = function(e, n) {
            if (Ar(e)) {
                var r = e.indexOf("=")
                  , i = ~r ? +(e.charAt(r - 1) + 1) * parseFloat(e.substr(r + 1)) : 0;
                ~r && (e.indexOf("%") > r && (i *= n / 100),
                e = e.substr(0, r - 1)),
                e = i + (e in nf ? nf[e] * n : ~e.indexOf("%") ? parseFloat(e) * n / 100 : parseFloat(e) || 0)
            }
            return e
        }, sf = function(e, n, r, i, o, s, a, u) {
            var l = o.startColor
              , c = o.endColor
              , d = o.fontSize
              , f = o.indent
              , h = o.fontWeight
              , p = He.createElement("div")
              , g = Ko(r) || "fixed" === co(r, "pinType")
              , m = -1 !== e.indexOf("scroller")
              , _ = g ? et : r
              , y = -1 !== e.indexOf("start")
              , D = y ? l : c
              , v = "border-color:" + D + ";font-size:" + d + ";color:" + D + ";font-weight:" + h + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
            return v += "position:" + ((m || u) && g ? "fixed;" : "absolute;"),
            (m || u || !g) && (v += (i === Tt ? iD : oD) + ":" + (s + parseFloat(f)) + "px;"),
            a && (v += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"),
            p._isStart = y,
            p.setAttribute("class", "gsap-marker-" + e + (n ? " marker-" + n : "")),
            p.style.cssText = v,
            p.innerText = n || 0 === n ? e + "-" + n : e,
            _.children[0] ? _.insertBefore(p, _.children[0]) : _.appendChild(p),
            p._offset = p["offset" + i.op.d2],
            af(p, 0, i, y),
            p
        }, af = function(e, n, r, i) {
            var o = {
                display: "block"
            }
              , s = r[i ? "os2" : "p2"]
              , a = r[i ? "p2" : "os2"];
            e._isFlipped = i,
            o[r.a + "Percent"] = i ? -100 : 0,
            o[r.a] = i ? "1px" : 0,
            o["border" + s + Sa] = 1,
            o["border" + a + Sa] = 0,
            o[r.p] = n + "px",
            B.set(e, o)
        }, ce = [], lD = {}, B1 = function() {
            return fn() - fr > 34 && (pl || (pl = requestAnimationFrame(go)))
        }, Ta = function() {
            (!Wn || !Wn.isPressed || Wn.startX > et.clientWidth) && (fe.cache++,
            Wn ? pl || (pl = requestAnimationFrame(go)) : go(),
            fr || ts("scrollStart"),
            fr = fn())
        }, cD = function() {
            I1 = ye.innerWidth,
            T1 = ye.innerHeight
        }, gl = function() {
            fe.cache++,
            !Kt && !b1 && !He.fullscreenElement && !He.webkitFullscreenElement && (!S1 || I1 !== ye.innerWidth || Math.abs(ye.innerHeight - T1) > .25 * ye.innerHeight) && Hd.restart(!0)
        }, es = {}, CV = [], j1 = function t() {
            return Ft(ve, "scrollEnd", t) || rs(!0)
        }, ts = function(e) {
            return es[e] && es[e].map(function(n) {
                return n()
            }) || CV
        }, qn = [], V1 = function(e) {
            for (var n = 0; n < qn.length; n += 5)
                (!e || qn[n + 4] && qn[n + 4].query === e) && (qn[n].style.cssText = qn[n + 1],
                qn[n].getBBox && qn[n].setAttribute("transform", qn[n + 2] || ""),
                qn[n + 3].uncache = 1)
        }, dD = function(e, n) {
            var r;
            for (dn = 0; dn < ce.length; dn++)
                (r = ce[dn]) && (!n || r._ctx === n) && (e ? r.kill(1) : r.revert(!0, !0));
            n && V1(n),
            n || ts("revert")
        }, $1 = function(e, n) {
            fe.cache++,
            (n || !Rr) && fe.forEach(function(r) {
                return Xt(r) && r.cacheID++ && (r.rec = 0)
            }),
            Ar(e) && (ye.history.scrollRestoration = eD = e)
        }, ns = 0, rs = function(e, n) {
            if (!fr || e) {
                Rr = ve.isRefreshing = !0,
                fe.forEach(function(i) {
                    return Xt(i) && i.cacheID++ && (i.rec = i())
                });
                var r = ts("refreshInit");
                E1 && ve.sort(),
                n || dD(),
                fe.forEach(function(i) {
                    Xt(i) && (i.smooth && (i.target.style.scrollBehavior = "auto"),
                    i(0))
                }),
                ce.slice(0).forEach(function(i) {
                    return i.refresh()
                }),
                ce.forEach(function(i, o) {
                    if (i._subPinOffset && i.pin) {
                        var s = i.vars.horizontal ? "offsetWidth" : "offsetHeight"
                          , a = i.pin[s];
                        i.revert(!0, 1),
                        i.adjustPinSpacing(i.pin[s] - a),
                        i.revert(!1, 1)
                    }
                }),
                ce.forEach(function(i) {
                    return "max" === i.vars.end && i.setPositions(i.start, Math.max(i.start + 1, po(i.scroller, i._dir)))
                }),
                r.forEach(function(i) {
                    return i && i.render && i.render(-1)
                }),
                fe.forEach(function(i) {
                    Xt(i) && (i.smooth && requestAnimationFrame(function() {
                        return i.target.style.scrollBehavior = "smooth"
                    }),
                    i.rec && i(i.rec))
                }),
                $1(eD, 1),
                Hd.pause(),
                ns++,
                go(2),
                ce.forEach(function(i) {
                    return Xt(i.vars.onRefresh) && i.vars.onRefresh(i)
                }),
                Rr = ve.isRefreshing = !1,
                ts("refresh")
            } else
                $t(ve, "scrollEnd", j1)
        }, H1 = 0, uf = 1, go = function(e) {
            if (!Rr || 2 === e) {
                ve.isUpdating = !0,
                ml && ml.update(0);
                var n = ce.length
                  , r = fn()
                  , i = r - nD >= 50
                  , o = n && ce[0].scroll();
                if (uf = H1 > o ? -1 : 1,
                H1 = o,
                i && (fr && !qd && r - fr > 200 && (fr = 0,
                ts("scrollEnd")),
                Gd = nD,
                nD = r),
                uf < 0) {
                    for (dn = n; dn-- > 0; )
                        ce[dn] && ce[dn].update(0, i);
                    uf = 1
                } else
                    for (dn = 0; dn < n; dn++)
                        ce[dn] && ce[dn].update(0, i);
                ve.isUpdating = !1
            }
            pl = 0
        }, fD = ["left", "top", oD, iD, hr + hl, hr + cl, hr + fl, hr + dl, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], lf = fD.concat([Xo, Jo, "boxSizing", "max" + Sa, "max" + sD, "position", hr, ct, ct + fl, ct + cl, ct + hl, ct + dl]), hD = function(e, n, r, i) {
            if (!e._gsap.swappedIn) {
                for (var u, o = fD.length, s = n.style, a = e.style; o--; )
                    s[u = fD[o]] = r[u];
                s.position = "absolute" === r.position ? "absolute" : "relative",
                "inline" === r.display && (s.display = "inline-block"),
                a[oD] = a[iD] = "auto",
                s.flexBasis = r.flexBasis || "auto",
                s.overflow = "visible",
                s.boxSizing = "border-box",
                s[Xo] = aD(e, cn) + Vt,
                s[Jo] = aD(e, Tt) + Vt,
                s[ct] = a[hr] = a.top = a.left = "0",
                Ia(i),
                a[Xo] = a["max" + Sa] = r[Xo],
                a[Jo] = a["max" + sD] = r[Jo],
                a[ct] = r[ct],
                e.parentNode !== n && (e.parentNode.insertBefore(n, e),
                n.appendChild(e)),
                e._gsap.swappedIn = !0
            }
        }, bV = /([A-Z])/g, Ia = function(e) {
            if (e) {
                var o, s, n = e.t.style, r = e.length, i = 0;
                for ((e.t._gsap || B.core.getCache(e.t)).uncache = 1; i < r; i += 2)
                    o = e[i],
                    (s = e[i + 1]) ? n[o] = s : n[o] && n.removeProperty(o.replace(bV, "-$1").toLowerCase())
            }
        }, cf = function(e) {
            for (var n = lf.length, r = e.style, i = [], o = 0; o < n; o++)
                i.push(lf[o], r[lf[o]]);
            return i.t = e,
            i
        }, df = {
            left: 0,
            top: 0
        }, z1 = function(e, n, r, i, o, s, a, u, l, c, d, f, h) {
            Xt(e) && (e = e(u)),
            Ar(e) && "max" === e.substr(0, 3) && (e = f + ("=" === e.charAt(4) ? rf("0" + e.substr(3), r) : 0));
            var g, m, _, p = h ? h.time() : 0;
            if (h && h.seek(0),
            ul(e))
                a && af(a, r, i, !0);
            else {
                Xt(n) && (n = n(u));
                var D, v, w, S, y = (e || "0").split(" ");
                _ = An(n) || et,
                (!(D = Oi(_) || {}) || !D.left && !D.top) && "none" === Fr(_).display && (S = _.style.display,
                _.style.display = "block",
                D = Oi(_),
                S ? _.style.display = S : _.style.removeProperty("display")),
                v = rf(y[0], D[i.d]),
                w = rf(y[1] || "0", r),
                e = D[i.p] - l[i.p] - c + v + o - w,
                a && af(a, w, i, r - w < 20 || a._isStart && w > 20),
                r -= r - w
            }
            if (s) {
                var E = e + r
                  , x = s._isStart;
                g = "scroll" + i.d2,
                af(s, E, i, x && E > 20 || !x && (d ? Math.max(et[g], xr[g]) : s.parentNode[g]) <= E + 1),
                d && (l = Oi(a),
                d && (s.style[i.op.p] = l[i.op.p] - i.op.m - s._offset + Vt))
            }
            return h && _ && (g = Oi(_),
            h.seek(f),
            m = Oi(_),
            h._caScrollDist = g[i.p] - m[i.p],
            e = e / h._caScrollDist * f),
            h && h.seek(p),
            h ? e : Math.round(e)
        }, TV = /(webkit|moz|length|cssText|inset)/i, G1 = function(e, n, r, i) {
            if (e.parentNode !== n) {
                var s, a, o = e.style;
                if (n === et) {
                    for (s in e._stOrig = o.cssText,
                    a = Fr(e))
                        !+s && !TV.test(s) && a[s] && "string" == typeof o[s] && "0" !== s && (o[s] = a[s]);
                    o.top = r,
                    o.left = i
                } else
                    o.cssText = e._stOrig;
                B.core.getCache(e).uncache = 1,
                n.appendChild(e)
            }
        }, W1 = function(e, n) {
            var o, s, r = fo(e, n), i = "_scroll" + n.p2, a = function u(l, c, d, f, h) {
                var p = u.tween
                  , g = c.onComplete
                  , m = {};
                return d = d || r(),
                h = f && h || 0,
                f = f || l - d,
                p && p.kill(),
                o = Math.round(d),
                c[i] = l,
                c.modifiers = m,
                m[i] = function(_) {
                    return (_ = Math.round(r())) !== o && _ !== s && Math.abs(_ - o) > 3 && Math.abs(_ - s) > 3 ? (p.kill(),
                    u.tween = 0) : _ = d + f * p.ratio + h * p.ratio * p.ratio,
                    s = o,
                    o = Math.round(_)
                }
                ,
                c.onUpdate = function() {
                    fe.cache++,
                    go()
                }
                ,
                c.onComplete = function() {
                    u.tween = 0,
                    g && g.call(p)
                }
                ,
                p = u.tween = B.to(e, c)
            };
            return e[i] = r,
            r.wheelHandler = function() {
                return a.tween && a.tween.kill() && (a.tween = 0)
            }
            ,
            $t(e, "wheel", r.wheelHandler),
            a
        }, ve = function() {
            function t(n, r) {
                Ca || t.register(B) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
                this.init(n, r)
            }
            return t.prototype.init = function(r, i) {
                if (this.progress = this.start = 0,
                this.vars && this.kill(!0, !0),
                Zd) {
                    var ke, hn, Dl, Yn, pr, Ee, Jt, Zn, ni, pn, b, Ni, Ze, mo, Do, Ma, gn, _l, _o, dt, Qn, mn, yl, Dn, ri, vl, yo, xa, is, os, be, ki, Pr, Or, ii, oi, ss, Aa, Li, s = (r = N1(Ar(r) || ul(r) || r.nodeType ? {
                        trigger: r
                    } : r, tf)).onUpdate, a = r.toggleClass, u = r.id, l = r.onToggle, c = r.onRefresh, d = r.scrub, f = r.trigger, h = r.pin, p = r.pinSpacing, g = r.invalidateOnRefresh, m = r.anticipatePin, _ = r.onScrubComplete, y = r.onSnapComplete, D = r.once, v = r.snap, w = r.pinReparent, S = r.pinSpacer, E = r.containerAnimation, x = r.fastScrollEnd, M = r.preventOverlaps, A = r.horizontal || r.containerAnimation && !1 !== r.horizontal ? cn : Tt, k = !d && 0 !== d, L = An(r.scroller || ye), pe = B.core.getCache(L), ae = Ko(L), ne = "fixed" === ("pinType"in r ? r.pinType : co(L, "pinType") || ae && "fixed"), R = [r.onEnter, r.onLeave, r.onEnterBack, r.onLeaveBack], j = k && r.toggleActions.split(" "), H = "markers"in r ? r.markers : tf.markers, T = ae ? 0 : parseFloat(Fr(L)["border" + A.p2 + Sa]) || 0, C = this, Ae = r.onRefreshInit && function() {
                        return r.onRefreshInit(C)
                    }
                    , ze = function(e, n, r) {
                        var i = r.d
                          , o = r.d2
                          , s = r.a;
                        return (s = co(e, "getBoundingClientRect")) ? function() {
                            return s()[i]
                        }
                        : function() {
                            return (n ? ye["inner" + o] : e["client" + o]) || 0
                        }
                    }(L, ae, A), Fn = function(e, n) {
                        return !n || ~ei.indexOf(e) ? R1(e) : function() {
                            return df
                        }
                    }(L, ae), Fe = 0, ge = 0, Re = fo(L, A);
                    if (Jm(C),
                    C._dir = A,
                    m *= 45,
                    C.scroller = L,
                    C.scroll = E ? E.time.bind(E) : Re,
                    Yn = Re(),
                    C.vars = r,
                    i = i || r.animation,
                    "refreshPriority"in r && (E1 = 1,
                    -9999 === r.refreshPriority && (ml = C)),
                    pe.tweenScroll = pe.tweenScroll || {
                        top: W1(L, Tt),
                        left: W1(L, cn)
                    },
                    C.tweenTo = ke = pe.tweenScroll[A.p],
                    C.scrubDuration = function(F) {
                        (ki = ul(F) && F) ? be ? be.duration(F) : be = B.to(i, {
                            ease: "expo",
                            totalProgress: "+=0.001",
                            duration: ki,
                            paused: !0,
                            onComplete: function() {
                                return _ && _(C)
                            }
                        }) : (be && be.progress(1).kill(),
                        be = 0)
                    }
                    ,
                    i && (i.vars.lazy = !1,
                    i._initted || !1 !== i.vars.immediateRender && !1 !== r.immediateRender && i.duration() && i.render(0, !0, !0),
                    C.animation = i.pause(),
                    i.scrollTrigger = C,
                    C.scrubDuration(d),
                    is = 0,
                    u || (u = i.vars.id)),
                    ce.push(C),
                    v && ((!Kd(v) || v.push) && (v = {
                        snapTo: v
                    }),
                    "scrollBehavior"in et.style && B.set(ae ? [et, xr] : L, {
                        scrollBehavior: "auto"
                    }),
                    fe.forEach(function(F) {
                        return Xt(F) && F.target === (ae ? He.scrollingElement || xr : L) && (F.smooth = !1)
                    }),
                    Dl = Xt(v.snapTo) ? v.snapTo : "labels" === v.snapTo ? function(e) {
                        return function(n) {
                            return B.utils.snap(k1(e), n)
                        }
                    }(i) : "labelsDirectional" === v.snapTo ? function(e) {
                        return function(n, r) {
                            return uD(k1(e))(n, r.direction)
                        }
                    }(i) : !1 !== v.directional ? function(F, Y) {
                        return uD(v.snapTo)(F, fn() - ge < 500 ? 0 : Y.direction)
                    }
                    : B.utils.snap(v.snapTo),
                    Pr = Kd(Pr = v.duration || {
                        min: .1,
                        max: 2
                    }) ? wa(Pr.min, Pr.max) : wa(Pr, Pr),
                    Or = B.delayedCall(v.delay || ki / 2 || .1, function() {
                        var F = Re()
                          , Y = fn() - ge < 500
                          , Z = ke.tween;
                        if (!(Y || Math.abs(C.getVelocity()) < 10) || Z || qd || Fe === F)
                            C.isActive && Fe !== F && Or.restart(!0);
                        else {
                            var ie = (F - Ee) / Ze
                              , Rt = i && !k ? i.totalProgress() : ie
                              , he = Y ? 0 : (Rt - os) / (fn() - Gd) * 1e3 || 0
                              , Dt = B.utils.clamp(-ie, 1 - ie, ba(he / 2) * he / .185)
                              , tt = ie + (!1 === v.inertia ? 0 : Dt)
                              , si = wa(0, 1, Dl(tt, C))
                              , Ve = Math.round(Ee + si * Ze)
                              , Nr = v.onStart
                              , nt = v.onInterrupt
                              , rt = v.onComplete;
                            if (F <= Jt && F >= Ee && Ve !== F) {
                                if (Z && !Z._initted && Z.data <= ba(Ve - F))
                                    return;
                                !1 === v.inertia && (Dt = si - ie),
                                ke(Ve, {
                                    duration: Pr(ba(.185 * Math.max(ba(tt - Rt), ba(si - Rt)) / he / .05 || 0)),
                                    ease: v.ease || "power3",
                                    data: ba(Ve - F),
                                    onInterrupt: function() {
                                        return Or.restart(!0) && nt && nt(C)
                                    },
                                    onComplete: function() {
                                        C.update(),
                                        Fe = Re(),
                                        is = os = i && !k ? i.totalProgress() : C.progress,
                                        y && y(C),
                                        rt && rt(C)
                                    }
                                }, F, Dt * Ze, Ve - F - Dt * Ze),
                                Nr && Nr(C, ke.tween)
                            }
                        }
                    }).pause()),
                    u && (lD[u] = C),
                    (Li = (f = C.trigger = An(f || h)) && f._gsap && f._gsap.stRevert) && (Li = Li(C)),
                    h = !0 === h ? f : An(h),
                    Ar(a) && (a = {
                        targets: f,
                        className: a
                    }),
                    h && (!1 === p || p === hr || (p = !(!p && h.parentNode && h.parentNode.style && "flex" === Fr(h.parentNode).display) && ct),
                    C.pin = h,
                    (hn = B.core.getCache(h)).spacer ? mo = hn.pinState : (S && ((S = An(S)) && !S.nodeType && (S = S.current || S.nativeElement),
                    hn.spacerIsNative = !!S,
                    S && (hn.spacerState = cf(S))),
                    hn.spacer = gn = S || He.createElement("div"),
                    gn.classList.add("pin-spacer"),
                    u && gn.classList.add("pin-spacer-" + u),
                    hn.pinState = mo = cf(h)),
                    !1 !== r.force3D && B.set(h, {
                        force3D: !0
                    }),
                    C.spacer = gn = hn.spacer,
                    xa = Fr(h),
                    yl = xa[p + A.os2],
                    _o = B.getProperty(h),
                    dt = B.quickSetter(h, A.a, Vt),
                    hD(h, gn, xa),
                    Ma = cf(h)),
                    H) {
                        Ni = Kd(H) ? N1(H, L1) : L1,
                        pn = sf("scroller-start", u, L, A, Ni, 0),
                        b = sf("scroller-end", u, L, A, Ni, 0, pn),
                        _l = pn["offset" + A.op.d2];
                        var Cl = An(co(L, "content") || L);
                        Zn = this.markerStart = sf("start", u, Cl, A, Ni, _l, 0, E),
                        ni = this.markerEnd = sf("end", u, Cl, A, Ni, _l, 0, E),
                        E && (Aa = B.quickSetter([Zn, ni], A.a, Vt)),
                        !ne && (!ei.length || !0 !== co(L, "fixedMarkers")) && (function(e) {
                            var n = Fr(e).position;
                            e.style.position = "absolute" === n || "fixed" === n ? n : "relative"
                        }(ae ? et : L),
                        B.set([pn, b], {
                            force3D: !0
                        }),
                        ri = B.quickSetter(pn, A.a, Vt),
                        yo = B.quickSetter(b, A.a, Vt))
                    }
                    if (E) {
                        var we = E.vars.onUpdate
                          , V = E.vars.onUpdateParams;
                        E.eventCallback("onUpdate", function() {
                            C.update(0, 0, 1),
                            we && we.apply(V || [])
                        })
                    }
                    C.previous = function() {
                        return ce[ce.indexOf(C) - 1]
                    }
                    ,
                    C.next = function() {
                        return ce[ce.indexOf(C) + 1]
                    }
                    ,
                    C.revert = function(F, Y) {
                        if (!Y)
                            return C.kill(!0);
                        var Z = !1 !== F || !C.enabled
                          , ie = Kt;
                        Z !== C.isReverted && (Z && (oi = Math.max(Re(), C.scroll.rec || 0),
                        ii = C.progress,
                        ss = i && i.progress()),
                        Zn && [Zn, ni, pn, b].forEach(function(Rt) {
                            return Rt.style.display = Z ? "none" : "block"
                        }),
                        Z && (Kt = 1,
                        C.update(Z)),
                        h && (!w || !C.isActive) && (Z ? function(e, n, r) {
                            Ia(r);
                            var i = e._gsap;
                            if (i.spacerIsNative)
                                Ia(i.spacerState);
                            else if (e._gsap.swappedIn) {
                                var o = n.parentNode;
                                o && (o.insertBefore(e, n),
                                o.removeChild(n))
                            }
                            e._gsap.swappedIn = !1
                        }(h, gn, mo) : hD(h, gn, Fr(h), Dn)),
                        Z || C.update(Z),
                        Kt = ie,
                        C.isReverted = Z)
                    }
                    ,
                    C.refresh = function(F, Y) {
                        if (!Kt && C.enabled || Y) {
                            if (h && F && fr)
                                return void $t(t, "scrollEnd", j1);
                            !Rr && Ae && Ae(C),
                            Kt = 1,
                            ge = fn(),
                            ke.tween && (ke.tween.kill(),
                            ke.tween = 0),
                            be && be.pause(),
                            g && i && i.revert({
                                kill: !1
                            }).invalidate(),
                            C.isReverted || C.revert(!0, !0),
                            C._subPinOffset = !1;
                            for (var rt, _t, Fa, as, It, it, Bi, gD, K1, wl, ai, Z = ze(), ie = Fn(), Rt = E ? E.duration() : po(L, A), he = 0, Dt = 0, tt = r.end, si = r.endTrigger || f, Ve = r.start || (0 !== r.start && f ? h ? "0 0" : "0 100%" : 0), Pt = C.pinnedContainer = r.pinnedContainer && An(r.pinnedContainer), Nr = f && Math.max(0, ce.indexOf(C)) || 0, nt = Nr; nt--; )
                                (it = ce[nt]).end || it.refresh(0, 1) || (Kt = 1),
                                (Bi = it.pin) && (Bi === f || Bi === h) && !it.isReverted && (wl || (wl = []),
                                wl.unshift(it),
                                it.revert(!0, !0)),
                                it !== ce[nt] && (Nr--,
                                nt--);
                            for (Xt(Ve) && (Ve = Ve(C)),
                            Ee = z1(Ve, f, Z, A, Re(), Zn, pn, C, ie, T, ne, Rt, E) || (h ? -.001 : 0),
                            Xt(tt) && (tt = tt(C)),
                            Ar(tt) && !tt.indexOf("+=") && (~tt.indexOf(" ") ? tt = (Ar(Ve) ? Ve.split(" ")[0] : "") + tt : (he = rf(tt.substr(2), Z),
                            tt = Ar(Ve) ? Ve : Ee + he,
                            si = f)),
                            Jt = Math.max(Ee, z1(tt || (si ? "100% 0" : Rt), si, Z, A, Re() + he, ni, b, C, ie, T, ne, Rt, E)) || -.001,
                            Ze = Jt - Ee || (Ee -= .01) && .001,
                            he = 0,
                            nt = Nr; nt--; )
                                (Bi = (it = ce[nt]).pin) && it.start - it._pinPush <= Ee && !E && it.end > 0 && (rt = it.end - it.start,
                                (Bi === f && it.start - it._pinPush < Ee || Bi === Pt) && !ul(Ve) && (he += rt * (1 - it.progress)),
                                Bi === h && (Dt += rt));
                            if (Ee += he,
                            Jt += he,
                            C._pinPush = Dt,
                            Zn && he && ((rt = {})[A.a] = "+=" + he,
                            Pt && (rt[A.p] = "-=" + Re()),
                            B.set([Zn, ni], rt)),
                            h)
                                rt = Fr(h),
                                as = A === Tt,
                                Fa = Re(),
                                Qn = parseFloat(_o(A.a)) + Dt,
                                !Rt && Jt > 1 && ((ai = {
                                    style: ai = (ae ? He.scrollingElement || xr : L).style,
                                    value: ai["overflow" + A.a.toUpperCase()]
                                })["overflow" + A.a.toUpperCase()] = "scroll"),
                                hD(h, gn, rt),
                                Ma = cf(h),
                                _t = Oi(h, !0),
                                gD = ne && fo(L, as ? cn : Tt)(),
                                p && ((Dn = [p + A.os2, Ze + Dt + Vt]).t = gn,
                                (nt = p === ct ? aD(h, A) + Ze + Dt : 0) && Dn.push(A.d, nt + Vt),
                                Ia(Dn),
                                Pt && ce.forEach(function(El) {
                                    El.pin === Pt && !1 !== El.vars.pinSpacing && (El._subPinOffset = !0)
                                }),
                                ne && Re(oi)),
                                ne && ((It = {
                                    top: _t.top + (as ? Fa - Ee : gD) + Vt,
                                    left: _t.left + (as ? gD : Fa - Ee) + Vt,
                                    boxSizing: "border-box",
                                    position: "fixed"
                                })[Xo] = It["max" + Sa] = Math.ceil(_t.width) + Vt,
                                It[Jo] = It["max" + sD] = Math.ceil(_t.height) + Vt,
                                It[hr] = It[hr + fl] = It[hr + cl] = It[hr + hl] = It[hr + dl] = "0",
                                It[ct] = rt[ct],
                                It[ct + fl] = rt[ct + fl],
                                It[ct + cl] = rt[ct + cl],
                                It[ct + hl] = rt[ct + hl],
                                It[ct + dl] = rt[ct + dl],
                                Do = function(e, n, r) {
                                    for (var a, i = [], o = e.length, s = r ? 8 : 0; s < o; s += 2)
                                        i.push(a = e[s], a in n ? n[a] : e[s + 1]);
                                    return i.t = e.t,
                                    i
                                }(mo, It, w),
                                Rr && Re(0)),
                                i ? (K1 = i._initted,
                                Xm(1),
                                i.render(i.duration(), !0, !0),
                                mn = _o(A.a) - Qn + Ze + Dt,
                                vl = Math.abs(Ze - mn) > 1,
                                ne && vl && Do.splice(Do.length - 2, 2),
                                i.render(0, !0, !0),
                                K1 || i.invalidate(!0),
                                i.parent || i.totalTime(i.totalTime()),
                                Xm(0)) : mn = Ze,
                                ai && (ai.value ? ai.style["overflow" + A.a.toUpperCase()] = ai.value : ai.style.removeProperty("overflow-" + A.a));
                            else if (f && Re() && !E)
                                for (_t = f.parentNode; _t && _t !== et; )
                                    _t._pinOffset && (Ee -= _t._pinOffset,
                                    Jt -= _t._pinOffset),
                                    _t = _t.parentNode;
                            wl && wl.forEach(function(El) {
                                return El.revert(!1, !0)
                            }),
                            C.start = Ee,
                            C.end = Jt,
                            Yn = pr = Rr ? oi : Re(),
                            !E && !Rr && (Yn < oi && Re(oi),
                            C.scroll.rec = 0),
                            C.revert(!1, !0),
                            Or && (Fe = -1,
                            C.isActive && Re(Ee + Ze * ii),
                            Or.restart(!0)),
                            Kt = 0,
                            i && k && (i._initted || ss) && i.progress() !== ss && i.progress(ss, !0).render(i.time(), !0, !0),
                            (ii !== C.progress || E) && (i && !k && i.totalProgress(ii, !0),
                            C.progress = (Yn - Ee) / Ze === ii ? 0 : ii),
                            h && p && (gn._pinOffset = Math.round(C.progress * mn)),
                            c && !Rr && c(C)
                        }
                    }
                    ,
                    C.getVelocity = function() {
                        return (Re() - pr) / (fn() - Gd) * 1e3 || 0
                    }
                    ,
                    C.endAnimation = function() {
                        ll(C.callbackAnimation),
                        i && (be ? be.progress(1) : i.paused() ? k || ll(i, C.direction < 0, 1) : ll(i, i.reversed()))
                    }
                    ,
                    C.labelToScroll = function(F) {
                        return i && i.labels && (Ee || C.refresh() || Ee) + i.labels[F] / i.duration() * Ze || 0
                    }
                    ,
                    C.getTrailing = function(F) {
                        var Y = ce.indexOf(C)
                          , Z = C.direction > 0 ? ce.slice(0, Y).reverse() : ce.slice(Y + 1);
                        return (Ar(F) ? Z.filter(function(ie) {
                            return ie.vars.preventOverlaps === F
                        }) : Z).filter(function(ie) {
                            return C.direction > 0 ? ie.end <= Ee : ie.start >= Jt
                        })
                    }
                    ,
                    C.update = function(F, Y, Z) {
                        if (!E || Z || F) {
                            var tt, Ve, Pt, Nr, nt, rt, _t, ie = Rr ? oi : C.scroll(), Rt = F ? 0 : (ie - Ee) / Ze, he = Rt < 0 ? 0 : Rt > 1 ? 1 : Rt || 0, Dt = C.progress;
                            if (Y && (pr = Yn,
                            Yn = E ? Re() : ie,
                            v && (os = is,
                            is = i && !k ? i.totalProgress() : he)),
                            m && !he && h && !Kt && !Yd && fr && Ee < ie + (ie - pr) / (fn() - Gd) * m && (he = 1e-4),
                            he !== Dt && C.enabled) {
                                if (Nr = (nt = (tt = C.isActive = !!he && he < 1) != (!!Dt && Dt < 1)) || !!he != !!Dt,
                                C.direction = he > Dt ? 1 : -1,
                                C.progress = he,
                                Nr && !Kt && (Ve = he && !Dt ? 0 : 1 === he ? 1 : 1 === Dt ? 2 : 3,
                                k && (Pt = !nt && "none" !== j[Ve + 1] && j[Ve + 1] || j[Ve],
                                _t = i && ("complete" === Pt || "reset" === Pt || Pt in i))),
                                M && (nt || _t) && (_t || d || !i) && (Xt(M) ? M(C) : C.getTrailing(M).forEach(function(it) {
                                    return it.endAnimation()
                                })),
                                k || (!be || Kt || Yd ? i && i.totalProgress(he, !!Kt) : (be._dp._time - be._start !== be._time && be.render(be._dp._time - be._start),
                                be.resetTo ? be.resetTo("totalProgress", he, i._tTime / i._tDur) : (be.vars.totalProgress = he,
                                be.invalidate().restart()))),
                                h)
                                    if (F && p && (gn.style[p + A.os2] = yl),
                                    ne) {
                                        if (Nr) {
                                            if (rt = !F && he > Dt && Jt + 1 > ie && ie + 1 >= po(L, A),
                                            w)
                                                if (F || !tt && !rt)
                                                    G1(h, gn);
                                                else {
                                                    var Fa = Oi(h, !0)
                                                      , as = ie - Ee;
                                                    G1(h, et, Fa.top + (A === Tt ? as : 0) + Vt, Fa.left + (A === Tt ? 0 : as) + Vt)
                                                }
                                            Ia(tt || rt ? Do : Ma),
                                            vl && he < 1 && tt || dt(Qn + (1 !== he || rt ? 0 : mn))
                                        }
                                    } else
                                        dt(al(Qn + mn * he));
                                v && !ke.tween && !Kt && !Yd && Or.restart(!0),
                                a && (nt || D && he && (he < 1 || !tD)) && zd(a.targets).forEach(function(it) {
                                    return it.classList[tt || D ? "add" : "remove"](a.className)
                                }),
                                s && !k && !F && s(C),
                                Nr && !Kt ? (k && (_t && ("complete" === Pt ? i.pause().totalProgress(1) : "reset" === Pt ? i.restart(!0).pause() : "restart" === Pt ? i.restart(!0) : i[Pt]()),
                                s && s(C)),
                                (nt || !tD) && (l && nt && rD(C, l),
                                R[Ve] && rD(C, R[Ve]),
                                D && (1 === he ? C.kill(!1, 1) : R[Ve] = 0),
                                nt || R[Ve = 1 === he ? 1 : 3] && rD(C, R[Ve])),
                                x && !tt && Math.abs(C.getVelocity()) > (ul(x) ? x : 2500) && (ll(C.callbackAnimation),
                                be ? be.progress(1) : ll(i, "reverse" === Pt ? 1 : !he, 1))) : k && s && !Kt && s(C)
                            }
                            if (yo) {
                                var It = E ? ie / E.duration() * (E._caScrollDist || 0) : ie;
                                ri(It + (pn._isFlipped ? 1 : 0)),
                                yo(It)
                            }
                            Aa && Aa(-ie / E.duration() * (E._caScrollDist || 0))
                        }
                    }
                    ,
                    C.enable = function(F, Y) {
                        C.enabled || (C.enabled = !0,
                        $t(L, "resize", gl),
                        $t(ae ? He : L, "scroll", Ta),
                        Ae && $t(t, "refreshInit", Ae),
                        !1 !== F && (C.progress = ii = 0,
                        Yn = pr = Fe = Re()),
                        !1 !== Y && C.refresh())
                    }
                    ,
                    C.getTween = function(F) {
                        return F && ke ? ke.tween : be
                    }
                    ,
                    C.setPositions = function(F, Y) {
                        h && (Qn += F - Ee,
                        mn += Y - F - Ze,
                        p === ct && C.adjustPinSpacing(Y - F - Ze)),
                        C.start = Ee = F,
                        C.end = Jt = Y,
                        Ze = Y - F,
                        C.update()
                    }
                    ,
                    C.adjustPinSpacing = function(F) {
                        if (Dn) {
                            var Y = Dn.indexOf(A.d) + 1;
                            Dn[Y] = parseFloat(Dn[Y]) + F + Vt,
                            Dn[1] = parseFloat(Dn[1]) + F + Vt,
                            Ia(Dn)
                        }
                    }
                    ,
                    C.disable = function(F, Y) {
                        if (C.enabled && (!1 !== F && C.revert(!0, !0),
                        C.enabled = C.isActive = !1,
                        Y || be && be.pause(),
                        oi = 0,
                        hn && (hn.uncache = 1),
                        Ae && Ft(t, "refreshInit", Ae),
                        Or && (Or.pause(),
                        ke.tween && ke.tween.kill() && (ke.tween = 0)),
                        !ae)) {
                            for (var Z = ce.length; Z--; )
                                if (ce[Z].scroller === L && ce[Z] !== C)
                                    return;
                            Ft(L, "resize", gl),
                            Ft(L, "scroll", Ta)
                        }
                    }
                    ,
                    C.kill = function(F, Y) {
                        C.disable(F, Y),
                        be && !Y && be.kill(),
                        u && delete lD[u];
                        var Z = ce.indexOf(C);
                        Z >= 0 && ce.splice(Z, 1),
                        Z === dn && uf > 0 && dn--,
                        Z = 0,
                        ce.forEach(function(ie) {
                            return ie.scroller === C.scroller && (Z = 1)
                        }),
                        Z || Rr || (C.scroll.rec = 0),
                        i && (i.scrollTrigger = null,
                        F && i.revert({
                            kill: !1
                        }),
                        Y || i.kill()),
                        Zn && [Zn, ni, pn, b].forEach(function(ie) {
                            return ie.parentNode && ie.parentNode.removeChild(ie)
                        }),
                        ml === C && (ml = 0),
                        h && (hn && (hn.uncache = 1),
                        Z = 0,
                        ce.forEach(function(ie) {
                            return ie.pin === h && Z++
                        }),
                        Z || (hn.spacer = 0)),
                        r.onKill && r.onKill(C)
                    }
                    ,
                    C.enable(!1, !1),
                    Li && Li(C),
                    i && i.add && !Ze ? B.delayedCall(.01, function() {
                        return Ee || Jt || C.refresh()
                    }) && (Ze = .01) && (Ee = Jt = 0) : C.refresh(),
                    h && function() {
                        if (U1 !== ns) {
                            var e = U1 = ns;
                            requestAnimationFrame(function() {
                                return e === ns && rs(!0)
                            })
                        }
                    }()
                } else
                    this.update = this.refresh = this.kill = ti
            }
            ,
            t.register = function(r) {
                return Ca || (B = r || F1(),
                A1() && window.document && t.enable(),
                Ca = Zd),
                Ca
            }
            ,
            t.defaults = function(r) {
                if (r)
                    for (var i in r)
                        tf[i] = r[i];
                return tf
            }
            ,
            t.disable = function(r, i) {
                Zd = 0,
                ce.forEach(function(s) {
                    return s[i ? "kill" : "disable"](r)
                }),
                Ft(ye, "wheel", Ta),
                Ft(He, "scroll", Ta),
                clearInterval(Wd),
                Ft(He, "touchcancel", ti),
                Ft(et, "touchstart", ti),
                Jd(Ft, He, "pointerdown,touchstart,mousedown", M1),
                Jd(Ft, He, "pointerup,touchend,mouseup", x1),
                Hd.kill(),
                Qd(Ft);
                for (var o = 0; o < fe.length; o += 3)
                    ef(Ft, fe[o], fe[o + 1]),
                    ef(Ft, fe[o], fe[o + 2])
            }
            ,
            t.enable = function() {
                if (ye = window,
                He = document,
                xr = He.documentElement,
                et = He.body,
                B && (zd = B.utils.toArray,
                wa = B.utils.clamp,
                Jm = B.core.context || ti,
                Xm = B.core.suppressOverwrites || ti,
                eD = ye.history.scrollRestoration || "auto",
                B.core.globals("ScrollTrigger", t),
                et)) {
                    Zd = 1,
                    mt.register(B),
                    t.isTouch = mt.isTouch,
                    ho = mt.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),
                    $t(ye, "wheel", Ta),
                    v1 = [ye, He, xr, et],
                    B.matchMedia ? (t.matchMedia = function(u) {
                        var c, l = B.matchMedia();
                        for (c in u)
                            l.add(c, u[c]);
                        return l
                    }
                    ,
                    B.addEventListener("matchMediaInit", function() {
                        return dD()
                    }),
                    B.addEventListener("matchMediaRevert", function() {
                        return V1()
                    }),
                    B.addEventListener("matchMedia", function() {
                        rs(0, 1),
                        ts("matchMedia")
                    }),
                    B.matchMedia("(orientation: portrait)", function() {
                        return cD(),
                        cD
                    })) : console.warn("Requires GSAP 3.11.0 or later"),
                    cD(),
                    $t(He, "scroll", Ta);
                    var s, a, r = et.style, i = r.borderTopStyle, o = B.core.Animation.prototype;
                    for (o.revert || Object.defineProperty(o, "revert", {
                        value: function() {
                            return this.time(-.01, !0)
                        }
                    }),
                    r.borderTopStyle = "solid",
                    s = Oi(et),
                    Tt.m = Math.round(s.top + Tt.sc()) || 0,
                    cn.m = Math.round(s.left + cn.sc()) || 0,
                    i ? r.borderTopStyle = i : r.removeProperty("border-top-style"),
                    Wd = setInterval(B1, 250),
                    B.delayedCall(.5, function() {
                        return Yd = 0
                    }),
                    $t(He, "touchcancel", ti),
                    $t(et, "touchstart", ti),
                    Jd($t, He, "pointerdown,touchstart,mousedown", M1),
                    Jd($t, He, "pointerup,touchend,mouseup", x1),
                    Km = B.utils.checkPrefix("transform"),
                    lf.push(Km),
                    Ca = fn(),
                    Hd = B.delayedCall(.2, rs).pause(),
                    Ea = [He, "visibilitychange", function() {
                        var u = ye.innerWidth
                          , l = ye.innerHeight;
                        He.hidden ? (C1 = u,
                        w1 = l) : (C1 !== u || w1 !== l) && gl()
                    }
                    , He, "DOMContentLoaded", rs, ye, "load", rs, ye, "resize", gl],
                    Qd($t),
                    ce.forEach(function(u) {
                        return u.enable(0, 1)
                    }),
                    a = 0; a < fe.length; a += 3)
                        ef(Ft, fe[a], fe[a + 1]),
                        ef(Ft, fe[a], fe[a + 2])
                }
            }
            ,
            t.config = function(r) {
                "limitCallbacks"in r && (tD = !!r.limitCallbacks);
                var i = r.syncInterval;
                i && clearInterval(Wd) || (Wd = i) && setInterval(B1, i),
                "ignoreMobileResize"in r && (S1 = 1 === t.isTouch && r.ignoreMobileResize),
                "autoRefreshEvents"in r && (Qd(Ft) || Qd($t, r.autoRefreshEvents || "none"),
                b1 = -1 === (r.autoRefreshEvents + "").indexOf("resize"))
            }
            ,
            t.scrollerProxy = function(r, i) {
                var o = An(r)
                  , s = fe.indexOf(o)
                  , a = Ko(o);
                ~s && fe.splice(s, a ? 6 : 2),
                i && (a ? ei.unshift(ye, i, et, i, xr, i) : ei.unshift(o, i))
            }
            ,
            t.clearMatchMedia = function(r) {
                ce.forEach(function(i) {
                    return i._ctx && i._ctx.query === r && i._ctx.kill(!0, !0)
                })
            }
            ,
            t.isInViewport = function(r, i, o) {
                var s = (Ar(r) ? An(r) : r).getBoundingClientRect()
                  , a = s[o ? Xo : Jo] * i || 0;
                return o ? s.right - a > 0 && s.left + a < ye.innerWidth : s.bottom - a > 0 && s.top + a < ye.innerHeight
            }
            ,
            t.positionInViewport = function(r, i, o) {
                Ar(r) && (r = An(r));
                var s = r.getBoundingClientRect()
                  , a = s[o ? Xo : Jo]
                  , u = null == i ? a / 2 : i in nf ? nf[i] * a : ~i.indexOf("%") ? parseFloat(i) * a / 100 : parseFloat(i) || 0;
                return o ? (s.left + u) / ye.innerWidth : (s.top + u) / ye.innerHeight
            }
            ,
            t.killAll = function(r) {
                if (ce.slice(0).forEach(function(o) {
                    return "ScrollSmoother" !== o.vars.id && o.kill()
                }),
                !0 !== r) {
                    var i = es.killAll || [];
                    es = {},
                    i.forEach(function(o) {
                        return o()
                    })
                }
            }
            ,
            t
        }();
        ve.version = "3.11.4",
        ve.saveStyles = function(t) {
            return t ? zd(t).forEach(function(e) {
                if (e && e.style) {
                    var n = qn.indexOf(e);
                    n >= 0 && qn.splice(n, 5),
                    qn.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), B.core.getCache(e), Jm())
                }
            }) : qn
        }
        ,
        ve.revert = function(t, e) {
            return dD(!t, e)
        }
        ,
        ve.create = function(t, e) {
            return new ve(t,e)
        }
        ,
        ve.refresh = function(t) {
            return t ? gl() : (Ca || ve.register()) && rs(!0)
        }
        ,
        ve.update = function(t) {
            return ++fe.cache && go(!0 === t ? 2 : 0)
        }
        ,
        ve.clearScrollMemory = $1,
        ve.maxScroll = function(t, e) {
            return po(t, e ? cn : Tt)
        }
        ,
        ve.getScrollFunc = function(t, e) {
            return fo(An(t), e ? cn : Tt)
        }
        ,
        ve.getById = function(t) {
            return lD[t]
        }
        ,
        ve.getAll = function() {
            return ce.filter(function(t) {
                return "ScrollSmoother" !== t.vars.id
            })
        }
        ,
        ve.isScrolling = function() {
            return !!fr
        }
        ,
        ve.snapDirectional = uD,
        ve.addEventListener = function(t, e) {
            var n = es[t] || (es[t] = []);
            ~n.indexOf(e) || n.push(e)
        }
        ,
        ve.removeEventListener = function(t, e) {
            var n = es[t]
              , r = n && n.indexOf(e);
            r >= 0 && n.splice(r, 1)
        }
        ,
        ve.batch = function(t, e) {
            var a, n = [], r = {}, i = e.interval || .016, o = e.batchMax || 1e9, s = function(l, c) {
                var d = []
                  , f = []
                  , h = B.delayedCall(i, function() {
                    c(d, f),
                    d = [],
                    f = []
                }).pause();
                return function(p) {
                    d.length || h.restart(!0),
                    d.push(p.trigger),
                    f.push(p),
                    o <= d.length && h.progress(1)
                }
            };
            for (a in e)
                r[a] = "on" === a.substr(0, 2) && Xt(e[a]) && "onRefreshInit" !== a ? s(0, e[a]) : e[a];
            return Xt(o) && (o = o(),
            $t(ve, "refresh", function() {
                return o = e.batchMax()
            })),
            zd(t).forEach(function(u) {
                var l = {};
                for (a in r)
                    l[a] = r[a];
                l.trigger = u,
                n.push(ve.create(l))
            }),
            n
        }
        ;
        var Z1, q1 = function(e, n, r, i) {
            return n > i ? e(i) : n < 0 && e(0),
            r > i ? (i - n) / (r - n) : r < 0 ? n / (n - r) : 1
        }, pD = function t(e, n) {
            !0 === n ? e.style.removeProperty("touch-action") : e.style.touchAction = !0 === n ? "auto" : n ? "pan-" + n + (mt.isTouch ? " pinch-zoom" : "") : "none",
            e === xr && t(et, n)
        }, ff = {
            auto: 1,
            scroll: 1
        }, IV = function(e) {
            var u, n = e.event, r = e.target, i = e.axis, o = (n.changedTouches ? n.changedTouches[0] : n).target, s = o._gsap || B.core.getCache(o), a = fn();
            if (!s._isScrollT || a - s._isScrollT > 2e3) {
                for (; o && o !== et && (o.scrollHeight <= o.clientHeight && o.scrollWidth <= o.clientWidth || !ff[(u = Fr(o)).overflowY] && !ff[u.overflowX]); )
                    o = o.parentNode;
                s._isScroll = o && o !== r && !Ko(o) && (ff[(u = Fr(o)).overflowY] || ff[u.overflowX]),
                s._isScrollT = a
            }
            (s._isScroll || "x" === i) && (n.stopPropagation(),
            n._gsapAllow = !0)
        }, Y1 = function(e, n, r, i) {
            return mt.create({
                target: e,
                capture: !0,
                debounce: !1,
                lockAxis: !0,
                type: n,
                onWheel: i = i && IV,
                onPress: i,
                onDrag: i,
                onScroll: i,
                onEnable: function() {
                    return r && $t(He, mt.eventTypes[0], Q1, !1, !0)
                },
                onDisable: function() {
                    return Ft(He, mt.eventTypes[0], Q1, !0)
                }
            })
        }, MV = /(input|label|select|textarea)/i, Q1 = function(e) {
            var n = MV.test(e.target.tagName);
            (n || Z1) && (e._gsapAllow = !0,
            Z1 = n)
        };
        ve.sort = function(t) {
            return ce.sort(t || function(e, n) {
                return -1e6 * (e.vars.refreshPriority || 0) + e.start - (n.start + -1e6 * (n.vars.refreshPriority || 0))
            }
            )
        }
        ,
        ve.observe = function(t) {
            return new mt(t)
        }
        ,
        ve.normalizeScroll = function(t) {
            if (typeof t > "u")
                return Wn;
            if (!0 === t && Wn)
                return Wn.enable();
            if (!1 === t)
                return Wn && Wn.kill();
            var e = t instanceof mt ? t : function(e) {
                Kd(e) || (e = {}),
                e.preventDefault = e.isNormalizer = e.allowClicks = !0,
                e.type || (e.type = "wheel,touch"),
                e.debounce = !!e.debounce,
                e.id = e.id || "normalizer";
                var s, a, y, D, k, L, pe, ae, r = e.normalizeScrollX, i = e.momentum, o = e.allowNestedScroll, u = An(e.target) || xr, l = B.core.globals().ScrollSmoother, c = l && l.get(), d = ho && (e.content && An(e.content) || c && !1 !== e.content && !c.smooth() && c.content()), f = fo(u, Tt), h = fo(u, cn), p = 1, g = (mt.isTouch && ye.visualViewport ? ye.visualViewport.scale * ye.visualViewport.width : ye.outerWidth) / ye.innerWidth, m = 0, _ = Xt(i) ? function() {
                    return i(s)
                }
                : function() {
                    return i || 2.8
                }
                , v = Y1(u, e.type, !0, o), w = function() {
                    return D = !1
                }, S = ti, E = ti, x = function() {
                    a = po(u, Tt),
                    E = wa(ho ? 1 : 0, a),
                    r && (S = wa(0, po(u, cn))),
                    y = ns
                }, M = function() {
                    d._gsap.y = al(parseFloat(d._gsap.y) + f.offset) + "px",
                    d.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(d._gsap.y) + ", 0, 1)",
                    f.offset = f.cacheID = 0
                }, ne = function() {
                    x(),
                    k.isActive() && k.vars.scrollY > a && (f() > a ? k.progress(1) && f(a) : k.resetTo("scrollY", a))
                };
                return d && B.set(d, {
                    y: "+=0"
                }),
                e.ignoreCheck = function(R) {
                    return ho && "touchmove" === R.type && function() {
                        if (D) {
                            requestAnimationFrame(w);
                            var j = al(s.deltaY / 2)
                              , H = E(f.v - j);
                            if (d && H !== f.v + f.offset) {
                                f.offset = H - f.v;
                                var T = al((parseFloat(d && d._gsap.y) || 0) - f.offset);
                                d.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + T + ", 0, 1)",
                                d._gsap.y = T + "px",
                                f.cacheID = fe.cache,
                                go()
                            }
                            return !0
                        }
                        f.offset && M(),
                        D = !0
                    }() || p > 1.05 && "touchstart" !== R.type || s.isGesturing || R.touches && R.touches.length > 1
                }
                ,
                e.onPress = function() {
                    var R = p;
                    p = al((ye.visualViewport && ye.visualViewport.scale || 1) / g),
                    k.pause(),
                    R !== p && pD(u, p > 1.01 || !r && "x"),
                    L = h(),
                    pe = f(),
                    x(),
                    y = ns
                }
                ,
                e.onRelease = e.onGestureStart = function(R, j) {
                    if (f.offset && M(),
                    j) {
                        fe.cache++;
                        var T, C, H = _();
                        r && (T = h(),
                        H *= q1(h, T, C = T + .05 * H * -R.velocityX / .227, po(u, cn)),
                        k.vars.scrollX = S(C)),
                        T = f(),
                        H *= q1(f, T, C = T + .05 * H * -R.velocityY / .227, po(u, Tt)),
                        k.vars.scrollY = E(C),
                        k.invalidate().duration(H).play(.01),
                        (ho && k.vars.scrollY >= a || T >= a - 1) && B.to({}, {
                            onUpdate: ne,
                            duration: H
                        })
                    } else
                        ae.restart(!0)
                }
                ,
                e.onWheel = function() {
                    k._ts && k.pause(),
                    fn() - m > 1e3 && (y = 0,
                    m = fn())
                }
                ,
                e.onChange = function(R, j, H, T, C) {
                    if (ns !== y && x(),
                    j && r && h(S(T[2] === j ? L + (R.startX - R.x) : h() + j - T[1])),
                    H) {
                        f.offset && M();
                        var Ae = C[2] === H
                          , ze = Ae ? pe + R.startY - R.y : f() + H - C[1]
                          , Fn = E(ze);
                        Ae && ze !== Fn && (pe += Fn - ze),
                        f(Fn)
                    }
                    (H || j) && go()
                }
                ,
                e.onEnable = function() {
                    pD(u, !r && "x"),
                    ve.addEventListener("refresh", ne),
                    $t(ye, "resize", ne),
                    f.smooth && (f.target.style.scrollBehavior = "auto",
                    f.smooth = h.smooth = !1),
                    v.enable()
                }
                ,
                e.onDisable = function() {
                    pD(u, !0),
                    Ft(ye, "resize", ne),
                    ve.removeEventListener("refresh", ne),
                    v.kill()
                }
                ,
                e.lockAxis = !1 !== e.lockAxis,
                (s = new mt(e)).iOS = ho,
                ho && !f() && f(1),
                ho && B.ticker.add(ti),
                k = B.to(s, {
                    ease: "power4",
                    paused: !0,
                    scrollX: r ? "+=0.1" : "+=0",
                    scrollY: "+=0.1",
                    onComplete: (ae = s._dc).vars.onComplete
                }),
                s
            }(t);
            return Wn && Wn.target === e.target && Wn.kill(),
            Ko(e.target) && (Wn = e),
            e
        }
        ,
        ve.core = {
            _getVelocityProp: Qm,
            _inputObserver: Y1,
            _scrollers: fe,
            _proxies: ei,
            bridge: {
                ss: function() {
                    fr || ts("scrollStart"),
                    fr = fn()
                },
                ref: function() {
                    return Kt
                }
            }
        },
        F1() && B.registerPlugin(ve);
        let AV = (()=>{
            class t {
                ngAfterViewInit() {
                    const e = document.querySelector("button.buy-now-button");
                    e && e.addEventListener("click", (()=>{
                        window.open("https://app.uniswap.org/swap?chain=mainnet&inputCurrency=NATIVE&outputCurrency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", "_blank")
                    }))
                }
                static #e = this.\u0275fac = function(r) {
                    return new (r || t)
                }
                ;
                static #t = this.\u0275cmp = jr({
                    type: t,
                    selectors: [["boboverse-landing"]],
                    decls: 9,
                    vars: 0,
                    consts: [["id", "landing-bg", "src", "assets/roof/ssbg.png", 1, "bg"], ["id", "landing-bg", "src", "assets/roof/ss2.png", 1, "bg"], ["id", "landing-bg", "src", "assets/roof/ss1.png", 1, "bg"], ["id", "landing-bg", "src", "assets/roof/ss0.png", 1, "bg"], ["id", "landing-bg", "src", "assets/photos/gang.png", 1, "bg"], [1, "logo"], ["src", "assets/logo.png", 1, "logo"], [1, "buy-now-button"]],
                    template: function(r, i) {
                        1 & r && (xe(0, "img", 0)(1, "img", 1)(2, "img", 2)(3, "img", 3)(4, "img", 4),
                        Ke(5, "div", 5),
                        xe(6, "img", 6),
                        Ke(7, "button", 7),
                        on(8, "Buy Now"),
                        wt(),
                        wt())
                    },
                    styles: ['[_nghost-%COMP%]{display:grid;grid-template-areas:"landing";grid-template-columns:1fr;grid-template-rows:1fr;max-height:100vh;min-height:100vh;max-width:100vw;overflow:hidden}div.pin-spacer[_ngcontent-%COMP%]{grid-area:landing}div.logo[_ngcontent-%COMP%]{grid-area:landing;justify-self:center;align-self:center;color:var(--red);font-size:5vw;z-index:100;display:flex;flex-direction:column;align-items:center;gap:2rem}div.logo[_ngcontent-%COMP%]   img.logo[_ngcontent-%COMP%]{max-width:50vw;min-width:50vw}button.buy-now-button[_ngcontent-%COMP%]{padding:1rem 2rem;font-size:1.5rem;font-weight:bold;background-color:var(--red, #ff0000);color:white;border:none;border-radius:0.5rem;cursor:pointer;z-index:100;transition:transform 0.2s,box-shadow 0.2s}button.buy-now-button[_ngcontent-%COMP%]:hover{transform:scale(1.05);box-shadow:0 4px 12px rgba(0,0,0,0.3)}img#landing-bg[_ngcontent-%COMP%]{grid-area:landing;min-width:100vw;max-width:100vw;min-height:100vh;max-height:100vh;object-fit:cover;justify-self:center}'],
                    changeDetection: 0
                })
            }
            return t
        }
        )()
          , FV = (()=>{
            class t {
                static #e = this.\u0275fac = function(r) {
                    return new (r || t)
                }
                ;
                static #t = this.\u0275cmp = jr({
                    type: t,
                    selectors: [["boboverse-info"]],
                    decls: 12,
                    vars: 0,
                    consts: [["src", "/assets/basement/room.png", 1, "bg"], ["src", "", 1, "boyz"], [1, "content"], ["src", "assets/walls/wall_1.png", 1, "divider"], ["src", "assets/walls/wall_4.png", 1, "divider", "divider-2"]],
                    template: function(r, i) {
                        1 & r && (xe(0, "img", 0)(1, "img", 1),
                        Ke(2, "section", 2),
                        xe(3, "img", 3),
                        Ke(4, "h1"),
                        wt(),
                        Ke(6, "p"),
                        wt(),
                        xe(11, "img", 4),
                        wt())
                    },
                    styles: ['[_nghost-%COMP%]{display:grid;border-top:10px solid var(--white);grid-template-areas:"content"}img.divider[_ngcontent-%COMP%]{max-width:100vw;min-width:100vw;object-fit:cover;align-self:start;transform:translateY(-75%)}img.divider-2[_ngcontent-%COMP%]{transform:translateY(10px);align-self:end}section.content[_ngcontent-%COMP%]{grid-area:content;display:grid;grid-template-rows:25% max-content max-content;color:#fff}h1[_ngcontent-%COMP%], p[_ngcontent-%COMP%]{max-width:80%;justify-self:center}img.boyz[_ngcontent-%COMP%]{grid-area:content;max-width:25vw;min-width:25vw;justify-self:center}img.bg[_ngcontent-%COMP%]{grid-area:content;max-width:100vw;min-width:100vw;min-height:100%;object-fit:cover;align-self:start}'],
                    changeDetection: 0
                })
            }
            return t
        }
        )()
          , RV = (()=>{
            class t {
                static #e = this.\u0275fac = function(r) {
                    return new (r || t)
                }
                ;
                static #t = this.\u0275cmp = jr({
                    type: t,
                    selectors: [["boboverse-snibbu"]],
                    decls: 24,
                    vars: 0,
                    consts: [[1, "content"], ["src", "/assets/snibbu_512/0000000011.png", 1, "portrait"], [1, "bg"], ["src", "assets/snibbu_room/room.png", 1, "bg"], ["src", "/assets/dividers/snibbu.png", 1, "divider"], ["src", "assets/snibbu_room/gold.png", 1, "bg"], ["src", "assets/snibbu_room/cash.png", 1, "bg"], ["src", "assets/snibbu_room/drink.png", 1, "bg"], ["src", "assets/snibbu_room/pearl.png", 1, "bg"], ["src", "assets/snibbu_room/star.png", 1, "bg"], ["src", "assets/snibbu_room/window.png", 1, "bg"], ["src", "assets/snibbu_.png", 1, "bg"], ["src", "assets/snibbu_room/divider.png", 1, "bg"], ["src", "/assets/walls/wall_3.png", 1, "divider-roof"]],
                    template: function(r, i) {
                        1 & r && (Ke(0, "section", 0),
                        xe(1, "img", 1),
                        Ke(2, "h1"),
                        on(3, "SNIBBU THE CRAB"),
                        wt(),
                        Ke(4, "p"),
                        on(5, " Meet Snibbu the Crab, an original Pepevere meme controlling sideways market actions and completing the Market Forces Gang! "),
                        xe(6, "br")(7, "br"),
                        on(8, " This little crab shows up in numbers and with every snib, chops the market sideways, messing with both Bulls and Bears. "),
                        xe(9, "br")(10, "br"),
                        on(11, " Why Snibbu? No one vibes through sideways slides like Snibbu and doesn\u2019t give a crab! "),
                        wt()(),
                        Ke(12, "section", 2),
                        xe(13, "img", 3)(14, "img", 4)(15, "img", 5)(16, "img", 6)(17, "img", 7)(18, "img", 8)(19, "img", 9)(20, "img", 10)(21, "img", 11)(22, "img", 12),
                        wt(),
                        xe(23, "img", 13))
                    },
                    styles: ['[_nghost-%COMP%]{display:grid;grid-template-columns:1fr max-content;grid-template-rows:1fr;grid-template-areas:"content" "divider";overflow:hidden;min-width:100vw;max-width:100vw;margin-bottom:-20px}img.photo[_ngcontent-%COMP%]{grid-area:content;min-width:25vw;max-width:25vw;justify-self:left;align-self:end}img.divider[_ngcontent-%COMP%]{grid-area:content;min-width:100vw;max-width:100vw;object-fit:cover}img.divider-roof[_ngcontent-%COMP%]{grid-area:divider;min-width:100vw;max-width:100vw;object-fit:cover;transform:translateY(-5px)}section.bg[_ngcontent-%COMP%]{grid-area:content;display:grid;grid-template-areas:"bg"}section.bg[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{grid-area:bg;min-width:100vw;max-width:100vw;min-height:100%;object-fit:cover}section.content[_ngcontent-%COMP%]{z-index:10;grid-area:content;display:grid;grid-template-columns:var(--site-padding) 1fr var(--site-padding);grid-template-rows:var(--site-padding) 150px max-content max-content var(--site-padding);grid-template-areas:". . ." ". portrait ." ". title ." ". content ." ". . ."}h1[_ngcontent-%COMP%]{font-size:3rem;grid-area:title;text-align:right;color:#ff0}p[_ngcontent-%COMP%]{max-width:300px;width:80%;grid-area:content;text-align:right;justify-self:right;background:rgba(0,0,0,.75);color:#ff0;padding:10px;border-radius:5px}img.portrait[_ngcontent-%COMP%]{grid-area:portrait;max-height:150px;justify-self:right;z-index:100}'],
                    changeDetection: 0
                })
            }
            return t
        }
        )()
          , PV = (()=>{
            class t {
                static #e = this.\u0275fac = function(r) {
                    return new (r || t)
                }
                ;
                static #t = this.\u0275cmp = jr({
                    type: t,
                    selectors: [["boboverse-dodo"]],
                    decls: 22,
                    vars: 0,
                    consts: [[1, "content"], ["src", "/assets/dodo_512/0000000011.png", 1, "portrait"], [1, "bg"], ["src", "assets/dodo_room/room.png", 1, "bg"], ["src", "/assets/dividers/dodo.png", 1, "divider"], ["src", "assets/dodo_room/cash.png", 1, "bg"], ["src", "assets/dodo_room/chair.png", 1, "bg"], ["src", "assets/dodo_room/chest.png", 1, "bg"], ["src", "assets/dodo_.png", 1, "bg"], ["src", "assets/dodo_room/divider.png", 1, "bg"], ["src", "/assets/walls/wall_3.png", 1, "divider-roof"]],
                    template: function(r, i) {
                        1 & r && (Ke(0, "section", 0),
                        xe(1, "img", 1),
                        Ke(2, "h1"),
                        on(3, "DODO THE SWAN"),
                        wt(),
                        Ke(4, "p"),
                        on(5, " Presenting Dodo, the Black Swan, a meme with a knack for market chaos and a proud member of the Pepeverse. This black swan doesn\u2019t just swim; it dives headfirst into financial havoc. "),
                        xe(6, "br")(7, "br"),
                        on(8, " Dodo became an instant hit in a July 2021 thread and has since been the market\u2019s unpredictable trickster, causing waves of uncertainty. "),
                        xe(9, "br")(10, "br"),
                        on(11, " Why Dodo? Because when chaos reigns in the market, this bird soars higher! "),
                        wt()(),
                        Ke(12, "section", 2),
                        xe(13, "img", 3)(14, "img", 4)(15, "img", 5)(16, "img", 6)(17, "img", 7)(18, "img", 6)(19, "img", 8)(20, "img", 9),
                        wt(),
                        xe(21, "img", 10))
                    },
                    styles: ['[_nghost-%COMP%]{display:grid;grid-template-columns:1fr max-content;grid-template-rows:1fr;grid-template-areas:"content" "divider";overflow:hidden;min-width:100vw;max-width:100vw;margin-bottom:-20px}img.photo[_ngcontent-%COMP%]{grid-area:content;min-width:25vw;max-width:25vw;justify-self:left;align-self:end}img.divider[_ngcontent-%COMP%]{grid-area:content;min-width:100vw;max-width:100vw;object-fit:cover}img.divider-roof[_ngcontent-%COMP%]{grid-area:divider;min-width:100vw;max-width:100vw;object-fit:cover;transform:translateY(-5px)}section.bg[_ngcontent-%COMP%]{grid-area:content;display:grid;grid-template-areas:"bg"}section.bg[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{grid-area:bg;min-width:100vw;max-width:100vw;min-height:100%;object-fit:cover}section.content[_ngcontent-%COMP%]{z-index:10;grid-area:content;display:grid;grid-template-columns:var(--site-padding) 1fr var(--site-padding);grid-template-rows:var(--site-padding) 150px max-content max-content var(--site-padding);grid-template-areas:". . ." ". portrait ." ". title ." ". content ." ". . ."}h1[_ngcontent-%COMP%]{font-size:3rem;grid-area:title;text-align:right;color:#fff}p[_ngcontent-%COMP%]{max-width:300px;width:80%;grid-area:content;text-align:right;justify-self:right;background:rgba(255,255,255,.5);color:#000;padding:10px;border-radius:5px}img.portrait[_ngcontent-%COMP%]{grid-area:portrait;max-height:150px;justify-self:right;z-index:100}'],
                    changeDetection: 0
                })
            }
            return t
        }
        )()
          , OV = (()=>{
            class t {
                constructor() {}
                static #e = this.\u0275fac = function(r) {
                    return new (r || t)
                }
                ;
                static #t = this.\u0275prov = Q({
                    token: t,
                    factory: t.\u0275fac,
                    providedIn: "root"
                })
            }
            return t
        }
        )()
          , NV = (()=>{
            class t {
                constructor(n) {
                    this.filesService = n,
                    this.images = []
                }
                static #e = this.\u0275fac = function(r) {
                    return new (r || t)(q(OV))
                }
                ;
                static #t = this.\u0275cmp = jr({
                    type: t,
                    selectors: [["boboverse-bobo"]],
                    inputs: {
                        images: "images"
                    },
                    decls: 18,
                    vars: 0,
                    consts: [[1, "content"], ["src", "/assets/bobo_512/0000000002.png", 1, "portrait"], [1, "bobo"], [1, "bg"], ["src", "assets/bobo_room/room.png", 1, "bg"], ["src", "assets/bobo_room/cash.png", 1, "bg"], ["src", "assets/bobo_room/honey.png", 1, "bg"], ["src", "assets/bobo_room/window.png", 1, "bg"], ["src", "/assets/dividers/bobo.png", 1, "divider"], ["src", "assets/bobo_.png", 1, "bg"], ["src", "assets/bobo_room/divider.png", 1, "bg"], ["src", "/assets/walls/wall_3.png", 1, "divider-roof"]],
                    template: function(r, i) {
                        1 & r && (Ke(0, "section", 0),
                        xe(1, "img", 1),
                        Ke(2, "h1", 2),
                        on(3, "Bobo The Bear"),
                        wt(),
                        Ke(4, "p"),
                        on(5, " Introducing Bobo the Bear, the master of bear markets! This grumpy bear has been the go-to symbol of financial doom since 2018. Bobo prowls the internet, from Twitter to 4chan, spreading gloom and doom about bad investments and market dips.\n"),
                        xe(6, "br")(7, "br"),
                        on(8, "\nWhy Bobo? Because when it comes to highlighting financial fiascos, no one does it better! "),
                        wt()(),
                        Ke(9, "section", 3),
                        xe(10, "img", 4)(11, "img", 5)(12, "img", 6)(13, "img", 7)(14, "img", 8)(15, "img", 9)(16, "img", 10),
                        wt(),
                        xe(17, "img", 11))
                    },
                    styles: ['[_nghost-%COMP%]{display:grid;grid-template-columns:1fr max-content;grid-template-rows:1fr;grid-template-areas:"content" "divider";overflow:hidden;min-width:100vw;max-width:100vw;margin-bottom:-20px}img.photo[_ngcontent-%COMP%]{grid-area:content;min-width:25vw;max-width:25vw;justify-self:left;align-self:end}img.divider[_ngcontent-%COMP%]{grid-area:content;min-width:100vw;max-width:100vw;object-fit:cover}img.divider-roof[_ngcontent-%COMP%]{grid-area:divider;min-width:100vw;max-width:100vw;object-fit:cover;transform:translateY(-5px)}section.bg[_ngcontent-%COMP%]{grid-area:content;display:grid;grid-template-areas:"bg"}section.bg[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{grid-area:bg;min-width:100vw;max-width:100vw;min-height:100%;object-fit:cover}section.content[_ngcontent-%COMP%]{z-index:10;grid-area:content;display:grid;grid-template-columns:var(--site-padding) 1fr var(--site-padding);grid-template-rows:var(--site-padding) 150px max-content max-content var(--site-padding);grid-template-areas:". . ." ". portrait ." ". title ." ". content ." ". . ."}h1[_ngcontent-%COMP%]{font-size:3rem;grid-area:title;text-align:right;color:red}p[_ngcontent-%COMP%]{max-width:300px;width:80%;grid-area:content;text-align:right;justify-self:right;background:rgba(0,0,0,.5);color:red;padding:10px;border-radius:5px}img.portrait[_ngcontent-%COMP%]{grid-area:portrait;max-height:150px;justify-self:right;z-index:100}'],
                    changeDetection: 0
                })
            }
            return t
        }
        )()
          , kV = (()=>{
            class t {
                static #e = this.\u0275fac = function(r) {
                    return new (r || t)
                }
                ;
                static #t = this.\u0275cmp = jr({
                    type: t,
                    selectors: [["boboverse-footer"]],
                    decls: 11,
                    vars: 0,
                    consts: [[1, "footer-background"], ["src", "/assets/basement/bg.png", 1, "room"], ["src", "/assets/footer/bags.png", 1, "bags"], ["src", "/assets/footer/dodo1.gif", 1, "dodo"], ["src", "/assets/footer/bobo1.gif", 1, "bobo"], ["src", "/assets/footer/snibbu1.gif", 1, "snibbu"], [1, "socials"], ["href", "https://x.com/Ether_memes"], ["src", "/assets/x.png"], ["href", "https://t.me/Ether_memes"], ["src", "/assets/telegram.png"]],
                    template: function(r, i) {
                        1 & r && (Ke(0, "section", 0),
                        xe(1, "img", 1)(2, "img", 2)(3, "img", 3)(4, "img", 4)(5, "img", 5),
                        wt(),
                        Ke(6, "section", 6)(7, "a", 7),
                        xe(8, "img", 8),
                        wt(),
                        Ke(9, "a", 9),
                        xe(10, "img", 10),
                        wt()())
                    },
                    styles: ['[_nghost-%COMP%]{min-height:100%;min-width:100%;display:grid;grid-template-areas:"footer"}section.footer-background[_ngcontent-%COMP%]{grid-area:footer;display:grid;grid-template-areas:"footer-background"}section.footer-background[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100vw;min-width:100vw;grid-area:footer-background}section.socials[_ngcontent-%COMP%]{grid-area:footer;display:grid;justify-content:center;justify-items:center;align-items:end;align-content:end;grid-auto-flow:column;margin-bottom:25px;column-gap:25px}section.socials[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:75px;transition:.25s}section.socials[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:hover{transform:scale(1.5)}'],
                    changeDetection: 0
                })
            }
            return t
        }
        )()
          , LV = (()=>{
            class t {
                static #e = this.\u0275fac = function(r) {
                    return new (r || t)
                }
                ;
                static #t = this.\u0275cmp = jr({
                    type: t,
                    selectors: [["boboverse-home-page"]],
                    decls: 6,
                    vars: 0,
                    template: function(r, i) {
                        1 & r && xe(0, "boboverse-landing")(1, "boboverse-info")(2, "boboverse-bobo")(3, "boboverse-dodo")(4, "boboverse-snibbu")(5, "boboverse-footer")
                    },
                    dependencies: [AV, FV, RV, PV, NV, kV],
                    styles: ['[_nghost-%COMP%]{display:grid;grid-template-columns:100vw;grid-template-rows:max-content max-content max-content max-content max-content max-content max-content;grid-template-areas:"landing" "info" "tokenomics" "bobo" "dodo" "snibbu" "footer";max-width:100vw;overflow-x:hidden}boboverse-landing[_ngcontent-%COMP%]{grid-area:landing}boboverse-info[_ngcontent-%COMP%]{grid-area:info}boboverse-tokenomics[_ngcontent-%COMP%]{grid-area:tokenomics}boboverse-bobo[_ngcontent-%COMP%]{grid-area:bobo}boboverse-dodo[_ngcontent-%COMP%]{grid-area:dodo}boboverse-snibbu[_ngcontent-%COMP%]{grid-area:snibbu}boboverse-footer[_ngcontent-%COMP%]{grid-area:footer}'],
                    changeDetection: 0
                })
            }
            return t
        }
        )()
          , BV = (()=>{
            class t {
                constructor() {
                    this.title = "boboverse",
                    t1.registerPlugin(Wm, ve)
                }
                static #e = this.\u0275fac = function(r) {
                    return new (r || t)
                }
                ;
                static #t = this.\u0275cmp = jr({
                    type: t,
                    selectors: [["app-root"]],
                    decls: 1,
                    vars: 0,
                    template: function(r, i) {
                        1 & r && xe(0, "boboverse-home-page")
                    },
                    dependencies: [LV],
                    styles: ["[_nghost-%COMP%]{display:grid;grid-template-columns:1fr;grid-template-rows:1fr;max-width:100vw;overflow-x:hidden}"]
                })
            }
            return t
        }
        )()
          , jV = (()=>{
            class t {
                static #e = this.\u0275fac = function(r) {
                    return new (r || t)
                }
                ;
                static #t = this.\u0275mod = $i({
                    type: t
                });
                static #n = this.\u0275inj = ci({
                    imports: [tE]
                })
            }
            return t
        }
        )()
          , VV = (()=>{
            class t {
                static #e = this.\u0275fac = function(r) {
                    return new (r || t)
                }
                ;
                static #t = this.\u0275mod = $i({
                    type: t,
                    bootstrap: [BV]
                });
                static #n = this.\u0275inj = ci({
                    imports: [YL, V3, jV]
                })
            }
            return t
        }
        )();
        qL().bootstrapModule(VV).catch(t=>console.error(t))
    }
}, Le=>{
    Le(Le.s = 121)
}
]);
