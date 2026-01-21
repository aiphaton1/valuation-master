def calc_kwh_per_oz_simple(
    grade_gpt: float,
    recovery: float = 0.85,
    electricity_kwh_per_t: float = 25.0,
    power_price_low: float = 80.0,
    power_price_base: float = 150.0,
    power_price_high: float = 250.0,
):
    if grade_gpt <= 0:
        raise ValueError("grade_gpt must be > 0")
    if not 0 < recovery <= 1:
        raise ValueError("recovery must be between 0 and 1")
    if electricity_kwh_per_t <= 0:
        raise ValueError("electricity_kwh_per_t must be > 0")

    oz_per_t = grade_gpt / 31.1035
    recovered_oz_per_t = oz_per_t * recovery
    if recovered_oz_per_t <= 0:
        raise ValueError("recovery must be > 0")

    t_per_recovered_oz = 1 / recovered_oz_per_t
    kwh_per_recovered_oz = electricity_kwh_per_t * t_per_recovered_oz

    def power_cost(power_price):
        return kwh_per_recovered_oz * (power_price / 1000)

    if kwh_per_recovered_oz < 5:
        band = "Exceptional"
    elif kwh_per_recovered_oz < 12:
        band = "Strong"
    elif kwh_per_recovered_oz < 25:
        band = "Energy sensitive"
    else:
        band = "Thermodynamic pain"

    return {
        "oz_per_t": oz_per_t,
        "t_per_recovered_oz": t_per_recovered_oz,
        "kwh_per_recovered_oz": kwh_per_recovered_oz,
        "power_costs": {
            "low": power_cost(power_price_low),
            "base": power_cost(power_price_base),
            "high": power_cost(power_price_high),
        },
        "band": band,
    }
