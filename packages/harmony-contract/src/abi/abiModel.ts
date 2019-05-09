interface AbiModel {
    getMethod(name: string): AbiItemModel | false;
    getMethods(): AbiItemModel[];
    hasMethod(name: string): boolean;
    getEvent(name: string): AbiItemModel | false;
    getEvents(): AbiItemModel[];
    getEventBySignature(signature: string): AbiItemModel;
    hasEvent(name: string): boolean;
}

interface AbiItemModel {
    name: string;
    signature: string;
    payable: boolean;
    anonymous: boolean;
    getInputLength(): Number;
    getInputs(): AbiInput[];
    getIndexedInputs(): AbiInput[];
    getOutputs(): AbiOutput[];
    isOfType(): boolean;
}

interface AbiInput {
    name: string;
    type: string;
    indexed?: boolean;
    components?: AbiInput[];
}

interface AbiOutput {
    name: string;
    type: string;
    components?: AbiOutput[];
}