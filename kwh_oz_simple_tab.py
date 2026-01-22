from kwh_oz_simple_calc import calc_kwh_per_oz_simple


def render_kwh_oz_simple_tab(
    grade_gpt: float,
    recovery: float | None = None,
    electricity_kwh_per_t: float | None = None,
    power_price_low: float | None = None,
    power_price_base: float | None = None,
    power_price_high: float | None = None,
):
    defaults = {
        "recovery": 0.85,
        "electricity_kwh_per_t": 25.0,
        "power_price_low": 80.0,
        "power_price_base": 150.0,
        "power_price_high": 250.0,
    }

    warnings = []
    if recovery is None:
        recovery = defaults["recovery"]
        warnings.append("Using default R=0.85.")
    if electricity_kwh_per_t is None:
        electricity_kwh_per_t = defaults["electricity_kwh_per_t"]
        warnings.append("Using default E=25 kWh/t.")
    if power_price_low is None:
        power_price_low = defaults["power_price_low"]
    if power_price_base is None:
        power_price_base = defaults["power_price_base"]
    if power_price_high is None:
        power_price_high = defaults["power_price_high"]

    result = calc_kwh_per_oz_simple(
        grade_gpt=grade_gpt,
        recovery=recovery,
        electricity_kwh_per_t=electricity_kwh_per_t,
        power_price_low=power_price_low,
        power_price_base=power_price_base,
        power_price_high=power_price_high,
    )

    return {
        "description": (
            "Translate grade into energy intensity per payable ounce. "
            "Heuristic ranges: heap leach 6–12 kWh/t • conventional mill 20–35 • "
            "hard/fine grind 35–60+."
        ),
        "warnings": warnings,
        "inputs": {
            "grade_gpt": grade_gpt,
            "recovery": recovery,
            "electricity_kwh_per_t": electricity_kwh_per_t,
            "power_price_low": power_price_low,
            "power_price_base": power_price_base,
            "power_price_high": power_price_high,
        },
        "results": result,
    }
