import { useState } from "react";

/**
 * Allows the ability have contructor like capability in a stateless component.
 * @param callBack 
 */
export default function useConstructor(callBack: Function ) {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
}