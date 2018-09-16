const Rx=require('../../node_modules/rxjs/Rx.js')
const {createEnhanceInProto}=require('../../index.js')
const Subscriber=Rx.Subscriber





test('create Subscriber', () => {
  let controller=createEnhanceInProto(Subscriber)
  controller.addBefore('complete',function(){
    this.status="completed"
  })

  let obs = Rx.Observable.of(1)
  let sub=obs.subscribe(v => console.log("value: " + v));

  expect(sub.status).toBe('completed');

});
