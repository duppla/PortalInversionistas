import React, { useState } from 'react';

interface Props {
    rangeValue: any;
    setRangeValue: Function;
    min: number;
    max: number;
    showCurrencyConversion: boolean;
    allowUSDSelection?: boolean; // Nueva prop para controlar la selección de USD
    minGuide?: string,
    maxGuide?: string,
}

const CurrencyConverter: React.FC<Props> = ({
    rangeValue,
    setRangeValue,
    min,
    max,
    showCurrencyConversion,
    allowUSDSelection = false,
    minGuide,
    maxGuide,
}) => {
    const [selectedCurrency, setSelectedCurrency] = useState<string>('COP');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const USD_COP_EXCHANGE_RATE = 3942;


    const updateCurrencyInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        let value = parseInt(inputValue.replace(/\D/g, ''));
        if (isNaN(value) || value === undefined) {
            setRangeValue(0);
        } else if (showCurrencyConversion && selectedCurrency !== 'COP') {
            let converted = value * USD_COP_EXCHANGE_RATE
            if (converted > max) {
                converted = max
            }
            else if (converted < min) {
                converted = min
            }
            setRangeValue(converted);
        } else {
            if (value > max) {
                value = max
            }
            else if (value < 0) {
                value = min
            }
            setRangeValue(value);
        }
    };

    const updateCurrencySlider = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = parseInt(inputValue.replace(/\D/g, ''));
        if (isNaN(value) || value === undefined) {
            setRangeValue(min);
        } else {
            setRangeValue(value);
        }
    };


    const handleCurrencyChange = (currency: string) => {
        setSelectedCurrency(currency);
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        if (showCurrencyConversion) {
            setIsDropdownOpen(!isDropdownOpen);
        }
    };

    const formatCurrency = (value: number) => {
        let converted: number = 0;
        if (showCurrencyConversion && selectedCurrency !== 'COP') {
            converted = ~~(value / USD_COP_EXCHANGE_RATE);
        } else {
            converted = ~~value
        }
        return "$ " + converted.toLocaleString('es-CO');
    };


    return (
        <div className="mx-auto">
            <div className="flex relative mb-4 rounded-md border border-gray-300 bg-white shadow-sm">
                <input
                    type="text"
                    id="currency-input"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="$1.000.000"
                    value={formatCurrency(rangeValue)}
                    onChange={updateCurrencyInput}
                    required
                />
                <div className="relative inline-block text-left z-20">
                    <button
                        type="button"
                        className={`flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-[#6684F3] rounded-r bg-gray-100 hover:bg-gray-200 ${showCurrencyConversion ? '' : 'opacity-50 cursor-not-allowed'}`}
                        onClick={toggleDropdown}
                        disabled={!showCurrencyConversion}
                    >
                        {selectedCurrency}
                        <svg
                            className={`-mr-1 ml-2 h-3 w-3 text-gray-500 ${isDropdownOpen ? 'rotate-180' : ''}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 10 6"
                            fill="none"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button>
                    {isDropdownOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <button
                                    onClick={() => handleCurrencyChange('COP')}
                                    className="block px-4 py-2 text-sm text-[#6684F3] hover:bg-gray-100 hover:text-gray-600"
                                    role="menuitem"
                                >
                                    COP
                                </button>
                                {allowUSDSelection && (
                                    <button
                                        onClick={() => handleCurrencyChange('USD')}
                                        className="block px-4 py-2 text-sm text-[#6684F3] hover:bg-gray-100 hover:text-gray-600"
                                        role="menuitem"
                                    >
                                        USD
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="relative mt-2">
                <label htmlFor="price-range-input" className="sr-only"></label>
                <input
                    id="price-range-input"
                    type="range"
                    value={rangeValue}
                    min={min}
                    max={max}
                    className="w-full h-2 bg-futuro-200 rounded-lg appearance-none cursor-pointer"
                    onChange={updateCurrencySlider}
                />
                {minGuide && maxGuide ? (
                    <div className="grid grid-cols-2 gap-4">
                        <p className="text-left font-mukta font-medium text-[10px] leading-normal tracking-[0.282px] text-[#6684F3]">{minGuide}</p>
                        <p className="text-right font-mukta font-medium text-[10px] leading-normal tracking-[0.282px] text-[#6684F3]">{maxGuide}</p>
                    </div>
                ) : ''}
            </div>
        </div>
    );
};

export default CurrencyConverter;
