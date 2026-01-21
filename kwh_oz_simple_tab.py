import streamlit as st

from kwh_oz_simple_calc import calc_kwh_per_oz_simple


def render_kwh_oz_simple_tab():
    st.header("kWh/oz (Simple Ranker)")
    st.caption(
        "Translate grade into energy intensity per payable ounce. "
        "Add recovery, payable, mill power, and diesel inputs when available to refine the estimate. "
        "Heuristic ranges: heap leach 6–12 kWh/t • conventional mill 20–35 • hard/fine grind 35–60+."
    )

    st.subheader("Inputs")
    grade_gpt = st.number_input("Silver grade (g/t Ag) *", min_value=0.0, value=0.0, step=0.1)

    recovery = st.number_input("Recovery (0–1)", min_value=0.0, max_value=1.0, value=0.85, step=0.01)
    electricity_kwh_per_t = st.number_input(
        "Electricity intensity (kWh/t)", min_value=0.0, value=25.0, step=1.0
    )

    power_price_low = st.number_input("Power price low ($/MWh)", min_value=0.0, value=80.0, step=1.0)
    power_price_base = st.number_input("Power price base ($/MWh)", min_value=0.0, value=150.0, step=1.0)
    power_price_high = st.number_input("Power price high ($/MWh)", min_value=0.0, value=250.0, step=1.0)

    warnings = []
    if recovery == 0.85:
        warnings.append("Using default R=0.85.")
    if electricity_kwh_per_t == 25.0:
        warnings.append("Using default E=25 kWh/t.")

    if warnings:
        st.warning("\n".join(warnings))

    if grade_gpt <= 0:
        st.info("Enter a silver grade to calculate kWh/oz.")
        return

    try:
        result = calc_kwh_per_oz_simple(
            grade_gpt=grade_gpt,
            recovery=recovery,
            electricity_kwh_per_t=electricity_kwh_per_t,
            power_price_low=power_price_low,
            power_price_base=power_price_base,
            power_price_high=power_price_high,
        )
    except ValueError as exc:
        st.error(str(exc))
        return

    st.subheader("Results")
    col1, col2, col3 = st.columns(3)
    col1.metric("kWh/oz", f"{result['kwh_per_recovered_oz']:.2f}")
    col2.metric("Band", result["band"])
    col3.metric(
        "$/oz @ base power",
        f"${result['power_costs']['base']:.2f}",
    )

    st.write(
        {
            "oz_per_t": round(result["oz_per_t"], 4),
            "t_per_recovered_oz": round(result["t_per_recovered_oz"], 4),
        }
    )

    st.subheader("Power cost per oz")
    st.table(
        [
            {"Scenario": "Low", "Power ($/MWh)": power_price_low, "$/oz": result["power_costs"]["low"]},
            {"Scenario": "Base", "Power ($/MWh)": power_price_base, "$/oz": result["power_costs"]["base"]},
            {"Scenario": "High", "Power ($/MWh)": power_price_high, "$/oz": result["power_costs"]["high"]},
        ]
    )
