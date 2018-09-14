const Rx=require('../node_modules/rxjs/Rx.js')
const {createEnhanceProto}=require('../index.js')
const Subscriber=Rx.Subscriber





test('create Subscriber', () => {
  let controller=createEnhanceProto(Subscriber)
  controller.addMethodBefore('complete',function(){
    this.status="completed"
  })

  let obs = Rx.Observable.of(1)
  let sub=obs.subscribe(v => console.log("value: " + v));

  expect(sub.status).toBe('completed');

});
