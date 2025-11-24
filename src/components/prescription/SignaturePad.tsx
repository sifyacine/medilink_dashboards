import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { X, RotateCcw, Check } from 'lucide-react';

interface SignaturePadProps {
    onSave: (signatureDataUrl: string) => void;
    onClose: () => void;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, onClose }) => {
    const sigCanvas = useRef<SignatureCanvas>(null);
    const [isEmpty, setIsEmpty] = useState(true);

    const clearSignature = () => {
        sigCanvas.current?.clear();
        setIsEmpty(true);
    };

    const saveSignature = () => {
        if (sigCanvas.current && !isEmpty) {
            const dataUrl = sigCanvas.current.toDataURL('image/png');
            onSave(dataUrl);
        }
    };

    const handleEnd = () => {
        setIsEmpty(sigCanvas.current?.isEmpty() || false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Signature du Médecin
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                        <X size={20} className="text-gray-600 dark:text-gray-400" />
                    </button>
                </div>

                <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white mb-4">
                    <SignatureCanvas
                        ref={sigCanvas}
                        canvasProps={{
                            className: 'w-full h-64 cursor-crosshair',
                        }}
                        onEnd={handleEnd}
                    />
                </div>

                <div className="flex justify-between items-center">
                    <button
                        onClick={clearSignature}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <RotateCcw size={16} />
                        <span>Effacer</span>
                    </button>

                    <button
                        onClick={saveSignature}
                        disabled={isEmpty}
                        className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        <Check size={16} />
                        <span>Sauvegarder</span>
                    </button>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                    Signez dans la zone ci-dessus avec votre souris ou votre doigt
                </p>
            </div>
        </div>
    );
};
