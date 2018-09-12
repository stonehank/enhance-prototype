const Rx=require('../node_modules/rxjs/Rx.js')
const {createEnhance}=require('../index.js')
const Subscriber=Rx.Subscriber





test('create Subscriber', () => {
  let connObsCtrl=createEnhance(Rx.ConnectableObservable)
  let subCtrl=createEnhance(Subscriber)
  subCtrl.addMethod('complete',function(){
    this.status='completed'
    Subscriber.prototype.complete.call(this)
  })
  connObsCtrl.addMethod('subscribe',function(){
    let original=Rx.ConnectableObservable.prototype.subscribe.call(this)
    return subCtrl.toEnhance(original)
  })

  let obs = connObsCtrl.toEnhance(Rx.Observable.of(1))
  let sub=obs.subscribe(v => console.log("value: " + v));

  expect(sub.status).toBe('completed');

});
