// Step 0: set up MathWallet extension on Chrome

// Step 1: Create a harmonyExtension instance
// import { HarmonyExtension } from '@harmony-js/core';

async function foo() {
  //   let hmyEx = await new HarmonyExtension(window.harmony);
  if (window.harmony && window.harmony.isMathWallet) {
    console.log(window.harmony);
  } else {
    console.log('no mathwallet!!!');
    console.log(window.harmony);
  }
  //   exContract = hmyEx.contracts.createContract(abi, address);
  //   return exContract;
}
foo();
// const initEx = async () => {
//   hmyEx = new HarmonyExtension(window.harmony);
//   console.log(hmyEx);
// };
// initEx();
// Step 2: interact with hmyEx instance
// wait for hmy inject into window
// async function componentDidMount() {
//   await waitForInjected()
// }
// // Example: methods.myMethod.send()
// onSubmit = async event => {
//   const exContract = await initExtension()
//   await exContract.methods.Mymethod().send({
//     value: new hmy.utils.Unit('1').asOne().toWei(),
//   })
// }

// // wait for injected
// export const waitForInjected = () => new Promise((resolve) => {
//   const check = () => {
//     if (!window.harmony) setTimeout(check, 250);
//     else resolve(window.harmony);
//   }
//   check();
// });
